import { descriptions, impassableDescriptions, getRandomDescription, getRandomPassableDescription } from './descriptions.mjs';
import { createEnemy, getRandomEnemy } from './enemies.mjs';
import { items } from './items.mjs';
import { messageLog } from './messageLog.mjs';

export class Dungeon {
    constructor(player) {
        //this.player = player; // Store the player object
        this.map = new Map();
        this.players = new Map(); // Store players by their IDs
        
        this.visitedRooms = new Set();
        this.monsterSpawnCounter = 0
        this.generateRoom(0, 0, true);
        this.visitedRooms.add(`0,0`);
    }

    addPlayer(player) {
        if (!this.players.has(player.id)) {
            //messageLog.addPlayer(player.id, player);
            this.players.set(player.id, player);
            const startingRoom = this.getRoom(player.currentPosition.x, player.currentPosition.y);
            startingRoom.players.add(player.id); // Add player to starting room
        } else {
            console.warn(`Player with ID ${player.id} already exists in the dungeon.`);
        }
    }

    getPlayer(playerId) {
        return messageLog.getPlayer(playerId);
    }

    removePlayer(playerId) {
        const player = this.getPlayer(playerId);
        if (player) {
            const currentRoom = this.getRoom(player.currentPosition.x, player.currentPosition.y);
            currentRoom.players.delete(playerId); // Remove player from current room
        }
        this.players.delete(playerId);
        messageLog.removePlayer(playerId);
    }

    randomEnemy() {
        return getRandomEnemy();
    }

    randomItem() {
        return items[Math.floor(Math.random() * items.length)];
    }

    generateRoom(x, y, start = false) {
        const description = start ? getRandomPassableDescription() : getRandomDescription();

        // Adjust enemy spawn probability based on the monsterSpawnCounter
        const enemySpawnProbability = Math.max(0.1, 0.35/* - (this.monsterSpawnCounter * 0.05)*/); // Minimum probability of 0.1
        const enemy = Math.random() < enemySpawnProbability ? this.randomEnemy() : null;

        if (enemy) {
            this.monsterSpawnCounter++;
        } else {
            this.monsterSpawnCounter = Math.max(0, this.monsterSpawnCounter - 1); // Decrease counter if no enemy spawns
        }
        let items = []
        const item = Math.random() > 0.5 ? this.randomItem() : null; // The lower the number, the higher the odds of item spawn
        items.push(item);
        Math.random() > 0.7 ? items.push(this.randomItem()) : null;
        const passable = description.impassable ? false : true;
        this.map.set(`${x},${y}`, { description: (start ? description.startMessage : description.description), enemy, items, passable, contents: description.contents, name: description.name, isGate: description.isGate, players: new Set() });
    }

    getRoom(x, y) {
        const key = `${x},${y}`;
        if (!this.map.has(key)) {
            this.generateRoom(x, y)
        }
        return this.map.get(key);
    }

