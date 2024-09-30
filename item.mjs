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
        const playerId = player.id;
        const applyHealthEffect = (value, beneficial = false) => {
            player.health += value;
            if (beneficial) {
                player.attackPower += this.pityValue;
            }
            messageLog.add(`Your health changed by ${value}.`,playerId);
        };
    
        const applyAttackEffect = (value, beneficial = false) => {
            player.attackPower += value;
            if (beneficial) {
                player.health += this.pityValue;
            }
            messageLog.add(`Your attack power changed by ${value}.`,playerId);
        };
    
        const handleGambleEffect = () => {
            let chance = Math.random();
            if (chance < 0.2) {
                player.attackPower *= 2;
                messageLog.add(`You doubled your attack power!`,playerId);
            } else if (chance < 0.4) {
                player.attackPower /= 2;
                messageLog.add(`You halved your attack power!`,playerId);
            } else {
                messageLog.add(`You gambled and spawned a random enemy!`,playerId);
                player.dungeon.spawnEnemy(`${player.dungeon.currentPosition.x},${player.dungeon.currentPosition.y}`);
            }
        };
    
        const handleCursedEffect = () => {
            switch (this.effect.type) {
                case 'health':
                    applyHealthEffect(-this.effect.value, this.isBeneficial);
                    messageLog.add(this.curseDescription,playerId);
                    if (player.isDead()) player.deathCause = this.name;
                    break;
                case 'attack':
                    applyAttackEffect(-this.effect.value, this.isBeneficial);
                    messageLog.add(this.curseDescription,playerId);
                    break;
                default:
                    messageLog.add('Invalid effect type!',playerId);
            }
        };

        const handleOneOffEffects = () => {
            switch (this.effect.tag) {
                case 'genderFlip':
                    messageLog.add('You feel a strange sensation washing over you...',playerId);
                    //m becomes f, f becomes m, o stays o
                    player.gender = player.gender === 'M' ? 'F' : player.gender === 'F' ? 'M' : 'O';
                    break;
                default:
                    messageLog.add('Invalid effect type!',playerId);
            }
        }
    
        const handleBeneficialEffect = () => {
            switch (this.effect.type) {
                case 'health':
                    applyHealthEffect(this.effect.value);
                    break;
                case 'attack':
                    applyAttackEffect(this.effect.value);
                    break;
                case 'rest':
                    player.canRest = true;
                    player.restCooldown = 0;
                    messageLog.add(`You can now rest once every five turns. Resting will restore 10 health points.`,playerId);
                    break;
                case 'gamble':
                    handleGambleEffect();
                    break;
                case 'oneOff':
                    handleOneOffEffects();
                    break;
                default:
                    messageLog.add('Invalid effect type!',playerId);
            }
        };
    
        if (this.isCursed) {
            handleCursedEffect();
        } else {
            handleBeneficialEffect();
        }
    }
}