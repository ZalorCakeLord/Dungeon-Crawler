import { Player } from './player.mjs';
import { Dungeon } from './dungeon.mjs';
import { messageLog } from './messageLog.mjs';
import { items } from './items.mjs';
import { randomDeathMessage } from './deathMessages.mjs';
import { grabButton, inspectButton, attackButton, readButton, interactButton } from './htmlHelper.mjs';
import { randomInteractionResponse } from './miscArrays.mjs';

export class Game {
    constructor({ id, name, gender, species }, dungeon) {
        this.player = new Player(id, name);
        this.player.name = name ? name : 'Adventurer';
        this.player.gender = gender ? gender : 'F';
        this.player.species = species ? species : 'Human';

        messageLog.addPlayer(id, this.player);
        this.dungeon = dungeon; // Use the shared dungeon instance
        this.dungeon.addPlayer(this.player); // Add player to the dungeon
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
        this.startTime = new Date();
        await this.gameLoop();
    }

    calculateTimeSpent() {
        const endTime = new Date();
        let seconds = String(Math.floor((endTime - this.startTime) / 1000) % 60).padStart(2, '0');
        let minutes = String(Math.floor((endTime - this.startTime) / 60000) % 60).padStart(2, '0');
        let hours = String(Math.floor((endTime - this.startTime) / 3600000)).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    /*async gameLoop() {
        while (!this.player.isDead()) {
            this.render();
            const action = this.getPlayerAction();
            this.handleAction(action);
        }
        messageLog.add("Game Over!");
        //display time in hh : mm : ss padded to 2 digits
        //display what killed the player
        messageLog.add(`You explored the dungeon for ${this.calculateTimeSpent()}!`);
        messageLog.add(`You defeated ${messageLog.enemiesKilled} enemies and found ${this.statistics.itemsFound} items.`);
        let deathCause = messageLog.deathCause;
        messageLog.add(randomDeathMessage(deathCause));
        //wait for any key to be pressed
        messageLog.add('Press any key to restart...');
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
    }*/

    render() {
        //Spawn Probability: ${Math.max(0.1, 0.35 - (this.dungeon.monsterSpawnCounter * 0.05))}
        //I don't remember what the above commented line was for
        const player = this.player;
        const searchRoom = this.dungeon.getRoom(player.currentPosition.x, player.currentPosition.y)
        let desc = false
        if (searchRoom.enemy) {
            desc = searchRoom.enemy.description + "<br>" + attackButton(searchRoom.enemy.name, `Attack ${searchRoom.enemy.name}`)

        }
        //console.log(`room: ${searchRoom}`);
        //console.log(`desc: ${desc}`);
        return {
            stats: `Health: ${String(player.health).padStart(4, '0')}  Attack Power: ${String(this.player.attackPower).padStart(4, '0')}  Rooms Explored: ${String(this.dungeon.visitedRooms.size).padStart(4, '0')} \n Slain: ${String(player.kills).padStart(4, '0')}        Looted: ${String(this.statistics.itemsFound).padStart(4, '0')}  Frames: ${String(messageLog.frames).padStart(4, '0')}   Name: ${player.name}`,
            map: this.dungeon.displayMap(player.id),
            messages: messageLog.getMessages(player.id),
            room: this.dungeon.getRoom(player.currentPosition.x, player.currentPosition.y),
            health: player.health.value,
            deathMessage: randomDeathMessage(player.deathCause, player.name),
            playerId: player.id,
            enemyDesc: desc,
            player
        };

    }

    getPlayerAction() {
        return this.prompt('Enter action (type "help" for help.): ');
    }

    async handleAction(action, playerId) {
        //console.log(action);
        if (!action || action.length === 0) {
            messageLog.add("You must enter a command.", playerId);
            return;
        }


        const player = messageLog.getPlayer(playerId);
        console.log('handleAction', player.name, action)
        if (!player.currentPosition) {
            player.currentPosition = { x: 0, y: 0 }; // Initialize player position if not set
        }
        const currentRoom = this.dungeon.getRoom(player.currentPosition.x, player.currentPosition.y);

        if (currentRoom.items.length > 0) {
            // Check if the first item is null
            currentRoom.items = currentRoom.items.filter(item => item);
            // This is a temporary fix to remove null items from the items array
            // Eventually, fix the issue at the source
        }

        player.restCooldown > 0 ? player.restCooldown-- : null;

        const [command, ...args] = action.toLowerCase().split(' ');
        const target = args.join(' ');
        switch (command) {
            case 'interact':
                let targetContent = target.toLowerCase();

                let content = currentRoom.contents.find(item => item.name && item.name.toLowerCase() === targetContent);

                if (!content) {
                    messageLog.add('There is no such thing to interact with.', playerId);
                    break;
                }

                if (!content.interactive) {
                    messageLog.add(randomInteractionResponse(content.name), playerId);
                    break;
                }
                //interactive contents
                //{...content interactive:true, action:()=>{console.log('interacted with',content.name)}}

                content.action(this.player);

                break;
            case 'restart':
                messageLog.clear();
                messageLog.add('Game Restarted!', playerId);
                messageLog.add('You explored the dungeon for ' + this.calculateTimeSpent() + '!', playerId);
                messageLog.add('You defeated ' + messageLog.enemiesKilled + ' enemies and found ' + this.statistics.itemsFound + ' items.', playerId);
                messageLog.nl();
                this.player = new Player();
                this.dungeon.addPlayer(this.player); // Add player to the dungeon
                this.player.dungeon = this.dungeon;
                this.startTime = new Date();
                messageLog[playerId].enemiesKilled = 0;
                player.statistics = {
                    enemiesDefeated: 0,
                    itemsFound: 0
                };
                break;
            case 'read':
                let targetBook = target.toLowerCase();
                let book = currentRoom.contents.find(item => item.name && item.name.toLowerCase() === targetBook);

                if (book) {
                    // Log the book to confirm it's found and has an excerpt
                    console.log('Book found:', book);

                    // Only books have an excerpt, check if it exists
                    if (book.excerpt) {
                        //random number generator for book image
                        //currently a number between 1 and 14
                        let bookImage = Math.floor(Math.random() * 14) + 1;
                        let out = `<b>${book.name}</b><div class="book-container">
                        <img src="media/images/books/${bookImage}.jfif" alt="a blank page" class="book-image">
                        <div class="book-text">${book.excerpt}</div>
                    </div>`
                        messageLog.add(out, playerId);
                        //messageLog.add(`<b>${book.name}</b><br>${book.excerpt}`, playerId);

                        // If the book has an active ability, trigger it
                        if (book.active) {
                            book.ability(player);
                        }
                    } else {
                        // If no excerpt, log that it's missing or handle it gracefully
                        console.log('No excerpt found for book:', book.name);
                        messageLog.add(`You open the book, but it appears to be blank.`, playerId);
                    }
                } else {
                    // Handle case where the book is not found in the room
                    console.log(`No book named "${target}" found in the current room.`);
                    messageLog.add(`There is no book titled "${target}" here.`, playerId);
                }
                break;

            case 'inventory':
                //console.log(this.player.inventory)
                messageLog.add(this.player.displayInventory(), playerId);
                break;
            case 'broadcast':
                let hasRadio = this.player.checkInventory('Radio')
                if (hasRadio) {
                    let message = args.join(' ');
                    messageLog.add(`You broadcast: ${message}`, playerId);
                    messageLog.add(`${this.player.name}: ${message}`, "GLOBAL", "timed", true, 4);
                } else {
                    messageLog.add('You need a radio to broadcast.', playerId);
                }
                break;
            case 'help':
                messageLog.nl()
                messageLog.add('Welcome to the Dungeon Crawler!', playerId);
                //how was the fall?
                messageLog.add('Commands: move [north/south/east/west], search, attack, inspect [name], grab, quit', playerId);

                messageLog.add('You can also type "help" to see this message again.', playerId);
                messageLog.add('You can inspect enemies and items by typing "inspect" followed by the name of the enemy or item.', playerId);
                messageLog.add('Map Legend: P = Player, ☠ = Enemy, * = Item, # = Impassable Room', playerId);
                messageLog.add('When you enter an impassable room, you can only exit back the way you came.', playerId);
                messageLog.nl()
                break;
            case 'afflictions':
                let afflictions = this.player.afflictions;
                if (afflictions.length > 0) {
                    messageLog.add('You are afflicted with:', playerId);
                    afflictions.forEach(affliction => {
                        messageLog.add(affliction, playerId);
                    });
                } else {
                    messageLog.add('You are not afflicted with anything.', playerId);
                }
                break;
            case 'move':
                //check player speed
                if (this.player.speed <= 0) {



                    if (this.player.hasAffliction('fleshToStone')) messageLog.add('Statues cannot move.', playerId);
                    else messageLog.add('You are too tired to move!', playerId);
                }
                else {
                    this.dungeon.move(target, playerId);
                    //this.dungeon.display(playerId); // Display the room after moving
                }
                break;
            case 'search':
                //const item = this.dungeon.search();
                //if (item) {
                //    this.player.addItem(item);
                //    this.statistics.itemsFound++;
                //    this.dungeon.removeItem();
                //}
                const player = this.player;
                const searchRoom = this.dungeon.getRoom(player.currentPosition.x, player.currentPosition.y)
                if (target === '') {
                    messageLog.nl()
                    let list = [];
                    searchRoom.enemy ? list.push(inspectButton(searchRoom.enemy.name)) : null;
                    searchRoom.items ? searchRoom.items.forEach((x) => { x ? list.push(inspectButton(x.name)) : null }) : null;
                    searchRoom.contents.forEach(item => list.push(inspectButton(item.name)));
                    searchRoom.players > 1 ? searchRoom.players.forEach(player => list.push(inspectButton(player.name))) : null;
                    messageLog.add(`You see: ${[...list, inspectButton('myself')].join(' ')}`, playerId);
                    messageLog.add(`<br>For further detail use inspect [name].`, playerId);
                }
                break;
            case 'attack':
                if (this.player.hasAffliction('fleshToStone')) {

                    messageLog.add('Statues cannot attack.', playerId);

                }
                const room = this.dungeon.getRoom(this.player.currentPosition.x, this.player.currentPosition.y);
                if (room.enemy) {
                    let enemyName = room.enemy.name;
                    if (this.player.hasAffliction('fleshToStone')) {

                        messageLog.add('Statues cannot attack.', playerId);

                    } else {
                        this.player.attack(room.enemy);
                        messageLog.add(`You attack the ${enemyName}.`, playerId);
                    }

                    if (!room.enemy) {
                        messageLog.add(`The corpse of a ${enemyName} lies here.`, playerId);
                    } else {
                        room.enemy.performBehavior(this.player);
                    }
                } else {
                    messageLog.add('There is nothing to attack here.', playerId);
                }
                break;
            case 'inspect':
                this.inspect(target);
                break;
            case 'quit':
                this.player.die();
                break;
            case 'grab':
                const item = this.dungeon.grab(target, this.player.id);
                if (item) {
                    this.player.addItem(item);
                    this.statistics.itemsFound++;
                    //this.dungeon.removeItem();
                }
                break;
            case 'rest':
                let thisRoom = this.dungeon.getRoom(this.player.currentPosition.x, this.player.currentPosition.y);
                if (this.player.canRest) {
                    if (this.player.restCooldown === 0) {
                        this.player.health.increaseBy(10);
                        messageLog.add(`You rest and regain 10 health points.`, playerId);
                        this.player.restCooldown = 5;
                    } else {
                        messageLog.add(`You can only rest once every five turns. You have ${this.player.restCooldown} turns left.`, playerId);
                    }

                    if (thisRoom.enemy && !thisRoom.enemy.isDead()) {
                        if (Math.random() < 0.9) { // 90% chance to attack
                            thisRoom.enemy.attack(this.player);
                            messageLog.add(`==}The ${inspectButton(thisRoom.enemy.name)} attacks you as you lay down to rest!{==`, playerId);
                        }
                    }

                }
                break;
            case 'spawnitem':
                let coords = `${this.player.currentPosition.x},${this.player.currentPosition.y}`;
                let thisroom = this.dungeon.map.get(coords);
                if (thisroom) {
                    let thisItem = items.find(item => item.name.toLowerCase() === target.toLowerCase());
                    if (thisItem) {
                        thisroom.items.push(thisItem);
                        messageLog.add(`Spawned a ${thisItem.name} at your current location.`, playerId);
                    } else {
                        messageLog.add(`Item ${target} not found.`, playerId);
                    }
                } else {
                    messageLog.add(`Current location not found in dungeon map.`, playerId);
                }
                break;
            default:
                messageLog.add('Invalid action!', playerId);
        }
        for (let [key, room] of this.dungeon.map.entries()) {
            const [x, y] = key.split(',').map(Number);
            //the enemy in the same room as the player should not move if the player just attacked it
            const player = this.player;
            const currRoom = this.dungeon.getRoom(player.currentPosition.x, player.currentPosition.y)

            if (x === player.currentPosition.x && y === player.currentPosition.y) {
                continue;
            }
            if (room.enemy && !room.enemy.isDead()) {
                const chanceToMove = Math.random();
                if (chanceToMove > (1 - room.enemy.speed)) { // chance to move is different for each enemy
                    this.dungeon.moveEnemyToNearbyRoom(x, y);

                }
                //message if enemy moves to the same room as the player
                //this is not currently functional as it is checking the spot the monster moved from
                //instead of the spot the monster moved to
                if (x === this.player.currentPosition.x && y === this.player.currentPosition.y) {
                    messageLog.add(`The ${room.enemy.name} chases you!`, playerId);
                    room.enemy.performBehavior(this.player);
                }
            }
        }
        messageLog.frames++;
    }

    inspect(target) {

        const room = this.dungeon.getRoom(this.player.currentPosition.x, this.player.currentPosition.y);
        if (target === 'myself') {
            const encouragingPhrases = [
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} who was unexpectedly torn from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and cast into this dungeon! You possess ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} snatched from ${messageLog.playerGender === 'M' ? 'his' : 'her'} cozy abode and hurled into this dungeon! You have ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} wrenched from ${messageLog.playerGender === 'M' ? 'his' : 'her'} safe haven and tossed into this dungeon! You hold ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} who was unceremoniously dragged from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and thrown into this dungeon! You have ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} suddenly abducted from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and cast into this dungeon! You have ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} who was harshly taken from ${messageLog.playerGender === 'M' ? 'his' : 'her'} residence and thrown into this dungeon! You possess ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} yanked from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and tossed into this dungeon! You have ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} who was roughly taken from ${messageLog.playerGender === 'M' ? 'his' : 'her'} dwelling and thrown into this dungeon! You have ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} who found ${messageLog.playerGender === 'M' ? 'his' : 'her'} home invaded and was subsequently cast into this dungeon! You have ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`,
                `You are ${this.player.name}, a ${this.player.gender === 'M' ? 'male' : 'female'} ${this.player.species} forcibly removed from ${messageLog.playerGender === 'M' ? 'his' : 'her'} home and thrown into this dungeon! You have ${this.player.health.value} health points and an attack power of ${this.player.attackPower}.`
            ];
            messageLog.nl();
            if(!this.player.hasAffliction('Birth of Music'))    messageLog.add(encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)], this.player.id);
            else messageLog.add(this.player.description, this.player.id);
        } else if (room.players.size > 1 && Array.from(room.players).find(player => player.name.toLowerCase() === target.toLowerCase())) {
            messageLog.nl();
            messageLog.add(`You see ${target}.`, this.player.id);

            // Convert the Set to an array to find the target player
            let targetPlayer = Array.from(room.players).find(player => player.name.toLowerCase() === target.toLowerCase());
            const playerDescription = `${targetPlayer.name} is a ${targetPlayer.gender} ${targetPlayer.species} with ${targetPlayer.health} health points and an attack power of ${targetPlayer.attackPower}.`;

            messageLog.add(playerDescription, this.player.id);
        }

        else if (room.enemy && room.enemy.name.toLowerCase() === target.toLowerCase()) {
            messageLog.nl();
            messageLog.add(`<b>${room.enemy.name}</b><br>`, this.player.id);
            messageLog.add(`Health: ${room.enemy.health}  Attack Power: ${room.enemy.attackPower}`, this.player.id);
            messageLog.add(room.enemy.description, this.player.id);
            messageLog.add(attackButton(room.enemy.name, `Attack ${room.enemy.name}`), this.player.id);
        } else {
            const item = room.items.filter(item => item).find(item => item.name.toLowerCase() === target.toLowerCase());
            if (item) {
                messageLog.nl();
                messageLog.add(`${item.name}`, this.player.id);
                switch (item.effect.type) {
                    case 'health':
                        messageLog.add(`Grants ${item.effect.value} health points.`, this.player.id);
                        break;
                    case 'attack':
                        messageLog.add(`Grants ${item.effect.value} attack power.`, this.player.id);
                        break;
                    case 'gamble':
                        messageLog.add(`A gamble, picking this up means putting your life at risk.`, this.player.id);
                        break;
                    case 'rest':
                        messageLog.add(`Unlocks the ability to rest once every five turns.`, this.player.id);
                        break;
                    default:
                        messageLog.add('Invalid effect type!', this.player.id);
                }
                messageLog.add(item.description, this.player.id);
                messageLog.add(grabButton(item.name, 'grab'), this.player.id);
            } else if (room.contents.find(item => item.name.toLowerCase() === target.toLowerCase())) {
                let found = room.contents.find(item => item.name.toLowerCase() === target.toLowerCase());

                if (found) {
                    messageLog.nl();
                    messageLog.add(`<b>${found.name}</b><br>`, this.player.id);
                    messageLog.add(`${found.description}`, this.player.id);
                    if (found.excerpt) {
                        messageLog.add(readButton(found.name), this.player.id);
                    }
                    if (found.interactive) {
                        messageLog.add(interactButton(found.name, found.buttonText), this.player.id);
                    }
                } else {
                    messageLog.add('No matching item found.', this.player.id); // Optional: Handle case where no item is found
                }

            } else {
                messageLog.add('You found nothing.', this.player.id);
            }
        }
    }
}