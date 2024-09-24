import { messageLog } from './messageLog.mjs';

export class Enemy {
    constructor(name, health, attackPower, behavior, description) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.behavior = behavior;
        this.description = description;
    }

    attack(player) {
        const message = `The ${this.name} attacks you for ${this.attackPower} damage.`;
        messageLog.add(message);
        player.health -= this.attackPower;
        if (player.health <= 0) {
            messageLog.deathCause = this.name;
        } else {
            messageLog.add(`You have ${player.health} health left.`);
        }
    }

    takeDamage(damage,player) {
        this.health -= damage;
        if (this.health <= 0) {
            messageLog.enemiesKilled++;
            player.attackPower++
            player.health++
            messageLog.add(`The ${this.name} is dead.`);
        } else {
            messageLog.add(`The ${this.name} has ${this.health} health left.`);
        }
    }

    isDead() {
        return this.health <= 0;
    }

    performBehavior(player) {
        switch (this.behavior) {
            case 'aggressive':
                this.attack(player);
                break;
            case 'defensive':
                messageLog.add(`The ${this.name} defends itself.`);
                this.health += 5; // Heals itself
                messageLog.add(`The ${this.name} heals itself and now has ${this.health} health.`);
                break;
            case 'evasive':
                messageLog.add(`The ${this.name} tries to evade your attacks.`);
                // Reduces damage taken
                this.evasive = true;
                break;
            default:
                this.attack(player);
        }
    }

    takeDamageWithEvasion(damage) {
        if (this.evasive) {
            damage /= 2;
            this.evasive = false; // Reset evasive state after taking damage
        }
        this.takeDamage(damage);
    }
}