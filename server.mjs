// server.mjs
import path from 'path';
import express from 'express';
import { Server } from 'socket.io'; // Import Socket.IO
import { Game } from './game.mjs';
import { intro } from './intro.mjs';
import { messageLog } from './messageLog.mjs';
import session from 'express-session';
import { Dungeon } from './dungeon.mjs';
import { items } from './items.mjs';
import { Item } from './item.mjs';
import fs from 'fs';
import { attackSynonyms, randomQuitMessage } from './miscArrays.mjs';



const musicalSecret = [5,0,6,1,7,8,2,9,3,10,4,11]
//musicalShame is the same as musicalSecret, but with the numbers reversed
const musicalShame = [11,4,10,3,9,2,8,7,1,6,0,5]


const imageDir = './public/media/images/404s';
const images = fs.readdirSync(imageDir);

let playerCount = 0;

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

const server = app.listen(port, () => {
    console.log(`Game server running at http://localhost:${port}`);
});

const io = new Server(server); // Create a new Socket.IO server

const games = {}; // Store game instances by session ID
const dungeon = new Dungeon(); // Shared dungeon instance

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    // Handle player introduction
    socket.on('intro', async (data) => {
        const { name, gender, species } = data || {name: "Jane Doe",gender: "F",species: "Human"};
        const playerInput = await intro(name, gender, species);
        playerInput.id = socket.id; // Assign the socket ID to the player
        
        const game = new Game(playerInput, dungeon); // Pass the shared dungeon instance
        game.player.update = update;
        games[socket.id] = game; // Store the game instance by socket ID
        messageLog.add(`A new soul has entered the dungeon! Welcome, ${name}!`, "GLOBAL");
        updateAll(socket.id)
        playerCount++;
        socket.emit('init', playerInput.messages); // Send initial messages to the player
    });

    // Handle commands from the player
    socket.on('command', (command) => {

        const stateChangingCommands = ["move","attack"]

        console.log(`Received command: ${command}`);
        const game = games[socket.id];
        if (!game) {
            socket.emit('error', { error: 'Game not initialized. Please start with intro.' });
            return;
        }

        game.player.lastAction = Date.now(); // Update the last action timestamp
        try {
            
            game.handleAction(command, game.player.id); // Call handleAction
            const gameState = game.render();
            socket.emit('gameState', gameState); // Send updated game state to the player
            updateAll(socket.id)
            messageLog.clear(); // Ensure messageLog is used correctly
            //console.log(command, gameState)
        } catch (error) {
            console.error('Error handling command:', error);
            socket.emit('error', { error: 'Internal Server Error' });
        }
    });

    // Handle player death
    socket.on('dead', (playerId) => {
        const game = games[socket.id];
        if (!game) {
            socket.emit('error', { error: 'Game not initialized. Please start with intro.' });
            return;
        }
        game.player.health = 0;
        game.player.deathMessage = messageLog.getMessages(playerId).join(' ');
        playerCount--;
        const thisPlayer = messageLog.getPlayer(playerId);
        const deathRoom = dungeon.getRoom(thisPlayer.currentPosition.x, thisPlayer.currentPosition.y);
        deathRoom.contents.push({ name: `Corpse of ${thisPlayer.name}`, description: 'A lifeless body.' });
        deathRoom.items = [...deathRoom.items, ...thisPlayer.inventory];
        messageLog.add(`Player ${thisPlayer.name} died in ${deathRoom.name}.`, "GLOBAL", "timed", true, 4);
        updateAll(socket.id)
        messageLog.removePlayer(playerId);
        game.player.dungeon.removePlayer(game.player.id);
    });
    function arrayCompare(arr1,arr2){
        if(arr1.length !== arr2.length){
            return false;
        }
        for(let i=0;i<arr1.length;i++){
            if(arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }
    socket.on('misc', (rcvd) => {
        //for info that doesn't necessarily need a response
        //might though
        let {subject, lastTwelve, playerId} = rcvd;
        const thisPlayer = dungeon.getPlayer(playerId);
        const room = dungeon.getRoom(thisPlayer.currentPosition.x, thisPlayer.currentPosition.y);
        if(subject==='pianoKeys'){
            console.log(lastTwelve)
            if(arrayCompare(lastTwelve,musicalSecret)){
                //messageLog.add('You hear a click, and a door opens in the distance.',socket.id);
                //dungeon.rooms[1].impassable = false; super cool idea even if it doesn't work like this
                messageLog.add('The tune echoes with a strange resonance, and you feel a sense of twisted accomplishment. Something has arrived.',socket.id);
                let musiciansArmor = new Item("Eldritch Harmonics", { type: "oneOff", tag:"EldHarmonics"}, "A twisted instrument crafted from the bones of forgotten gods and strung with the intestines of eldritch horrors. Its music can both heal and harm, depending on the player's skill. The instrument's power grows stronger as the player's health decreases, with each lost health point granting an additional 0.5 point of attack up to a maximum of 50 additional attack points.")
                messageLog.add("In an explosion of alien harmonys, an abomination of an instrument appears before you. Merely catching sight of it inspires a bizarre mania within you.",socket.id);
                thisPlayer.update()
                console.log(playerId)
                room.items.push(musiciansArmor);
                //updateAll(socket.id)
            }
        }

    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
        const game = games[socket.id];
        if (game) {
            playerCount--;
            let quitMessage = randomQuitMessage(game.player.name);
            messageLog.add(quitMessage, "GLOBAL");
            updateAll(socket.id)
            game.player.dungeon.removePlayer(game.player.id);
            delete games[socket.id]; // Remove the game instance for the disconnected player
        }
    });

    function updateAll(excludeSocketId) {
        for (const socketId in games) {
            // Check if the current socket ID is the one to exclude
            if (socketId !== excludeSocketId) {
                const game = games[socketId];
                const gameState = game.render(); // Render the current state of the game
                console.log('messages: ',gameState.messages)
                io.to(socketId).emit('update', gameState); // Send the game state to the specific player
            }
        }
    }

    function update(){
        //update current player
        const game = games[socket.id];
        const gameState = game.render(); // Render the current state of the game
        io.to(socket.id).emit('update', gameState); // Send the game state to the specific player

    }

    //setInterval(() => {
    //    for (const socketId in games) {
    //        const game = games[socketId];
    //        const gameState = game.render(); // Render the current state of the game
    //        io.to(socketId).emit('update', gameState); // Send the game state to the specific player
    //    }
    //}, 5000); // Adjust the interval as needed (e.g., every 5000 ms = 5 seconds)
    
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
                background-image: url('media/images/404s/${randImage}'); 
                background-size: contain; 
                background-repeat: no-repeat; 
                background-position: center; 
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
                margin-top: auto; 
            }
        </style>
    </head>
    <body>
        <div>
            <div class="footer">
                <p><a href="/">Home</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

    res.status(404).send(htmlContent);
});
