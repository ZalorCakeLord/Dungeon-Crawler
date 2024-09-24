import { Enemy } from './enemy.mjs';

const enemyDefinitions = [
    { name: 'Dragon', health: 100, attackPower: 20, behavior: 'aggressive', description: 'A massive beast with scales like armor and eyes that burn with ancient fire. Its roar shakes the ground.' },
    { name: 'Wily Fox', health: 25, attackPower: 8, behavior: 'evasive', description: 'A sleek, cunning fox with eyes that dart around. It seems to be waiting for an opening to strike.' },
    { name: 'Troll', health: 70, attackPower: 12, behavior: 'aggressive', description: 'A massive troll with a crooked back and gnarled fists. Its thick skin is covered in scars.' },
    { name: 'Skeleton', health: 35, attackPower: 7, behavior: 'defensive', description: 'A skeletal warrior held together by dark magic. Its bones rattle as it moves.' },
    { name: 'Vampire', health: 60, attackPower: 18, behavior: 'aggressive', description: 'A pale figure with glowing red eyes and sharp fangs. It moves with eerie grace, seeking fresh blood.' },
    { name: 'Wolf', health: 40, attackPower: 10, behavior: 'aggressive', description: 'A snarling, gray wolf with bared teeth. Its muscles tense as it prepares to lunge.' },
    { name: 'Zombie', health: 45, attackPower: 6, behavior: 'passive', description: 'A shambling corpse, its flesh decayed and its movements sluggish. It moans as it drags itself forward.' },
    { name: 'Serpent', health: 30, attackPower: 14, behavior: 'evasive', description: 'A long, sinuous snake with gleaming scales. It slithers swiftly, its eyes locking onto prey.' },
    { name: 'Dark Knight', health: 80, attackPower: 20, behavior: 'defensive', description: 'A knight in pitch-black armor, standing motionless with sword in hand. A dark aura surrounds it.' },
    { name: 'Elemental', health: 55, attackPower: 17, behavior: 'aggressive', description: 'A being of swirling air and fire, its form constantly shifting. Its roar echoes like thunder.' },
    { name: 'Griffin', health: 75, attackPower: 19, behavior: 'aggressive', description: 'A majestic beast with the head of an eagle and the body of a lion. It screeches as it spreads its wings.' },
    { name: 'Slime', health: 20, attackPower: 4, behavior: 'passive', description: 'A gelatinous creature that oozes across the floor. Its surface ripples with each movement.' },
    { name: 'Bandit', health: 50, attackPower: 12, behavior: 'aggressive', description: 'A sneaky figure with a dagger in hand. Its eyes gleam with greed, always looking for the next target.' },
    { name: 'Minotaur', health: 85, attackPower: 18, behavior: 'aggressive', description: 'A towering creature with the body of a man and the head of a bull. It snorts angrily, pawing the ground.' },
    { name: 'Banshee', health: 35, attackPower: 16, behavior: 'evasive', description: 'A ghostly woman whose shrill scream can chill your bones. She floats just above the ground, wailing.' },
    { name: 'Lich', health: 70, attackPower: 22, behavior: 'defensive', description: 'An undead sorcerer, its skeletal form wrapped in tattered robes. Dark magic pulses from its hands.' },
    { name: 'Giant Spider', health: 45, attackPower: 14, behavior: 'aggressive', description: 'A massive spider with legs the size of spears. Its fangs drip with venom as it moves silently.' },
    { name: 'Harpy', health: 40, attackPower: 15, behavior: 'evasive', description: 'A winged creature with sharp talons and a shrill voice. It swoops down from the shadows to attack.' },
    { name: 'Warlock', health: 55, attackPower: 20, behavior: 'aggressive', description: 'A cloaked figure chanting dark spells, summoning magical flames in its hands.' },
    { name: 'Wyvern', health: 90, attackPower: 25, behavior: 'aggressive', description: 'A winged serpent-like dragon with venomous fangs. Its leathery wings flap menacingly in the air.' },
    { name: 'Gargoyle', health: 65, attackPower: 12, behavior: 'defensive', description: 'A stone figure with wings, perched and watching silently. Its eyes glow faintly in the darkness.' },
    { name: 'Mimic', health: 30, attackPower: 20, behavior: 'evasive', description: 'A treasure chest with gnashing teeth and a long tongue. It waits for the unsuspecting to draw near.' },
    { name: 'Cyclops', health: 95, attackPower: 18, behavior: 'aggressive', description: 'A giant with a single eye in the middle of its forehead. Its club is raised, ready to strike.' },
    { name: 'Phantom', health: 30, attackPower: 15, behavior: 'evasive', description: 'A faint figure, barely visible in the gloom. Its presence is felt more than seen as it drifts silently.' },
    { name: 'Cursed Statue', health: 80, attackPower: 10, behavior: 'defensive', description: 'A stone statue cursed to guard this room. It stands eerily still but is ready to attack any intruder.' },
    { name: 'Basilisk', health: 70, attackPower: 22, behavior: 'aggressive', description: 'A serpent-like creature with deadly eyes that can turn any who meet its gaze to stone.' },
    { name: 'Ogre', health: 60, attackPower: 16, behavior: 'aggressive', description: 'A lumbering giant with thick, warty skin. Its fists are massive, ready to crush anything in its way.' },
    { name: 'Shadow Assassin', health: 60, attackPower: 25, behavior: 'evasive', description: 'A figure cloaked in shadow, its movements are silent and deadly. The only warning of its presence is a glint of steel.' },
    { name: 'Fire Elemental', health: 120, attackPower: 35, behavior: 'aggressive', description: 'A blazing figure of living flame, its touch sears the air itself. It moves erratically, fueled by a thirst for destruction.' },
    { name: 'Crystal Golem', health: 180, attackPower: 20, behavior: 'defensive', description: 'A towering figure made entirely of shimmering crystal. Each blow reflects light in a dazzling array of colors.' },
    { name: 'Bloodthirsty Wraith', health: 85, attackPower: 40, behavior: 'evasive', description: 'A ghostly figure with sunken eyes and skeletal fingers. It drifts across the battlefield, feeding on the life force of the living.' },
    { name: 'Ghoul', health: 70, attackPower: 15, behavior: 'aggressive', description: 'A hunched, decaying creature that lurks in dark corners. It smells of death and hunger, always searching for its next meal.' },
    { name: 'Stone Guardian', health: 150, attackPower: 22, behavior: 'defensive', description: 'A sentinel made of ancient stone, bound to protect the ruins it calls home. Its heavy limbs move slowly but with great force.' },
    { name: 'Demon Hound', health: 55, attackPower: 18, behavior: 'aggressive', description: 'A hellish beast with glowing red eyes and fangs that drip molten saliva. Its bark reverberates with infernal energy.' },
    { name: 'Frost Giant', health: 200, attackPower: 45, behavior: 'aggressive', description: 'A massive giant with skin as cold as ice, it wields a club made of frozen stone. Each swing carries a chilling wind.' },
    { name: 'Arcane Construct', health: 130, attackPower: 30, behavior: 'defensive', description: 'A magical automaton, its joints glowing with runes. It moves with a mechanical precision, defending its arcane master’s domain.' },
    { name: 'Necromancer', health: 90, attackPower: 38, behavior: 'defensive', description: 'A skeletal mage who commands the dead, raising allies from the grave to fight in its place. Its gaunt hands crackle with dark energy.' },
    { name: 'Dire Wolf', health: 80, attackPower: 20, behavior: 'aggressive', description: 'A massive wolf with a coat as black as night. Its growl sends shivers down the spine, and it attacks without hesitation.' },
    { name: 'Living Armor', health: 110, attackPower: 26, behavior: 'defensive', description: 'An empty suit of armor animated by some dark magic. Its sword swings with surprising strength for a hollow form.' },
    { name: 'Rogue Sorcerer', health: 95, attackPower: 33, behavior: 'evasive', description: 'A once great wizard, now corrupted by power. He summons spells of fire and lightning, always moving just out of reach.' },
    { name: 'Man-Eating Plant', health: 65, attackPower: 15, behavior: 'aggressive', description: 'A carnivorous plant with vines that lash out at anything near. Its petals are lined with sharp teeth and drip with venom.' },
    { name: 'Chimera', health: 150, attackPower: 50, behavior: 'aggressive', description: 'A monstrous beast with the heads of a lion, goat, and snake. It roars in unison, each head striking with lethal precision.' },
    { name: 'Spectral Knight', health: 140, attackPower: 30, behavior: 'defensive', description: 'A knight clad in ghostly armor, wielding a translucent sword. It silently defends its ancient tomb.' },
    { name: 'Hydra', health: 180, attackPower: 55, behavior: 'aggressive', description: 'A many-headed serpent that regenerates each time it is struck. Cutting off one head only leads to two more taking its place.' },
    { name: 'Djinn', health: 105, attackPower: 35, behavior: 'evasive', description: 'A spirit of the wind, capable of vanishing in a puff of smoke. It strikes swiftly with bolts of energy before disappearing again.' },
    { name: 'War Beast', health: 190, attackPower: 40, behavior: 'aggressive', description: 'A massive beast bred for battle, with armored scales and bloodstained tusks. It charges relentlessly toward its prey.' },
    { name: 'Haunted Mirror', health: 50, attackPower: 28, behavior: 'evasive', description: 'An ethereal entity trapped in a reflective surface. It casts illusions, confusing and disorienting those who face it.' },
    { name: 'Cursed Samurai', health: 120, attackPower: 45, behavior: 'defensive', description: 'An undead warrior with a katana that gleams in the moonlight. Its honor binds it to eternal battle.' },
    { name: 'Infernal Imp', health: 40, attackPower: 18, behavior: 'evasive', description: 'A mischievous demon with bat-like wings and fiery breath. It flits about the battlefield, leaving trails of smoke.' },
    { name: 'Gorgon', health: 160, attackPower: 48, behavior: 'aggressive', description: 'A serpent-haired woman whose gaze turns enemies to stone. Her hissing laughter can freeze the blood of the bravest warrior.' },
    { name: 'Bone Dragon', health: 250, attackPower: 70, behavior: 'aggressive', description: 'A skeletal dragon raised from the grave, its eyes glowing with necromantic energy. It breathes an icy, deathly fog.' },
    { name: 'Thunderbird', health: 145, attackPower: 60, behavior: 'aggressive', description: 'A gigantic bird whose wings crackle with lightning. Each beat of its wings summons a storm.' },
    { name: 'Plague Rat', health: 60, attackPower: 22, behavior: 'evasive', description: 'A diseased rodent with gnashing teeth and infectious bites. It spreads sickness wherever it roams.' },
    { name: 'Iron Colossus', health: 300, attackPower: 55, behavior: 'defensive', description: 'A gigantic iron construct, built for war. Its slow movements are matched by devastating blows.' },
    { name: 'Lava Serpent', health: 130, attackPower: 38, behavior: 'aggressive', description: 'A serpent of molten rock, leaving a trail of fire in its wake. It strikes with the heat of a forge.' },
    { name: 'Witch Queen', health: 175, attackPower: 65, behavior: 'aggressive', description: 'A malevolent ruler with mastery over dark magic. Her spells twist reality itself, making her foes tremble in fear.' },
    { name: 'Silverback Gorilla', health: 140, attackPower: 50, behavior: 'aggressive', description: 'A hulking gorilla with silver fur, it pounds its chest before attacking with bone-crushing strength.' },
    { name: 'Void Terror', health: 280, attackPower: 80, behavior: 'aggressive', description: 'A creature from the depths of the void, its form shifting between nightmares. It attacks the mind as much as the body.' }

];

export function createEnemy(name) {
    const definition = enemyDefinitions.find(enemy => enemy.name === name);
    if (definition) {
        return new Enemy(definition.name, definition.health, definition.attackPower, definition.behavior, definition.description);
    }
    return null;
}

export function getRandomEnemy() {
    const definition = enemyDefinitions[Math.floor(Math.random() * enemyDefinitions.length)];
    return new Enemy(definition.name, definition.health, definition.attackPower, definition.behavior, definition.description);
}