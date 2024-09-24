import { messageLog } from './messageLog.mjs';
export class Item {
    constructor(name, effect, description, isCursed=false, pityValue, isBeneficial, curseDescription) {
        this.name = name;
        this.effect = effect;
        this.description = description;
        this.isCursed = isCursed;
        this.pityValue = pityValue;
        this.isBeneficial = isBeneficial;
        this.curseDescription = curseDescription;
    }

    applyEffect(player) {
        if(this.isCursed){
            switch (this.effect.type) {
                case 'health':
                    player.health -= this.effect.value;
                    if(this.isBeneficial){
                        player.attackPower += this.pityValue;
                    }
                    messageLog.add(this.curseDescription);
                    player.isDead()? messageLog.deathCause = this.name : null;
                    break;
                case 'attack':
                    player.attackPower -= this.effect.value;
                    if(this.effect.isBeneficial){
                        player.health += this.pityValue;
                    }
                    messageLog.add(this.curseDescription);
                    break;
                default:
                    messageLog.add('Invalid effect type!');
            }
        }

        else if (this.effect.type === 'health') {
            player.health += this.effect.value;
            messageLog.add(`Your health increased by ${this.effect.value}.`);
        } else if (this.effect.type === 'attack') {
            player.attackPower += this.effect.value;
            messageLog.add(`Your attack power increased by ${this.effect.value}.`);
        } else if(this.effect.type === 'rest'){
            player.canRest = true
            player.restCooldown = 0
            messageLog.add(`You can now rest once every five turns. Resting will restore 10 health points.`);
        }else if(this.effect.type === 'gamble'){
            // 20% chance to double attack power. 20% chance to halve attack power. 60% chance to spawn a random enemy.
            let chance = Math.random();
            if(chance < 0.2){
                player.attackPower *= 2;
                messageLog.add(`You doubled your attack power!`);
            }
            else if(chance < 0.4){
                player.attackPower /= 2;
                messageLog.add(`You halved your attack power!`);
            }
            else{
                messageLog.add(`You gambled and spawned a random enemy!`);
                player.dungeon.spawnEnemy(`${player.dungeon.currentPosition.x},${player.dungeon.currentPosition.y}`);
            }

        }else {
            messageLog.add('Invalid effect type!');
        }
    }
}