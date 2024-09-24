import { Player } from './player.mjs';
import { Dungeon } from './dungeon.mjs';
import { messageLog } from './messageLog.mjs';
import { items } from './items.mjs';
import { randomDeathMessage } from './deathMessages.mjs';

export class Game {
    constructor() {
        this.player = new Player();
        this.dungeon = new Dungeon(this.player);
        this.startTime = null;
        this.endTime = null;
        this.statistics = {
            enemiesDefeated: 0,
            itemsFound: 0
        };
    }

    async start() {
        console.clear()
        this.startTime = new Date();
        console.log()
        console.log("Welcome to the Dungeon Crawler!");
        console.log("Type 'help' for a list of commands.");
        console.log("Good luck!");
        console.log()
        this.prompt = (await import('prompt-sync')).default();
        this.gameLoop();
    }

    calculateTimeSpent() {
        const endTime = new Date();
        let seconds = String(Math.floor((endTime - this.startTime) / 1000) % 60).padStart(2, '0');
        let minutes = String(Math.floor((endTime - this.startTime) / 60000) % 60).padStart(2, '0');
        let hours = String(Math.floor((endTime - this.startTime) / 3600000)).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    gameLoop() {
        while (!this.player.isDead()) {
            this.render();
            const action = this.getPlayerAction();
            this.handleAction(action);
        }
        console.log("Game Over!");
        //display time in hh : mm : ss padded to 2 digits
        //display what killed the player
        console.log(`You explored the dungeon for ${this.calculateTimeSpent()}!`);
        console.log(`You defeated ${messageLog.enemiesKilled} enemies and found ${this.statistics.itemsFound} items.`);
        console.log(randomDeathMessage());
        //wait for any key to be pressed
        this.prompt('Press any key to restart...');
        messageLog.clear();
        messageLog.add('Restarting game...');
        messageLog.add('You explored the dungeon for ' + this.calculateTimeSpent() + '!');
        messageLog.add('You defeated ' + messageLog.enemiesKilled + ' enemies and found ' + this.statistics.itemsFound + ' items.');
        messageLog.nl();
        this.player = new Player();
        this.dungeon = new Dungeon(this.player);
        this.startTime = new Date();
        messageLog.enemiesKilled = 0;
        this.statistics = {
            enemiesDefeated: 0,
            itemsFound: 0
        };
    }

    render() {
        console.log(`Health: ${this.player.health}  Attack Power: ${this.player.attackPower}\n`);
        this.dungeon.displayMap();
        this.dungeon.display();
        messageLog.getMessages().forEach(message => console.log(message));
        messageLog.clear();
    }

    getPlayerAction() {
        return this.prompt('Enter action (type "help" for help.): ');
    }

    handleAction(action) {
        console.clear()
        this.player.restCooldown > 0 ? this.player.restCooldown-- : null;
        const [command, ...args] = action.split(' ');
        const target = args.join(' ');
        switch (command) {
            case 'restart':
                messageLog.clear();
                messageLog.add('Restarting game...');
                messageLog.add('You explored the dungeon for ' + this.calculateTimeSpent() + '!');
                messageLog.add('You defeated ' + messageLog.enemiesKilled + ' enemies and found ' + this.statistics.itemsFound + ' items.');
                messageLog.nl();
                this.player = new Player();
                this.dungeon = new Dungeon(this.player);
                this.startTime = new Date();
                messageLog.enemiesKilled = 0;
                this.statistics = {
                    enemiesDefeated: 0,
                    itemsFound: 0
                };


                break;
            case 'help':
                messageLog.nl()
                messageLog.add('Welcome to the Dungeon Crawler!');
                messageLog.add('Commands: move [north/south/east/west], search, attack, inspect [name], quit');
                messageLog.add('You can also type "help" to see this message again.');
                messageLog.add('You can inspect enemies and items by typing "inspect" followed by the name of the enemy or item.');
                messageLog.add('Map Legend: P = Player, ☠ = Enemy, * = Item, # = Impassable Room');
                messageLog.add('When you enter an impassable room, you can only exit back the way you came.');
                messageLog.nl()
                break;
            case 'move':
                if (this.dungeon.canMove(target)) {
                    this.dungeon.move(target);
                } else {
                    messageLog.add('You cannot move in that direction.');
                }
                break;
            case 'search':
                const item = this.dungeon.search();
                if (item) {
                    this.player.addItem(item);
                    this.statistics.itemsFound++;
                    this.dungeon.removeItem();
                }
                break;
            case 'attack':
                const room = this.dungeon.getRoom(this.dungeon.currentPosition.x, this.dungeon.currentPosition.y);
                if (room.enemy) {
                    this.player.attack(room.enemy);
                    messageLog.add(`You attack the ${room.enemy.name}.`);
                    if (room.enemy.isDead()) {
                        messageLog.add(`The corpse of a ${room.enemy.name} lies here.`);
                    } else {
                        room.enemy.performBehavior(this.player);
                    }
                } else {
                    messageLog.add('There is nothing to attack here.');
                }
                break;
            case 'inspect':
                this.inspect(target);
                break;
            case 'quit':
                this.player.die();
                break;
            case 'rest':
                let thisRoom = this.dungeon.getRoom(this.dungeon.currentPosition.x, this.dungeon.currentPosition.y);
                if (this.player.canRest) {
                    if (this.player.restCooldown === 0) {
                        this.player.health += 10;
                        messageLog.add(`You rest and regain 10 health points.`);
                        this.player.restCooldown = 5;
                    } else {
                        messageLog.add(`You can only rest once every five turns. You have ${this.player.restCooldown} turns left.`);
                    }

                    if (thisRoom.enemy && !thisRoom.enemy.isDead()) {
                        if (Math.random() < 0.9) { // 90% chance to attack
                            thisRoom.enemy.attack(this.player);
                            messageLog.add(`==}The ${thisRoom.enemy.name} attacks you as you lay down to rest!{==`);
                        }
                    }

                }
                break;
            case 'spawnitem':
                let coords = `${this.dungeon.currentPosition.x},${this.dungeon.currentPosition.y}`;
                let thisroom = this.dungeon.map.get(coords);
                if (thisroom) {
                    let thisItem = items.find(item => item.name.toLowerCase() === target.toLowerCase());
                    if (thisItem) {
                        thisroom.item = thisItem;
                        messageLog.add(`Spawned a ${thisItem.name} at your current location.`);
                    } else {
                        messageLog.add(`Item ${target} not found.`);
                    }
                } else {
                    messageLog.add(`Current location not found in dungeon map.`);
                }
                break;
            default:
                messageLog.add('Invalid action!');
        }
    }

    inspect(target) {
        const room = this.dungeon.getRoom(this.dungeon.currentPosition.x, this.dungeon.currentPosition.y);
        if (room.enemy && room.enemy.name.toLowerCase() === target.toLowerCase()) {

            messageLog.nl()
            messageLog.add(`${room.enemy.name}`);
            messageLog.add(`Health: ${room.enemy.health}  Attack Power: ${room.enemy.attackPower}`);
            messageLog.add(room.enemy.description);

        } else if (room.item && room.item.name.toLowerCase() === target.toLowerCase()) {
            messageLog.nl()
            messageLog.add(`${room.item.name}`);
            messageLog.add(`Effect: Adds ${room.item.effect.value} points to your ${room.item.effect.type}.`);
            messageLog.add(room.item.description);

        } else {
            messageLog.add(`There is no ${target} here to inspect.`);
        }
    }
}