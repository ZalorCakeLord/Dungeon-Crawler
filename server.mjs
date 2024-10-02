// server.mjs
import path from 'path';
import express from 'express';
import { Game } from './game.mjs';
import { intro } from './intro.mjs';
import { messageLog } from './messageLog.mjs';
import session from 'express-session';
import { Dungeon } from './dungeon.mjs';
import { items } from './items.mjs';
import fs from 'fs';
const imageDir = './public/media/images/404s';
const images = fs.readdirSync(imageDir);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const games = {}; // Store game instances by session ID
const dungeon = new Dungeon(); // Shared dungeon instance

app.post('/intro', async (req, res) => {
    const { name, gender, species } = req.body;
    const playerInput = await intro(name, gender, species);
    playerInput.id = Math.floor(Math.random() * 1000); // Assign a random player ID
    const game = new Game(playerInput, dungeon); // Pass the shared dungeon instance
    games[req.sessionID] = game; // Store the game instance by session ID
    messageLog.add(`A new soul has entered the dungeon! Welcome, ${name}!`, "GLOBAL");
    res.json(playerInput.messages);
});

app.post('/command', (req, res) => {
    const game = games[req.sessionID];
    if (!game) {
        return res.status(400).json({ error: 'Game not initialized. Please start with /intro.' });
    }

    const { command } = req.body;
    if (!command) {
        return res.status(400).json({ error: 'Command is required.' });
    }

    try {
        console.log(command);
        game.handleAction(command, game.player.id); // Call handleAction
        const gameState = game.render();
        res.json(gameState);
        messageLog.clear(); // Ensure messageLog is used correctly
    } catch (error) {
        console.error('Error handling command:', error);
        console.error(error.stack); // Log the stack trace
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/map', (req, res) => {
    const game = games[req.sessionID];
    if (!game) {
        return res.status(400).json({ error: 'Game not initialized. Please start with /intro.' });
    }

    const gameState = game.render();
    const messages = messageLog.getMessages(game.player.id);
    let funStats = ''
    
    res.json({ map: gameState.map, messages });
});

app.post('/dead', (req, res) => {
    const game = games[req.sessionID];
    if (!game) {
        return res.status(400).json({ error: 'Game not initialized. Please start with /intro.' });
    }
    const { playerId } = req.body;
    game.player.health = 0;
    game.player.deathMessage = messageLog.getMessages(playerId).join(' ');

    const thisPlayer = messageLog.getPlayer(playerId);
    const deathRoom = dungeon.getRoom(thisPlayer.currentPosition.x, thisPlayer.currentPosition.y);
    deathRoom.contents.push({ name: `Corpse of ${thisPlayer.name}`, description: 'A lifeless body.' });
    deathRoom.items = [...deathRoom.items, ...thisPlayer.inventory];
    messageLog.add(`Player ${thisPlayer.name} died in ${deathRoom.name}.`, "GLOBAL", "timed", true, 4);
    messageLog.removePlayer(playerId);
});

app.use((req, res, next) => {

    const randImage = images[Math.floor(Math.random() * images.length)];

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 Not Found</title>
        <style>
            body { 
                margin: 0; 
                height: 100vh; 
                background-image: url('media/images/404s/${randImage}'); /* Ensure the correct path */
                background-size: contain; /* Ensure the entire image is visible */
                background-repeat: no-repeat; /* Prevent tiling */
                background-position: center; /* Center the image */
                background-color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                text-align: center;
                font-family: Arial, sans-serif;
            }
            h1 { 
                font-size: 3em; 
                margin: 0; 
            }
            p { 
                font-size: 1.5em; 
            }
            a { 
                color: #66ccff; 
                text-decoration: none; 
                font-size: 1.2em; 
            }
            .footer {
                margin-top: auto; /* This pushes the footer to the bottom */
            }
        </style>
    </head>
    <body>
        <div>
            <!--<h1>404 Not Found</h1>-->
            <!--<p>Sorry, the page you are looking for does not exist.</p>-->
        <div class="footer">
            <p><a href="/">Home</a></p>
        </div>
        </div>
    </body>
    </html>
    `;

    res.status(404).send(htmlContent);
});

// Start the server
app.listen(port, () => {
    console.log(`Game server running at http://localhost:${port}`);
});
