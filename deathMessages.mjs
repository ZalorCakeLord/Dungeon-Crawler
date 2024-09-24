import { messageLog } from './messageLog.mjs';

export const deathMessages = [
    `You were killed by ${messageLog.deathCause}.`,
    `You fell to ${messageLog.deathCause}.`,
    `You were slain by ${messageLog.deathCause}.`,
    `You perished from ${messageLog.deathCause}.`,
    `You succumbed to ${messageLog.deathCause}.`,
    `You met your end at the hands of ${messageLog.deathCause}.`,
    `You were overwhelmed by ${messageLog.deathCause}.`,
    `You were vanquished by ${messageLog.deathCause}.`,
    `You were defeated by ${messageLog.deathCause}.`,
    `You were caught off guard by ${messageLog.deathCause}.`,
    `You were crushed by ${messageLog.deathCause}.`,
    `You were devoured by ${messageLog.deathCause}.`,
    `You were betrayed by ${messageLog.deathCause}.`,
    `You were struck down by ${messageLog.deathCause}.`,
    `You were ensnared by ${messageLog.deathCause}.`,
    `You fell victim to ${messageLog.deathCause}.`,
    `You were annihilated by ${messageLog.deathCause}.`,
    `You were caught in the trap of ${messageLog.deathCause}.`,
    `You were obliterated by ${messageLog.deathCause}.`,
    `You suffered a fatal blow from ${messageLog.deathCause}.`,
    `You were engulfed by ${messageLog.deathCause}.`,
    `You were ensconced in the grip of ${messageLog.deathCause}.`,
    `You were undone by ${messageLog.deathCause}.`,
    `You were laid low by ${messageLog.deathCause}.`,
    `You were trapped by ${messageLog.deathCause}.`,
    `You were lost to ${messageLog.deathCause}.`,
    `You fell prey to ${messageLog.deathCause}.`,
    `You were snuffed out by ${messageLog.deathCause}.`,
    `You were taken down by ${messageLog.deathCause}.`,
    `You were consumed by ${messageLog.deathCause}.`,
    `You were struck by ${messageLog.deathCause}.`,
    `You were ambushed by ${messageLog.deathCause}.`,
    `You were hunted down by ${messageLog.deathCause}.`,

];

export function randomDeathMessage() {
    return deathMessages[Math.floor(Math.random() * deathMessages.length)];
}