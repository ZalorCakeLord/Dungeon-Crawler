import express from 'express';
import { Game } from './game.mjs';
import { intro } from './intro.mjs';
import { messageLog } from './messageLog.mjs'; // Import messageLog

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let game;

app.post('/intro', async (req, res) => {
    const { name, gender, species } = req.body;
    const playerInput = await intro(name, gender, species);
    game = new Game(playerInput);
    res.json(playerInput.messages);
});

app.post('/command', (req, res) => {
    if (!game) {
        return res.status(400).json({ error: 'Game not initialized. Please start with /intro.' });
    }

    const { command } = req.body;
    if (!command) {
        return res.status(400).json({ error: 'Command is required.' });
    }

    try {
        console.log(command);
        game.handleAction(command);
        const gameState = game.render();
        res.json(gameState);
        messageLog.clear(); // Ensure messageLog is used correctly
    } catch (error) {
        console.error('Error handling command:', error);
        console.error(error.stack); // Log the stack trace
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
  console.log(`Game server running at http://localhost:${port}`);
});