import { messageLog } from './messageLog.mjs';

export class Enemy {
    constructor(name, health, attackPower, behavior, description, attackMessages, speed) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.behavior = behavior;
        this.description = description;
        this.attackMessages = attackMessages || [`The ${name} attacks you for ${attackPower} damage.`];
        this.speed = speed;
    }

    
    randomAttackMessage() {
        return this.attackMessages[Math.floor(Math.random() * this.attackMessages.length)];
    }


    attackMessageFormatter(message) {
        return message.replace('{amount}', this.attackPower);
    }

    

    attack(player) {
        const message = this.attackMessageFormatter(this.randomAttackMessage());
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

            // increase stats when enemy is killed
            // increase is based on the enemy's attack power and health, as well as how many enemies have been killed.
            // This is to make the game more challenging as the player progresses.
            //if the player has killed less than 5 enemies, the player will get a +1 to attack power and health.
            //if the player has killed less than 15 enemies, the player will get a +2 to attack power and health.
            //and so on. [5, 15, 30, 50, 75, 100, 150, 200, 250, 300]... stretching to infinity.
            if (messageLog.enemiesKilled < 5) {
                player.attackPower++
                player.health++
            } else if (messageLog.enemiesKilled < 15) {
                player.attackPower += 2
                player.health += 2
            } else if (messageLog.enemiesKilled < 30) {
                player.attackPower += 3
                player.health += 3
            } else if (messageLog.enemiesKilled < 50) {
                player.attackPower += 4
                player.health += 4
            } else if (messageLog.enemiesKilled < 75) {
                player.attackPower += 5
                player.health += 5
            } else if (messageLog.enemiesKilled < 100) {
                player.attackPower += 6
                player.health += 6
            } else if (messageLog.enemiesKilled < 150) {
                player.attackPower += 7
                player.health += 7
            } else if (messageLog.enemiesKilled < 200) {
                player.attackPower += 8
                player.health += 8
            } else if (messageLog.enemiesKilled < 250) {
                player.attackPower += 9
                player.health += 9
            } else if (messageLog.enemiesKilled < 300) {
                player.attackPower += 10
                player.health += 10
            } else {

                player.attackPower += Math.floor(messageLog.enemiesKilled / 50)
                player.health += Math.floor(messageLog.enemiesKilled / 50)
            }
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