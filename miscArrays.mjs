// Purpose: Contains arrays of synonyms for various actions in the game.
const attackSynonyms = ["Strike","Hit","Attack","Assault","Assail","Batter","Beat","Beset","Blast","Blitz","Bust","Charge","Clout","Clobber","Combat","Confront","Crush","Duff","Encounter","Flog","Knock","Pound","Pummel","Raid","Rush","Sail","Savage","Slog","Smash","Sting","Thump","Wallop","Whack"];

const quitMessages = [
    `Player $name has slipped away from the dungeon, leaving only silence in their wake...`,
    `Player $name has vanished into the shadows, as if the darkness called them home...`,
    `Player $name has abandoned the dungeon, perhaps fearing what lurks in the depths...`,
    `Player $name has departed the dungeon, their echo fading into the gloom...`,
    `Player $name has turned their back on the labyrinth, as whispers of lost souls surround them...`,
    `Player $name has exited the dungeon, leaving behind a lingering chill in the air...`,
    `Player $name has retreated from the dungeon, swallowed by the abyss beyond...`,
    `Player $name has fled the dungeon, the very walls seem to mourn their departure...`,
    `Player $name has chosen to leave the dungeon, as if aware of a hidden fate...`,
    `Player $name has left the dungeon, but the shadows remain restless...`,
    `Player $name has left the dungeon on their own terms...`
];

const interactionResponses = [
    "You reach out to the $contentName, but it remains unresponsive.",
    "You poke the $contentName. It just sits there, indifferent.",
    "You give the $contentName a gentle nudge. Nothing happens.",
    "You tap the $contentName lightly, but it shows no sign of life.",
    "You try to engage with the $contentName, yet it remains silent.",
    "You attempt to speak to the $contentName, but it doesn't respond.",
    "You push against the $contentName, but it stands firm.",
    "You examine the $contentName closely, but it offers no clues.",
    "You prod the $contentName. It seems to mock your efforts.",
    "You whisper to the $contentName, but your words fall flat.",
    "You try to pull the $contentName, but it refuses to budge.",
    "You shake the $contentName, but it doesn't seem to notice.",
    "You gesture towards the $contentName. It remains still.",
    "You give the $contentName a hopeful look, but it offers no response.",
    "You attempt to interact with the $contentName, but it's as if it doesn't exist."
];


function randomQuitMessage(name){
    return quitMessages[Math.floor(Math.random() * quitMessages.length)].replace('$name', name);
}

function randomInteractionResponse(contentName){
    return interactionResponses[Math.floor(Math.random() * interactionResponses.length)].replace('$contentName', contentName);
}

export { attackSynonyms, randomQuitMessage, randomInteractionResponse };