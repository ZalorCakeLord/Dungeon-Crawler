import { messageLog } from './messageLog.mjs';
import {zalgoGeneration, zalgoRandomGeneration, unzalgoText} from 'zalgo-generator';
export class Item {
    constructor(name, effect, description, isCursed = false, pityValue, isBeneficial, curseDescription) {
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
            player.health.increaseBy(value);
            if (beneficial) {
                player.attackPower += this.pityValue;
            }
            messageLog.add(`Your health changed by ${value}.`, playerId);
        };

        const applyAttackEffect = (value, beneficial = false) => {
            player.attackPower += value;
            if (beneficial) {
                player.health.increaseBy(this.pityValue);
            }
            messageLog.add(`Your attack power changed by ${value}.`, playerId);
        };

        const handleGambleEffect = () => {
            let chance = Math.random();
            if (chance < 0.2) {
                player.attackPower *= 2;
                messageLog.add(`You doubled your attack power!`, playerId);
            } else if (chance < 0.4) {
                player.attackPower /= 2;
                messageLog.add(`You halved your attack power!`, playerId);
            } else {
                messageLog.add(`You gambled and spawned a random enemy!`, playerId);
                player.dungeon.spawnEnemy(`${player.currentPosition.x},${player.currentPosition.y}`);
            }
        };

        const handleCursedEffect = () => {
            switch (this.effect.type) {
                case 'health':
                    applyHealthEffect(-this.effect.value, this.isBeneficial);
                    messageLog.add(this.curseDescription, playerId);
                    if (player.isDead()) player.deathCause = this.name;
                    break;
                case 'attack':
                    applyAttackEffect(-this.effect.value, this.isBeneficial);
                    messageLog.add(this.curseDescription, playerId);
                    break;
                default:
                    messageLog.add('Invalid effect type!', playerId);
            }
        };

        const handleOneOffEffects = (value) => {
            switch (this.effect.tag) {
                case 'EldHarmonics':
                    messageLog.add("How to describe hearing the music of the stars? How to describe the screams of those slowly dying Gods? You can't. You can't, and you won't. You can only pretend you don't hear them.", playerId);
                    const descriptionStr = player.description
                    const eldritchStr = `How to describe hearing the music of the stars? How to describe the screams of those slowly dying Gods? You can't. You can't, and you won't. You can only pretend you don't hear them.`;
                    const glitchStr = `You are ${player.name}, a ${zalgoGeneration(player.gender === 'M' ? 'male' : 'female', 1, 1, 1)} ${zalgoGeneration(player.species)} who was unexpectedly torn from our home and cast into this dungeon! You possess ${player.health.value} health points and an attack power of ${player.attackPower}.`
                    player.description = `<p class="${glitchStr}">
    <span aria-hidden="true">${eldritchStr}</span>
    codepen
    <span aria-hidden="true">${glitchStr}</span>
  </p>`
                    player.health.decrement = function () {
                        this.health -= 1;
                        this.attackPower += 1;
                    }
                    //example of affliction { type: 'fleshToStone', duration: value }
                    player.afflictions.push({ type: 'Birth of Music', duration: 9999999999999999 });
                    
                    break;
                case 'genderFlip':
                    messageLog.add('You feel a strange sensation washing over you...', playerId);
                    //m becomes f, f becomes m, o stays o
                    player.gender = player.gender === 'M' ? 'F' : player.gender === 'F' ? 'M' : 'O';
                    break;
                case 'invisible':
                    messageLog.add('You feel yourself becoming invisible...', playerId);
                    player.visible = false;
                    //add a ${value} second timeout to turn the player back to normal
                    setTimeout(() => {
                        player.visible = true;
                        messageLog.add(`You have become visible again.`, playerId);
                    }, value * 1000);
                    break;
                default:
                    messageLog.add('Invalid effect type!', playerId);
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
                    messageLog.add(`You can now rest once every five turns. Resting will restore 10 health points.`, playerId);
                    break;
                case 'gamble':
                    handleGambleEffect();
                    break;
                case 'oneOff':
                    handleOneOffEffects();
                    break;
                default:
                    messageLog.add('Invalid effect type!', playerId);
            }
        };

        if (this.isCursed) {
            handleCursedEffect();
        } else {
            handleBeneficialEffect();
        }
    }
}