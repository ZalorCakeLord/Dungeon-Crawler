// server.mjs
import express from 'express';
import { Game } from './game.mjs';
import { intro } from './intro.mjs';
import { messageLog } from './messageLog.mjs';
import session from 'express-session';
import { Dungeon } from './dungeon.mjs';

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
    //assign a random number to the player id
    playerInput.id = Math.floor(Math.random() * 1000);
    const game = new Game(playerInput, dungeon); // Pass the shared dungeon instance
    games[req.sessionID] = game; // Store the game instance by session ID
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
        //pass in player id to handleAction
        game.handleAction(command, game.player.id); // Call handleAction instead of move
        const gameState = game.render();
        res.json(gameState);
        messageLog.clear(); // Ensure messageLog is used correctly
    } catch (error) {
        console.error('Error handling command:', error);
        console.error(error.stack); // Log the stack trace
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/dead', (req, res) => {
    const game = games[req.sessionID];
    if (!game) {
        return res.status(400).json({ error: 'Game not initialized. Please start with /intro.' });
    }
    const { playerId } = req.body;
    game.player.health = 0;
    game.player.deathMessage = messageLog.getMessages(playerId).join(' ');
    let thisPlayer = messageLog.getPlayer(playerId);
    messageLog.add(`Player ${thisPlayer.name} has died.`);
    messageLog.removePlayer(playerId);
    let deathRoom = dungeon.getRoom(thisPlayer.currentPosition.x, thisPlayer.currentPosition.y);
    deathRoom.contents.push({name: `Corpse of ${thisPlayer.name}`, description: 'A lifeless body.'});
})

app.listen(port, () => {
    console.log(`Game server running at http://localhost:${port}`);
});