    getAdjacentRooms(x, y) {
        const directions = [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: 0 }
        ];
        return directions.map(dir => this.getRoom(x + dir.x, y + dir.y));
    }

    spawnEnemy(x, y) {
        const room = this.getRoom(x, y);
        if (!room.enemy) {
            room.enemy = getRandomEnemy();
        }
    }

    calculateDistance(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    moveEnemyToNearbyRoom(x, y) {
        if (!this.getRoom(x, y).enemy) return;
        const currentRoom = this.getRoom(x, y);
        //let likelihood = 1 - currentRoom.enemy.speed
        //if (Math.random() > likelihood) {
            if (currentRoom.enemy) {
                const adjacentRooms = this.getAdjacentRooms(x, y).filter(room => room.passable && !room.enemy);
                if (adjacentRooms.length > 0) {
                    const randomIndex = Math.floor(Math.random() * adjacentRooms.length);
                    const newRoom = adjacentRooms[randomIndex];
                    newRoom.enemy = currentRoom.enemy;
                    currentRoom.enemy = null;
                    //return newRoom;
                }
            }
            /*if (currentRoom.enemy) {
                const playerX = this.currentPosition.x;
                const playerY = this.currentPosition.y;
                const distanceToPlayer = this.calculateDistance(x, y, playerX, playerY);

                if (distanceToPlayer <= 4) {
                    // Move towards the player
                    const directions = [
                        { x: 0, y: 1 },
                        { x: 1, y: 0 },
                        { x: 0, y: -1 },
                        { x: -1, y: 0 }
                    ];

                    let bestDirection = null;
                    let shortestDistance = distanceToPlayer;

                    for (const dir of directions) {
                        const newX = x + dir.x;
                        const newY = y + dir.y;
                        const newDistance = this.calculateDistance(newX, newY, playerX, playerY);
                        const newRoom = this.getRoom(newX, newY);

                        if (newDistance < shortestDistance && newRoom.passable && !newRoom.enemy) {
                            bestDirection = dir;
                            shortestDistance = newDistance;
                        }
                    }

                    if (bestDirection) {
                        const newRoom = this.getRoom(x + bestDirection.x, y + bestDirection.y);
                        newRoom.enemy = currentRoom.enemy;
                        currentRoom.enemy = null;
                        //return newRoom;
                    }
                } else {
                    // Move to a random adjacent room
                    const adjacentRooms = this.getAdjacentRooms(x, y).filter(room => room.passable && !room.enemy);
                    if (adjacentRooms.length > 0) {
                        const randomIndex = Math.floor(Math.random() * adjacentRooms.length);
                        const newRoom = adjacentRooms[randomIndex];
                        newRoom.enemy = currentRoom.enemy;
                        currentRoom.enemy = null;
                        //return newRoom;
                    }
                }
            }*/
        //}
    }

    display(playerId) {
        const player = this.getPlayer(playerId);
        if (!player) {
            messageLog.add('Player not found!', playerId);
            return;
        }

        const room = this.getRoom(player.currentPosition.x, player.currentPosition.y);
        //messageLog.add(`${room.name ? room.name : room.impassable ? 'Impassable Chamber' : 'Dungeon Chamber'}\n${room.description}.`);
        if (!room.passable) {
            messageLog.add('This room is impassable. You can only exit back the way you came.', playerId);
        }
        if (room.enemy) {
            if (room.enemy.isDead()) {
                messageLog.add(`The corpse of a ${room.enemy.name} lies here.`, playerId);
            } else {
                messageLog.add(`There is a ${room.enemy.name} here.`, playerId);
            }
        }
        if (room.items && room.items.length > 0) {
            room.items = room.items.filter(item => item !== null); // Remove null items
            room.items.forEach(item => {
                messageLog.add(`You see a ${item.name} here.`, playerId);
            });
        }
        if (room.players.size > 0) {
            room.players.forEach(id => {
                if (id !== playerId) {
                    const otherPlayer = this.getPlayer(id);
                    messageLog.add(`Player ${otherPlayer.name} is here.`, playerId);
                }
            });
        }
    }

    grab(target, playerId) {
        const player = this.getPlayer(playerId);
        const room = this.getRoom(player.currentPosition.x, player.currentPosition.y);
        const itemIndex = room.items.findIndex(item => item ? item.name.toLowerCase() === target.toLowerCase() : false);

        if (itemIndex !== -1) {
            const item = room.items[itemIndex];
            messageLog.add(`You found a ${item.name}.`, playerId);
            room.items.splice(itemIndex, 1); // Remove the item from the room
            return item;
        } else {
            messageLog.add('You found nothing.',playerId);
            return null;
        }
    }

    removeItem(name, playerId) {
        const player = this.getPlayer(playerId);
        const room = this.getRoom(player.currentPosition.x, player.currentPosition.y);
        room.items = room.items.filter(item => item.name.toLowerCase() !== name.toLowerCase());
    }

    move(direction, playerId) {
        const player = this.getPlayer(playerId);
        if (!player) {
            console.error(`Player with ID ${playerId} not found.`);
            return;
        }
    
        const currentRoom = this.getRoom(player.currentPosition.x, player.currentPosition.y);
        if (!this.canMove(direction, player)) {
            messageLog.add(`You can't move ${direction} from here.`, playerId);
            return;
        }
    
        // Remove player from the current room
        currentRoom.players.delete(playerId);
    
        // Store the current position as the previous position before moving
        const previousPosition = { ...player.currentPosition }; // Deep copy of current position
    
        // Move the player
        switch (direction) {
            case 'north':
                player.currentPosition.y -= 1;
                break;
            case 'south':
                player.currentPosition.y += 1;
                break;
            case 'east':
                player.currentPosition.x += 1;
                break;
            case 'west':
                player.currentPosition.x -= 1;
                break;
            default:
                messageLog.add('Invalid direction!', playerId);
                return;
        }
    
        const newRoom = this.getRoom(player.currentPosition.x, player.currentPosition.y);
        newRoom.players.add(playerId); // Add player to the new room
        this.visitedRooms.add(`${player.currentPosition.x},${player.currentPosition.y}`);
    
        // Store the direction the player entered from, for impassable room checks
        player.previousDirection = direction;
    
        if (!newRoom.passable) {
            messageLog.add(`Player ${player.name} moves ${direction}.`);
            messageLog.add('You enter an impassable room. You can only exit back the way you came.', playerId);
        } else {
            messageLog.add(`Player ${player.name} moves ${direction}.`);
        }
    
        // Chance for enemy to attack when entering the room
        if (newRoom.enemy && !newRoom.enemy.isDead()) {
            if (Math.random() < 0.5) { // 50% chance to attack
                newRoom.enemy.attack(player);
                messageLog.add(`The ${newRoom.enemy.name} attacks Player ${player.name} as they enter the room!`, playerId);
                if (player.health <= 0) {
                    player.deathCause = newRoom.enemy.name; // Set the cause of death
                }
            }
        }
    }
    

    canMove(direction, player) {
        const room = this.getRoom(player.currentPosition.x, player.currentPosition.y);
        if (!room.passable) {
            const oppositeDirection = {
                north: 'south',
                south: 'north',
                east: 'west',
                west: 'east'
            };
            // Allow movement only in the opposite direction they came from in impassable rooms
            return direction === oppositeDirection[player.previousDirection];
        }
        return true;
    }

    displayMap(playerId) {
        let map = '<table border="1">';
        const minX = Math.min(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[0])));
        const maxX = Math.max(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[0])));
        const minY = Math.min(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[1])));
        const maxY = Math.max(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[1])));

        // Iterate from minY to maxY to display the map in the correct direction
        const player = this.getPlayer(playerId);
        for (let y = minY; y <= maxY; y++) {
            let row = '<tr>';
            for (let x = minX; x <= maxX; x++) {
                const roomKey = `${x},${y}`;
                let cellContent = '';
                let room = this.getRoom(x, y);
                if (player.currentPosition.x === x && player.currentPosition.y === y) {
                    cellContent = `${player.gender === 'M'?' 🧍‍♂️ ':' 🧍‍♀️ '}`;
                } else if (room.players.size > 0) {
                    room.players.size>1?celllContent=' 👥 ':cellContent = '[P]';
                } else if (this.visitedRooms.has(roomKey)) {
                    const room = this.getRoom(x, y);
                    if (room.isGate) {
                        cellContent = ' ∞ ';
                    } else if (!room.passable) {
                        cellContent = ' X ';
                    } else if (room.enemy && !room.enemy.isDead()) {
                        cellContent = ' ☠ ';
                    } else if (room.items && room.items.length > 0) {
                        cellContent = '[<img src="media/images/coin.png" height="15px">]';
                    } else if (room.roomType=='library'){
                        cellContent = '📚';
                    } else {
                        cellContent = ' 🏻 ';
                    }
                } else {
                    cellContent = ' ';
                }
                row += `<td id="roomCell" key="${x},${y}">${cellContent}</td>`;
            }
            row += '</tr>';
            map += row;
        }
        map += '</table>';
        return map;
    }

}