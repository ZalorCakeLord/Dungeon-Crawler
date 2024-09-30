import { messageLog } from './messageLog.mjs';

export async function intro(name, gender, species) {
    messageLog.playerName = name; // Set the name in message
    messageLog.playerGender = gender;
    messageLog.playerSpecies = species;
    
    const messages = [];

    // Opening narrative, similar to the old intro
    messages.push(`<p style="color: blue; text-align: center; font-weight: bold;">Welcome to Dungeon Crawler!<p>`);
    messages.push("You awaken, disoriented and afraid, a mere pawn in the clutches of the mad wizard Zalor, ensnared within the twisted depths of his dark dungeon.");
    messages.push("This is no ordinary prison; it is a labyrinth of horrors crafted and stolen by that insane mage, where every shadow conceals a lurking threat.");
    messages.push("Forced into this nightmarish abyss, you must fight your way through countless rooms, each more treacherous than the last, in search of a way out.");
    messages.push("Prepare yourself, for every step forward brings you closer to sinister enemies and unimaginable dangers.");
    messages.push("Your fate, perhaps your very soul, hangs in the balance. Good luck! Type 'help' for a list of commands.");
    messages.push("Press any key to begin your desperate quest for freedom...");

    // Simulate waiting for user to "press any key"
    await wait(2); // You can adjust this to simulate pressing a key

    // Character creation narrative
    messages.push("You are dreaming...");
    messages.push("Before you can take another step, you catch a glimpse of yourself in a cracked, dark mirror. But who are you really?");
    messages.push(`You are ${name}, a ${gender=="M"?"male":"female"} ${species}.`);

    // Add species-specific response
    const raceResponses = {
        "Human": "Ah, a Human. Known for your resilience and adaptability, but will that be enough to survive Zalor's dungeon?",
        "Elf": "An Elf? Your sharp senses and long life have served you well, but in this place, even the keenest eyes can be deceived.",
        "Elven": "An Elf? Your sharp senses and long life have served you well, but in this place, even the keenest eyes can be deceived.",
        "Dwarf": "A Dwarf, sturdy and strong. The dark corridors may remind you of your ancestral halls, but don't get too comfortable here.",
        "Orc": "An Orc. Fierce and unrelenting. The dungeon's twisted creatures may have met their match... or perhaps not.",
        "Halfling": "A Halfling! Small, yes, but with a courage that belies your stature. Be swift, and you may just slip through the cracks of danger.",
        "Gnome": "Ah, a clever Gnome. Your mind may be your greatest weapon here, but even intellect has its limits in these cursed halls.",
        "Tiefling": "A Tiefling, touched by infernal heritage. Will the darkness here embrace you as kin, or seek to snuff out your flame?",
        "Dragonborn": "A Dragonborn. The blood of dragons courses through your veins, but even a dragon's fire may falter in this cold abyss.",
        "Aasimar": "An Aasimar, touched by the divine. Light may follow you, but in Zalor's dungeon, shadows stretch long and deep.",
        "Half-Orc": "A Half-Orc, torn between two worlds. Your savage strength may carry you far, but brute force is not all you'll need here.",
        "Dark Elf": "A Dark Elf, born of the shadows. These halls may seem familiar, but even you may find the darkness... overwhelming.",
        "Goblin": "A Goblin? Crafty and sly. If anyone can sneak their way past danger, it's you. But can you avoid what you can't see?",
        "Lizardfolk": "A Lizardfolk. Cold-blooded and calculating. These damp and twisting halls might feel like home, but don’t let your guard down.",
        "Tabaxi": "A Tabaxi, swift and agile. The dungeon will test your reflexes, but speed alone won’t save you from everything that lurks within.",
        "Warforged": "A Warforged, a being of steel and magic. You are built for battle, but even machines can break in the face of this dungeon's horrors.",
        "Half-Elf": "A Half-Elf, torn between two worlds. You walk the line between grace and grit, but in this dungeon, you’ll need both to survive.",
        "HalfElf": "A Half-Elf, torn between two worlds. You walk the line between grace and grit, but in this dungeon, you’ll need both to survive.",
        "Half Elf": "A Half-Elf, torn between two worlds. You walk the line between grace and grit, but in this dungeon, you’ll need both to survive.",
        "Vampire": "A Vampire? The dungeon's darkness might be your ally, but beware—it also hides things far older and deadlier than you.",
        "Cyborg": "A Cyborg, half-machine and half-organic. Your tech may give you an edge, but can it outsmart ancient magic?",
        "Android": "An Android. Logic and programming will guide you, but this dungeon defies even the most advanced calculations.",
        "Alien": "An Alien, a stranger even among these strange halls. Your knowledge of otherworldly sciences will be put to the ultimate test here.",
        "Shapeshifter": "A Shapeshifter, fluid and adaptable. But will your many forms be enough to escape this ever-shifting labyrinth?",
        "Undead": "Undead, walking the line between life and death. This dungeon will not hesitate to drag you fully into its dark embrace.",
        "Demigod": "A Demigod? Even the blood of the gods may falter within Zalor’s labyrinth. Power alone won’t protect you here.",
        "Fairy": "A Fairy? Small and quick, but be wary. The dungeon's magic is wild and dangerous, even for a creature like you.",
        "Troll": "A Troll. Tough as stone and just as stubborn, but there are things down here that even your skin won’t protect you from.",
        "Centaur": "A Centaur, swift and strong. But even the most gallant can find themselves lost in this maze of madness."
    };

    species = species.charAt(0).toUpperCase() + species.slice(1).toLowerCase(); // Standardize input
    console.log(species)
    // Display race-specific response or fallback
    if (raceResponses[species]) {
        messages.push(raceResponses[species]);
    } else {
        messages.push('Something new? How exciting! But be warned, the dungeon cares not for novelty. It will test you all the same.');
    }

    // Conclude the intro
    messages.push("Prepare yourself, adventurer. The dungeon awaits...");
    messages.push(`<button id="start">Click Here</button>`)
    return { name, gender, species, messages };
}

// Function to simulate a pause (pressing a key or waiting a few seconds)
export function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
