import { messageLog } from './messageLog.mjs';

export class Enemy {
    constructor(name, health, attackPower, behavior, description, attackMessages, speed, deathMessages, id) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.behavior = behavior;
        this.description = description;
        this.attackMessages = attackMessages || [`The ${name} attacks you for ${attackPower} damage.`];
        this.speed = speed;
        this.deathMessages = deathMessages || [`You killed the ${name}.`, `The ${name} is dead.`, `The ${name} has fallen!`];
        this.id = id; //Identifies which 'goblin' or 'zombie' or whatever is being referred to. There are duplicates of each enemy type in the list, but I like the higher odds duplicates bring, along with the alternate lore.
    }


    randomAttackMessage() {
        return this.attackMessages[Math.floor(Math.random() * this.attackMessages.length)];
    }

    randomDeathMessage() {
        return this.deathMessages[Math.floor(Math.random() * this.deathMessages.length)];
    }


    attackMessageFormatter(message) {
        return message.replace('{amount}', this.attackPower);
    }



    attack(player) {
        const message = this.attackMessageFormatter(this.randomAttackMessage());
        messageLog.add(message);

        if (player.canBeAttacked()) {
            player.health.decreaseBy(this.attackPower);
            if (player.health.value <= 0) {
                player.deathCause = this.name;
            } else {
                messageLog.add(`You have ${player.health} health left.`);
            }
        }
    }

    takeDamage(damage, player) {
        // Reduce health and check if enemy is defeated
        this.health -= damage;

        // Check for player health NaN issues
        if (isNaN(player.health.value)) {
            player.health.value = 100; // Default value or whatever initial health is
        }

        if (this.health <= 0) {
            player.kills++; // Increment the player's kills

            // Handle stat increases based on kills
            if (player.kills < 5) {
                player.attackPower++;
                player.health.increment();
            } else if (player.kills < 15) {
                player.attackPower += 2;
                player.health.increaseBy(2)
            } else if (player.kills < 30) {
                player.attackPower += 3;
                player.health.increaseBy(3);
            } else if (player.kills < 50) {
                player.attackPower += 4;
                player.health.increaseBy(4);
            } else if (player.kills < 75) {
                player.attackPower += 5;
                player.health.increaseBy(5);
            } else if (player.kills < 100) {
                player.attackPower += 6;
                player.health.increaseBy(6);
            } else if (player.kills < 150) {
                player.attackPower += 7;
                player.health.increaseBy(7);
            } else if (player.kills < 200) {
                player.attackPower += 8;
                player.health.increaseBy(8);
            } else if (player.kills < 250) {
                player.attackPower += 9;
                player.health.increaseBy(9);
            } else if (player.kills < 300) {
                player.attackPower += 10;
                player.health.increaseBy(10);
            } else {
                // Adjust scaling for very high kill counts
                player.attackPower += Math.floor(player.kills / 50);
                player.health.increaseBy(Math.floor(player.kills / 50));
            }

            // Log enemy death
            messageLog.add(this.randomDeathMessage(), player.id);
            let deathRoom = player.dungeon.getRoom(player.currentPosition.x, player.currentPosition.y);
            deathRoom.contents.push({ name: `Corpse of ${this.name}`, description: 'A lifeless body. ' + this.description });
            //deathRoom.items = [...deathRoom.items, ...this.inventory]; //enemy inventory is not implemented
            deathRoom.enemy = null;
        } else {
            // Log remaining health of the enemy
            messageLog.add(`The ${this.name} has ${this.health} health left.`, player.id);
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



export class Boss extends Enemy {
    constructor(name, health, attackPower, behavior, description, attackMessages, speed, deathMessages, specialAttack) {
        super(name, health, attackPower, behavior, description, attackMessages, speed, deathMessages);
        this.specialAttack = specialAttack; // Ensure specialAttack is assigned here
        this.evasive = false; // Initialize evasive state
    }

    doSpecialAttack(player) {
        let { effect, duration, messages } = this.specialAttack;
        let attackMessage = messages[Math.floor(Math.random() * messages.length)];
        messageLog.add(attackMessage, player.id);

        applyEffect(player, this.specialAttack);
    }

    performBehavior(player) {
        // Ensure specialAttack is defined before accessing it
        if (this.specialAttack && Math.random() < this.specialAttack.chance) {
            this.doSpecialAttack(player);
        } else {

            switch (this.behavior) {
                case 'aggressive':
                    super.attack(player);
                    break;
                case 'defensive':
                    messageLog.add(`The ${this.name} defends itself.`, player.id);
                    super.health += 10; // Heals itself
                    messageLog.add(`The ${this.name} heals itself and now has ${this.health} health.`, player.id);
                    break;
                case 'evasive':
                    messageLog.add(`The ${this.name} tries to evade your attacks.`, player.id);
                    this.evasive = true; // Mark as evasive
                    break;
                default:
                    this.attack(player);
            }
        }
    }

    takeDamageWithEvasion(damage) {
        if (this.evasive) {
            damage /= 2; // Reduce damage if evasive
            this.evasive = false; // Reset evasive state after taking damage
        }
        this.takeDamage(damage);
    }
}




// New function to apply effects for different scenarios
export function applyEffect(target, effect) {
    const targetId = target.id;

    const applyHealthEffect = (value) => {
        target.health.increaseBy(value)

        messageLog.add(`Your health changed by ${value}.`, targetId);
    };

    const applyFleshToStoneEffect = (target, value, targetId) => {
        // Check if the target is already afflicted
        const existingAffliction = target.afflictions.find(a => a.type === 'fleshToStone');
        if (existingAffliction) {
            // Clear existing timeout if there is one
            clearTimeout(existingAffliction.timeoutId);
            existingAffliction.duration = value; // Update duration if needed
            messageLog.add(`Your stone duration has been refreshed!`, targetId);
        } else {
            // Create a new affliction
            target.afflictions.push({ type: 'fleshToStone', duration: value });
        }

        target.speed = 0;

        // Create a timeout and store its ID
        const timeoutId = setTimeout(() => {
            target.speed = 1;
            messageLog.add(`You have been turned back to normal.`, targetId);
        }, value * 1000);

        // Update the affliction object to include the timeout ID
        const affliction = target.afflictions.find(a => a.type === 'fleshToStone');
        if (affliction) {
            affliction.timeoutId = timeoutId;
        }
        target.afflictions.push({ type: 'fleshToStone', duration: value });
        messageLog.add(`You have been turned to stone for ${value} seconds.`, targetId);
    }


    const applyWeaknessEffect = (value) => {
        let duration = effect.duration;
        let oldAttackPower = target.attackPower;
        target.attackPower -= value;
        let difference = oldAttackPower - target.attackPower;
        target.afflictions.push({ type: 'weakness', duration: duration });
        //timeout to turn the player back to normal
        //add back the attack power instead of setting it to the old value, in case it has changed
        setTimeout(() => {
            target.attackPower += difference;
            messageLog.add(`You have recovered from weakness.`, targetId);
        }, duration * 1000);

    };

    const applyAttackEffect = (value) => {
        target.attackPower += value;

        messageLog.add(`Your attack power changed by ${value}.`, targetId);
    };

    switch (effect.type) {
        case 'health':
            applyHealthEffect(effect.value);
            break;
        case 'attack':
            applyAttackEffect(effect.value);
            break;
        case 'fleshToStone':
            applyFleshToStoneEffect(effect.value);
            break;
        case 'weakness':
            applyWeaknessEffect(effect.value);
            break;
        // Handle other effects as necessary
        default:
            messageLog.add('Invalid effect type!', targetId);
    }
}