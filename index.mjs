#!/usr/bin/env node
import { Game } from './game.mjs';
import { intro } from './intro.mjs';

let playerInput = await intro();
const game = new Game(playerInput);
game.start();