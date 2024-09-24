#!/usr/bin/env node
import { Game } from './game.mjs';
import { intro } from './intro.mjs';

await intro();
const game = new Game();
game.start();