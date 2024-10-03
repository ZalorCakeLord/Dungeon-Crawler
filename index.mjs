<<<<<<< HEAD
#!/usr/bin/env node
import { Game } from './game.mjs';
import { intro } from './intro.mjs';

let playerInput = await intro();
const game = new Game(playerInput);
=======
#!/usr/bin/env node
import { Game } from './game.mjs';
import { intro } from './intro.mjs';

await intro();
const game = new Game();
>>>>>>> 561d020361b50b7b89a6737268598bd81bcede32
game.start();