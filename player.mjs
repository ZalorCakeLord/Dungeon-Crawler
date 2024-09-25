import { messageLog } from "./messageLog.mjs";

export class Player {
    constructor() {
        this.health = 100;
        this.attackPower = 10;
        this.inventory = [];
        this.xp = 0;
    }

    move() {
        console.log('You move to a new location.');
    }

    isDead() {
        return this.health <= 0;
    }

    die() {
        this.health = 0;
    }

    addItem(item) {
        this.inventory.push(item);
        console.log(`You picked up a ${item.name}.`);
        item.applyEffect(this);
    }

    displayInventory() {
        messageLog.add('Your inventory:');
        this.inventory.forEach(item => {
            messageLog.add(item.name);
        });
    }

    attack(enemy) {
        console.log(`You attack the ${enemy.name}.1`);
        enemy.takeDamage(this.attackPower,this);
        if (!enemy.isDead()) {
            enemy.attack(this);
        }
    }
}