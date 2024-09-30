import { messageLog } from './messageLog.mjs';

export const deathMessages = [
    `{name} met a gruesome fate at the hands of {cause}.`,
    `{name} fell victim to the ruthless grasp of {cause}.`,
    `{name} was mercilessly slain by {cause}.`,
    `{name} perished in the shadow of {cause}.`,
    `{name} succumbed to the inevitable doom wrought by {cause}.`,
    `{name} faced their end, forever marked by {cause}.`,
    `{name} was overwhelmed by the insatiable {cause}.`,
    `{name} was vanquished, a mere footnote in the saga of {cause}.`,
    `{name} was defeated by the relentless might of {cause}.`,
    `{name} found themselves caught off guard by the cunning {cause}.`,
    `{name} was crushed beneath the weight of {cause}.`,
    `{name} was devoured, lost within the maw of {cause}.`,
    `{name} was betrayed, falling prey to the treachery of {cause}.`,
    `{name} was struck down in a moment of despair by {cause}.`,
    `{name} was ensnared by the web of {cause}.`,
    `{name} fell prey to the sinister designs of {cause}.`,
    `{name} was annihilated, an echo lost to the void of {cause}.`,
    `{name} found themselves caught in the deadly trap of {cause}.`,
    `{name} was obliterated, reduced to mere ashes by {cause}.`,
    `{name} suffered a fatal blow, a tragic end brought by {cause}.`,
    `{name} was engulfed, consumed by the darkness of {cause}.`,
    `{name} was ensconced in the chilling grip of {cause}.`,
    `{name} was undone, the final act played by {cause}.`,
    `{name} was laid low, a tragic tale etched by {cause}.`,
    `{name} was trapped, ensnared by the relentless hunt of {cause}.`,
    `{name} was lost to the shadows cast by {cause}.`,
    `{name} fell prey to the deadly allure of {cause}.`,
    `{name} was snuffed out, extinguished by the hand of {cause}.`,
    `{name} was taken down, a casualty of the fierce {cause}.`,
    `{name} was consumed, a meal for the ravenous {cause}.`,
    `{name} was struck by the merciless hand of {cause}.`,
    `{name} was ambushed, caught unawares by the lurking {cause}.`,
    `{name} was hunted down, a mere game for the relentless {cause}.`,
];


export function randomDeathMessage(cause,name) {
    let response = deathMessages[Math.floor(Math.random() * deathMessages.length)];
    let causeFiltered = response.replace('{cause}', cause || "Dungeon Collapse");
    return causeFiltered.replace('{name}', name || messageLog.playerName);
}