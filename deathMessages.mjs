import { messageLog } from './messageLog.mjs';

export const deathMessages = [
    `You were killed by {cause}.`,
    `You fell to {cause}.`,
    `You were slain by {cause}.`,
    `You perished from {cause}.`,
    `You succumbed to {cause}.`,
    `You met your end at the hands of {cause}.`,
    `You were overwhelmed by {cause}.`,
    `You were vanquished by {cause}.`,
    `You were defeated by {cause}.`,
    `You were caught off guard by {cause}.`,
    `You were crushed by {cause}.`,
    `You were devoured by {cause}.`,
    `You were betrayed by {cause}.`,
    `You were struck down by {cause}.`,
    `You were ensnared by {cause}.`,
    `You fell victim to {cause}.`,
    `You were annihilated by {cause}.`,
    `You were caught in the trap of {cause}.`,
    `You were obliterated by {cause}.`,
    `You suffered a fatal blow from {cause}.`,
    `You were engulfed by {cause}.`,
    `You were ensconced in the grip of {cause}.`,
    `You were undone by {cause}.`,
    `You were laid low by {cause}.`,
    `You were trapped by {cause}.`,
    `You were lost to {cause}.`,
    `You fell prey to {cause}.`,
    `You were snuffed out by {cause}.`,
    `You were taken down by {cause}.`,
    `You were consumed by {cause}.`,
    `You were struck by {cause}.`,
    `You were ambushed by {cause}.`,
    `You were hunted down by {cause}.`,

];

export function randomDeathMessage(cause) {
    let response = deathMessages[Math.floor(Math.random() * deathMessages.length)];
    return response.replace('{cause}', cause || messageLog.deathCause);
}