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
        const enemy = Math.random() > 0.5 ? this.randomEnemy() : null;
        const item = Math.random() > 0.5 ? this.randomItem() : null;
        const passable = !impassableDescriptions.includes(description);
        this.map.set(`${x},${y}`, { description, enemy, item, passable });
    }

    getRoom(x, y) {
        if (!this.map.has(`${x},${y}`)) {
            this.generateRoom(x, y);
        }
        return this.map.get(`${x},${y}`);
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