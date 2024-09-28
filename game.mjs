import { Player } from './player.mjs';
import { Dungeon } from './dungeon.mjs';
import { messageLog } from './messageLog.mjs';
import { items } from './items.mjs';
import { randomDeathMessage } from './deathMessages.mjs';



export class Game {
    constructor({name, gender, species}) {
        if(name){
            messageLog.playerName = name?name:'Adventurer'
            messageLog.playerGender = gender?gender:'F'
            messageLog.playerSpecies = species?species:'Human'
        }
        this.player = new Player();
        this.dungeon = new Dungeon(this.player);
        this.player.dungeon = this.dungeon;
        this.startTime = null;
        this.endTime = null;
        this.statistics = {
            enemiesDefeated: 0,
            itemsFound: 0
        };
        messageLog.frames = 0;
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

    async gameLoop() {
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
        let deathCause = messageLog.deathCause;
        console.log(randomDeathMessage(deathCause));
        //wait for any key to be pressed
        console.log('Press any key to restart...');
        await new Promise(resolve => process.stdin.once('data', resolve));
        messageLog.clear();
        messageLog.add('Restarting game...');
        messageLog.add('You explored the dungeon for ' + this.calculateTimeSpent() + '!');
        messageLog.add('You defeated ' + messageLog.enemiesKilled + ' enemies and found ' + this.statistics.itemsFound + ' items.');
        this.player.displayInventory()
        messageLog.nl();
        this.player = new Player();
        this.dungeon = new Dungeon(this.player);
        this.player.dungeon = this.dungeon;
        this.startTime = new Date();
        messageLog.enemiesKilled = 0;
        this.statistics = {
            enemiesDefeated: 0,
            itemsFound: 0
        };
    }

    render() {
        //Spawn Probability: ${Math.max(0.1, 0.35 - (this.dungeon.monsterSpawnCounter * 0.05))}
        console.log(`            room: this.dungeon.getRoom(this.dungeon.currentPosition.x, this.dungeon.currentPosition.y)
`)
        return {
            stats: `Health: ${String(this.player.health).padStart(4, '0')}  Attack Power: ${String(this.player.attackPower).padStart(4, '0')}  Rooms Explored: ${String(this.dungeon.visitedRooms.size).padStart(4, '0')} \n Slain: ${String(messageLog.enemiesKilled).padStart(4, '0')}        Looted: ${String(this.statistics.itemsFound).padStart(4, '0')}  Frames: ${String(messageLog.frames).padStart(4, '0')}`,
            map: this.dungeon.displayMap(),
            messages: messageLog.getMessages(),
            room: this.dungeon.getRoom(this.dungeon.currentPosition.x, this.dungeon.currentPosition.y)
        };
    
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
                messageLog.add('Game Restarted!');
                messageLog.add('You explored the dungeon for ' + this.calculateTimeSpent() + '!');
                messageLog.add('You defeated ' + messageLog.enemiesKilled + ' enemies and found ' + this.statistics.itemsFound + ' items.');
                messageLog.nl();
                this.player = new Player();
                this.dungeon = new Dungeon(this.player);
                this.player.dungeon = this.dungeon;
                this.startTime = new Date();
                messageLog.enemiesKilled = 0;
                this.statistics = {
                    enemiesDefeated: 0,
                    itemsFound: 0
                };


                break;
            case 'inventory':
                this.player.displayInventory();
                break;
            case 'help':
                messageLog.nl()
                messageLog.add('Welcome to the Dungeon Crawler!');
                //how was the fall?
                messageLog.add('Commands: move [north/south/east/west], search, attack, inspect [name], grab, quit');

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
                //const item = this.dungeon.search();
                //if (item) {
                //    this.player.addItem(item);
                //    this.statistics.itemsFound++;
                //    this.dungeon.removeItem();
                //}
                const searchRoom = this.dungeon.getRoom(this.dungeon.currentPosition.x, this.dungeon.currentPosition.y)
                if(target === ''){
                    messageLog.nl()
                    let list = [];
                    searchRoom.enemy? list.push(searchRoom.enemy.name): null;
                    searchRoom.items? searchRoom.items.forEach((x)=>{x?list.push(x.name):null}): null;
                    searchRoom.contents.forEach(item => list.push(item.name));
                    messageLog.add(`You see: ${[...list,'myself'].join(', ')}`);
                    messageLog.add(`For further detail use inspect [name].`); 
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
            case 'grab':
                const item = this.dungeon.grab(target);
                if (item) {
                    this.player.addItem(item);
                    this.statistics.itemsFound++;
                    //this.dungeon.removeItem();
                }
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
                        thisroom.items.push(thisItem);
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
        for (let [key, room] of this.dungeon.map.entries()) {
            const [x, y] = key.split(',').map(Number);
            //the enemy in the same room as the player should not move if the player just attacked it
            if (x === this.dungeon.currentPosition.x && y === this.dungeon.currentPosition.y) {
                continue;
            }
            if (room.enemy && !room.enemy.isDead()) {
                const chanceToMove = Math.random();
                if (chanceToMove > (1-room.enemy.speed)) { // chance to move is different for each enemy
                    this.dungeon.moveEnemyToNearbyRoom(x, y);
                    
                }
                //message if enemy moves to the same room as the player
                //this is not currently functional as it is checking the spot the monster moved from
                //instead of the spot the monster moved to
                if (x === this.dungeon.currentPosition.x && y === this.dungeon.currentPosition.y) {
                    messageLog.add(`The ${room.enemy.name} chases you!`);
                    room.enemy.performBehavior(this.player);
                }
            }
        }
        messageLog.frames++;
    }

    inspect(target) {
        const room = this.dungeon.getRoom(this.dungeon.currentPosition.x, this.dungeon.currentPosition.y);
        if(target === 'myself'){
            const encouragingPhrases = [
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} who was unexpectedly torn from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and cast into this dungeon! You possess ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} snatched from ${messageLog.playerGender === 'M' ? 'his' : 'her'} cozy abode and hurled into this dungeon! You have ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} wrenched from ${messageLog.playerGender === 'M' ? 'his' : 'her'} safe haven and tossed into this dungeon! You hold ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} who was unceremoniously dragged from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and thrown into this dungeon! You have ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} suddenly abducted from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and cast into this dungeon! You have ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} who was harshly taken from ${messageLog.playerGender === 'M' ? 'his' : 'her'} residence and thrown into this dungeon! You possess ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} yanked from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and tossed into this dungeon! You have ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} who was roughly taken from ${messageLog.playerGender === 'M' ? 'his' : 'her'} dwelling and thrown into this dungeon! You have ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} who found ${messageLog.playerGender === 'M' ? 'his' : 'her'} home invaded and was subsequently cast into this dungeon! You have ${this.player.health} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${messageLog.playerName}, a ${messageLog.playerGender === 'M' ? 'male' : 'female'} ${messageLog.playerSpecies} forcibly removed from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and thrown into this dungeon! You have ${this.player.health} health points and an attack power of ${this.player.attackPower}.`
              ];
            messageLog.nl();
            messageLog.add(encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)]);
        }
        else if (room.enemy && room.enemy.name.toLowerCase() === target.toLowerCase()) {
            messageLog.nl();
            messageLog.add(`${room.enemy.name}`);
            messageLog.add(`Health: ${room.enemy.health}  Attack Power: ${room.enemy.attackPower}`);
            messageLog.add(room.enemy.description);
        } else {
            const item = room.items.filter(item => item).find(item => item.name.toLowerCase() === target.toLowerCase());
            if (item) {
                messageLog.nl();
                messageLog.add(`${item.name}`);
                switch(item.effect.type){
                    case 'health':
                        messageLog.add(`Grants ${item.effect.value} health points.`);
                        break;
                    case 'attack':
                        messageLog.add(`Grants ${item.effect.value} attack power.`);
                        break;
                    case 'gamble':
                        messageLog.add(`A gamble, picking this up means putting your life at risk.`);
                        break;
                    case 'rest':
                        messageLog.add(`Unlocks the ability to rest once every five turns.`);
                        break;
                    default:
                        messageLog.add('Invalid effect type!');
                }
                messageLog.add(item.description);
            } else if (room.contents.find(item => item.name.toLowerCase() === target.toLowerCase())) {
                room.contents.filter(item => item.name.toLowerCase() === target.toLowerCase()).forEach(item => {
                    messageLog.nl();
                    messageLog.add(`<b>${item.name}</b><br>`);
                    messageLog.add(`${item.description}`);
                });
            } else {
                messageLog.add('You found nothing.');
            }
        }
    }
}