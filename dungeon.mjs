import { descriptions, impassableDescriptions } from './descriptions.mjs';
import { createEnemy, getRandomEnemy } from './enemies.mjs';
import { items } from './items.mjs';
import { messageLog } from './messageLog.mjs';

export class Dungeon {
    constructor(player) {
        this.player = player; // Store the player object
        this.map = new Map();
        this.currentPosition = { x: 0, y: 0 };
        this.previousPosition = { x: 0, y: 0 };
        this.previousDirection = null;
        this.visitedRooms = new Set();
        this.monsterSpawnCounter = 0
        this.generateRoom(this.currentPosition.x, this.currentPosition.y);
        this.visitedRooms.add(`${this.currentPosition.x},${this.currentPosition.y}`);
    }

    randomEnemy() {
        return getRandomEnemy();
    }

    randomItem() {
        return items[Math.floor(Math.random() * items.length)];
    }

    generateRoom(x, y) {
        const description = Math.random() > 0.2 ? descriptions[Math.floor(Math.random() * descriptions.length)] : impassableDescriptions[Math.floor(Math.random() * impassableDescriptions.length)];
        
        // Adjust enemy spawn probability based on the monsterSpawnCounter
        const enemySpawnProbability = Math.max(0.1, 0.35 - (this.monsterSpawnCounter * 0.05)); // Minimum probability of 0.1
        const enemy = Math.random() < enemySpawnProbability ? this.randomEnemy() : null;
        
        if (enemy) {
            this.monsterSpawnCounter++;
        } else {
            this.monsterSpawnCounter = Math.max(0, this.monsterSpawnCounter - 1); // Decrease counter if no enemy spawns
        }

        const item = Math.random() > 0.5 ? this.randomItem() : null; // The lower the number, the higher the odds of item spawn
        const passable = !impassableDescriptions.includes(description);
        this.map.set(`${x},${y}`, { description, enemy, item, passable });
    }

    getRoom(x, y) {
        if (!this.map.has(`${x},${y}`)) {
            this.generateRoom(x, y);
        }
        return this.map.get(`${x},${y}`);
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
        const currentRoom = this.getRoom(x, y);
        if (currentRoom.enemy) {
            const playerX = this.currentPosition.x;
            const playerY = this.currentPosition.y;
            const distanceToPlayer = this.calculateDistance(x, y, playerX, playerY);

            if (distanceToPlayer <= 2) {
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
        }
    }

    display() {
        const room = this.getRoom(this.currentPosition.x, this.currentPosition.y);
        console.log(`You are in ${room.description}.`);
        if (!room.passable) {
            console.log('This room is impassable. You can only exit back the way you came.');
        }
        if (room.enemy) {
            if (room.enemy.isDead()) {
                console.log(`The corpse of a ${room.enemy.name} lies here.`);
            } else {
                console.log(`There is a ${room.enemy.name} here.`);
            }
        }
        if (room.item) {
            console.log(`You see a ${room.item.name} here.`);
        }
    }

    search() {
        const room = this.getRoom(this.currentPosition.x, this.currentPosition.y);
        if (room.item) {
            console.log(`You found a ${room.item.name}.`);
            return room.item;
        } else {
            console.log('You found nothing.');
            return null;
        }
    }

    removeItem() {
        const room = this.getRoom(this.currentPosition.x, this.currentPosition.y);
        room.item = null;
    }

    move(direction) {
        this.previousPosition = { ...this.currentPosition };
        this.previousDirection = direction;

        switch (direction) {
            case 'north':
                this.currentPosition.y -= 1;
                break;
            case 'south':
                this.currentPosition.y += 1;
                break;
            case 'east':
                this.currentPosition.x += 1;
                break;
            case 'west':
                this.currentPosition.x -= 1;
                break;
            default:
                console.log('Invalid direction!');
                return;
        }

        const room = this.getRoom(this.currentPosition.x, this.currentPosition.y);
        this.visitedRooms.add(`${this.currentPosition.x},${this.currentPosition.y}`);
        if (!room.passable) {
            console.log('You enter an impassable room. You can only exit back the way you came.');
        } else {
            console.log(`You move ${direction}.`);
        }

        // Chance for enemy to attack when entering the room
        if (room.enemy && !room.enemy.isDead()) {
            if (Math.random() < 0.5) { // 50% chance to attack
                room.enemy.attack(this.player);
                messageLog.add(`==}The ${room.enemy.name} attacks you as you enter the room!{==`);
                if (this.player.health <= 0) {
                    messageLog.deathCause = room.enemy.name; // Set the cause of death
                }
            }
        }
    }

    canMove(direction) {
        const room = this.getRoom(this.currentPosition.x, this.currentPosition.y);
        if (!room.passable) {
            const oppositeDirection = {
                north: 'south',
                south: 'north',
                east: 'west',
                west: 'east'
            };
            return direction === oppositeDirection[this.previousDirection];
        }
        return true;
    }

    displayMap() {
        console.log('Dungeon Map:');
        const minX = Math.min(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[0])));
        const maxX = Math.max(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[0])));
        const minY = Math.min(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[1])));
        const maxY = Math.max(...Array.from(this.visitedRooms).map(key => parseInt(key.split(',')[1])));
        for (let y = minY; y <= maxY; y++) {
            let row = '';
            for (let x = minX; x <= maxX; x++) {
                const roomKey = `${x},${y}`;
                if (this.currentPosition.x === x && this.currentPosition.y === y) {
                    row += '[P] ';
                } else if (this.visitedRooms.has(roomKey)) {
                    const room = this.getRoom(x, y);
                    if(room.isGate){
                        row += '[∞] ';
                    } else if (!room.passable) {
                        row += '[X] ';
                    } else if (room.item) {
                        row += '[⋆] ';
                    } else if (room.enemy && !room.enemy.isDead()) {
                        row += '[☠] ';
                    } else {
                        row += '[ ] ';
                    }
                } else {
                    row += '    ';
                }
            }
            console.log(row);
        }
    }
}