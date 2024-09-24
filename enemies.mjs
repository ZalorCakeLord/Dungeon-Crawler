import { Enemy } from './enemy.mjs';

const enemyDefinitions = [
    {
        name: 'Dragon', health: 100, attackPower: 20, behavior: 'aggressive', description: 'A massive beast with scales like armor and eyes that burn with ancient fire. Its roar shakes the ground.', attackMessages: [
            'The Dragon roars, spewing fire that deals {amount} damage!',
            'With a swift motion, the Dragon slashes its claws, inflicting {amount} damage!',
            "The Dragon's tail lashes out, striking you for {amount} damage!",
            'A stream of flame erupts from the Dragon’s maw, scorching you for {amount} damage!',
            'The ground trembles as the Dragon crashes into you, dealing {amount} damage!'
        ]
    },
    {
        name: 'Wily Fox', health: 25, attackPower: 8, behavior: 'evasive', description: 'A sleek, cunning fox with eyes that dart around. It seems to be waiting for an opening to strike.', attackMessages: [
            'The Wily Fox darts in and out, dealing {amount} damage!',
            'With a quick pounce, the Wily Fox strikes, inflicting {amount} damage!',
            'The Wily Fox circles around you, landing a hit for {amount} damage!',
            'A flash of fur and teeth, and the Wily Fox bites you for {amount} damage!',
            'The Wily Fox moves with blinding speed, dealing {amount} damage!'
        ]
    },
    {
        name: 'Troll', health: 70, attackPower: 12, behavior: 'aggressive', description: 'A massive troll with a crooked back and gnarled fists. Its thick skin is covered in scars.', attackMessages: [
            "The Troll's club crashes down, dealing {amount} damage!",
            'With a mighty swing, the Troll strikes you for {amount} damage!',
            'The Troll bellows and charges, inflicting {amount} damage!',
            'A heavy blow from the Troll lands, dealing {amount} damage!',
            "The Troll's fists slam into you, dealing {amount} damage!"
        ]
    },
    {
        name: 'Skeleton', health: 35, attackPower: 7, behavior: 'defensive', description: 'A skeletal warrior held together by dark magic. Its bones rattle as it moves.', attackMessages: [
            "The Skeleton's sword slashes, dealing {amount} damage!",
            "With a swift strike, the Skeleton hits you for {amount} damage!",
            "The Skeleton's bony fingers claw at you, inflicting {amount} damage!",
            "A bone-rattling blow from the Skeleton deals {amount} damage!",
            "The Skeleton's eyes glow with dark energy as it strikes you for {amount} damage!"
        ]
    },
    {
        name: 'Vampire', health: 60, attackPower: 18, behavior: 'aggressive', description: 'A pale figure with glowing red eyes and sharp fangs. It moves with eerie grace, seeking fresh blood.', attackMessages: [
            "The Vampire's fangs sink into your neck, dealing {amount} damage!",
            "With a swift motion, the Vampire strikes you for {amount} damage!",
            "The Vampire's claws rake across your skin, inflicting {amount} damage!",
            "A dark mist surrounds the Vampire as it deals {amount} damage!",
            "The Vampire's eyes gleam with hunger as it strikes you for {amount} damage!"
        ]
    },
    {
        name: 'Wolf', health: 40, attackPower: 10, behavior: 'aggressive', description: 'A snarling, gray wolf with bared teeth. Its muscles tense as it prepares to lunge.', attackMessages: [
            "The Wolf's jaws snap shut, dealing {amount} damage!",
            "With a quick pounce, the Wolf strikes you for {amount} damage!",
            "The Wolf circles around you, landing a hit for {amount} damage!",
            "A flash of fur and teeth, and the Wolf bites you for {amount} damage!",
            "The Wolf moves with blinding speed, dealing {amount} damage!"
        ]
    },
    {
        name: 'Zombie', health: 45, attackPower: 6, behavior: 'passive', description: 'A shambling corpse, its flesh decayed and its movements sluggish. It moans as it drags itself forward.', attackMessages: [
            "The Zombie's decaying hands claw at you, dealing {amount} damage!",
            "With a slow strike, the Zombie hits you for {amount} damage!",
            "The Zombie's jaws snap shut, inflicting {amount} damage!",
            "A putrid stench surrounds the Zombie as it deals {amount} damage!",
            "The Zombie's eyes glow with malevolent light as it strikes you for {amount} damage!"
        ]
    },
    {
        name: 'Serpent', health: 30, attackPower: 14, behavior: 'evasive', description: 'A long, sinuous snake with gleaming scales. It slithers swiftly, its eyes locking onto prey.', attackMessages: [
            "The Serpent's fangs sink into your flesh, dealing {amount} damage!",
            "With a quick strike, the Serpent hits you for {amount} damage!",
            "The Serpent's tail lashes out, inflicting {amount} damage!",
            "A venomous bite from the Serpent deals {amount} damage!",
            "The Serpent moves with blinding speed, dealing {amount} damage!"
        ]
    },
    {
        name: 'Dark Knight', health: 80, attackPower: 20, behavior: 'defensive', description: 'A knight in pitch-black armor, standing motionless with sword in hand. A dark aura surrounds it.', attackMessages: [
            "The Dark Knight's sword slashes, dealing {amount} damage!",
            "With a swift motion, the Dark Knight strikes you for {amount} damage!",
            "The Dark Knight's shield bashes you, inflicting {amount} damage!",
            "An ominous aura surrounds the Dark Knight as it deals {amount} damage!",
            "The Dark Knight's eyes gleam with malice as it strikes you for {amount} damage!"
        ]
    },
    {
        name: 'Elemental', health: 55, attackPower: 17, behavior: 'aggressive', description: 'A being of swirling air and fire, its form constantly shifting. Its roar echoes like thunder.', attackMessages: [
            'The Elemental hurls a bolt of fire, scorching you for {amount} damage!',
            'With a roar, the Elemental slams into you, causing {amount} damage!',
            'The Elemental’s swirling flames burn you, dealing {amount} damage!',
            'A surge of lightning from the Elemental shocks you for {amount} damage!',
            'The wind from the Elemental slams into you, inflicting {amount} damage!'
        ]
    },
    {
        name: 'Griffin', health: 75, attackPower: 19, behavior: 'aggressive', description: 'A majestic beast with the head of an eagle and the body of a lion. It screeches as it spreads its wings.', attackMessages: [
            'The Griffin swoops down and slashes you with its talons, dealing {amount} damage!',
            'With a deafening screech, the Griffin lunges, its beak striking you for {amount} damage!',
            'The Griffin’s powerful claws tear into you, causing {amount} damage!',
            'The wind from the Griffin’s wings knocks you down, as it bites you for {amount} damage!',
            'The Griffin dives from above, its claws ripping into your flesh for {amount} damage!'
        ]
    },
    {
        name: 'Slime',
        health: 20,
        attackPower: 4,
        behavior: 'passive',
        description: 'A gelatinous creature that oozes across the floor. Its surface ripples with each movement.',
        attackMessages: [
            'The Slime splashes you with acidic goo, dealing {amount} damage!',
            'A ripple of slime wraps around your ankle, dissolving your skin for {amount} damage!'
        ]
    },
    {
        name: 'Bandit',
        health: 50,
        attackPower: 12,
        behavior: 'aggressive',
        description: 'A sneaky figure with a dagger in hand. Its eyes gleam with greed, always looking for the next target.',
        attackMessages: [
            'The Bandit slashes at you with a dagger, causing {amount} damage!',
            'With a quick lunge, the Bandit stabs at your side, dealing {amount} damage!',
            'The Bandit throws a dagger, which cuts into you for {amount} damage!'
        ]
    },
    {
        name: 'Minotaur',
        health: 85,
        attackPower: 18,
        behavior: 'aggressive',
        description: 'A towering creature with the body of a man and the head of a bull. It snorts angrily, pawing the ground.',
        attackMessages: [
            'The Minotaur charges, its horns goring you for {amount} damage!',
            'With a mighty swing of its axe, the Minotaur hits you for {amount} damage!',
            'The Minotaur roars and smashes its fist into you, causing {amount} damage!'
        ]
    },
    {
        name: 'Banshee',
        health: 35,
        attackPower: 16,
        behavior: 'evasive',
        description: 'A ghostly woman whose shrill scream can chill your bones. She floats just above the ground, wailing.',
        attackMessages: [
            'The Banshee unleashes a bone-chilling scream, damaging your soul for {amount} damage!',
            'Her wail pierces your mind, causing {amount} damage!',
            'The Banshee’s ethereal hand passes through your chest, draining {amount} damage!'
        ]
    },
    {
        name: 'Lich',
        health: 70,
        attackPower: 22,
        behavior: 'defensive',
        description: 'An undead sorcerer, its skeletal form wrapped in tattered robes. Dark magic pulses from its hands.',
        attackMessages: [
            'The Lich hurls a bolt of dark energy at you, dealing {amount} damage!',
            'A curse from the Lich weakens your body, causing {amount} damage!',
            'With a flick of its skeletal fingers, the Lich summons shadows to attack, dealing {amount} damage!'
        ]
    },
    {
        name: 'Giant Spider',
        health: 45,
        attackPower: 14,
        behavior: 'aggressive',
        description: 'A massive spider with legs the size of spears. Its fangs drip with venom as it moves silently.',
        attackMessages: [
            'The Giant Spider sinks its venomous fangs into you, dealing {amount} damage!',
            'A web shot from the Giant Spider entangles you, leaving you vulnerable as it bites for {amount} damage!',
            'The Giant Spider’s massive leg strikes you, causing {amount} damage!'
        ]
    },
    {
        name: 'Harpy',
        health: 40,
        attackPower: 15,
        behavior: 'evasive',
        description: 'A winged creature with sharp talons and a shrill voice. It swoops down from the shadows to attack.',
        attackMessages: [
            'The Harpy screeches and dives, slashing you with its talons for {amount} damage!',
            'With a swift dive, the Harpy scratches your face for {amount} damage!',
            'The Harpy swoops low and rakes you with its claws, causing {amount} damage!'
        ]
    }
    ,
    {
        name: 'Warlock',
        health: 55,
        attackPower: 20,
        behavior: 'aggressive',
        description: 'A cloaked figure chanting dark spells, summoning magical flames in its hands.',
        attackMessages: [
            'The Warlock hurls a ball of black fire at you, scorching for {amount} damage!',
            'Dark incantations echo as the Warlock sends a wave of magic, causing {amount} damage!',
            'The Warlock chants, and a fiery explosion erupts beneath you, dealing {amount} damage!'
        ]
    },
    {
        name: 'Wyvern',
        health: 90,
        attackPower: 25,
        behavior: 'aggressive',
        description: 'A winged serpent-like dragon with venomous fangs. Its leathery wings flap menacingly in the air.',
        attackMessages: [
            'The Wyvern swoops down and sinks its venomous fangs into you, causing {amount} damage!',
            'With a powerful beat of its wings, the Wyvern knocks you off your feet, slashing for {amount} damage!',
            'The Wyvern’s tail strikes like a whip, delivering {amount} damage!'
        ]
    },
    {
        name: 'Gargoyle',
        health: 65,
        attackPower: 12,
        behavior: 'defensive',
        description: 'A stone figure with wings, perched and watching silently. Its eyes glow faintly in the darkness.',
        attackMessages: [
            'The Gargoyle leaps from its perch, smashing into you for {amount} damage!',
            'With a flap of its stone wings, the Gargoyle strikes, delivering {amount} damage!',
            'The Gargoyle hurls a chunk of stone at you, causing {amount} damage!'
        ]
    },
    {
        name: 'Mimic',
        health: 30,
        attackPower: 20,
        behavior: 'evasive',
        description: 'A treasure chest with gnashing teeth and a long tongue. It waits for the unsuspecting to draw near.',
        attackMessages: [
            'The Mimic’s teeth clamp down, biting into you for {amount} damage!',
            'Its long, sticky tongue lashes out, pulling you closer as it gnashes for {amount} damage!',
            'With a violent shake, the Mimic strikes you with its heavy chest, dealing {amount} damage!'
        ]
    },
    {
        name: 'Cyclops',
        health: 95,
        attackPower: 18,
        behavior: 'aggressive',
        description: 'A giant with a single eye in the middle of its forehead. Its club is raised, ready to strike.',
        attackMessages: [
            'The Cyclops swings its massive club down, crushing you for {amount} damage!',
            'With a mighty roar, the Cyclops charges, slamming into you for {amount} damage!',
            'The Cyclops grabs a boulder and hurls it at you, dealing {amount} damage!'
        ]
    },
    {
        name: 'Phantom',
        health: 30,
        attackPower: 15,
        behavior: 'evasive',
        description: 'A faint figure, barely visible in the gloom. Its presence is felt more than seen as it drifts silently.',
        attackMessages: [
            'The Phantom passes through you, sapping your life force for {amount} damage!',
            'A cold wind follows the Phantom’s touch, chilling your soul for {amount} damage!',
            'The Phantom’s shadowy form envelops you, draining {amount} damage!'
        ]
    },
    {
        name: 'Cursed Statue',
        health: 80,
        attackPower: 10,
        behavior: 'defensive',
        description: 'A stone statue cursed to guard this room. It stands eerily still but is ready to attack any intruder.',
        attackMessages: [
            'The Cursed Statue’s stone arm crashes down, smashing you for {amount} damage!',
            'With a slow but heavy punch, the Cursed Statue strikes you for {amount} damage!',
            'A magical energy pulse from the Cursed Statue deals {amount} damage!'
        ]
    },
    {
        name: 'Basilisk',
        health: 70,
        attackPower: 22,
        behavior: 'aggressive',
        description: 'A serpent-like creature with deadly eyes that can turn any who meet its gaze to stone.',
        attackMessages: [
            "The Basilisk's venomous bite pierces your flesh, causing {amount} damage!",
            'The Basilisk coils around you, squeezing for {amount} damage!',
            'Its deadly gaze briefly meets yours, and pain shoots through you for {amount} damage!'
        ]
    },
    {
        name: 'Ogre',
        health: 60,
        attackPower: 16,
        behavior: 'aggressive',
        description: 'A lumbering giant with thick, warty skin. Its fists are massive, ready to crush anything in its way.',
        attackMessages: [
            'The Ogre slams its massive fist into you, crushing for {amount} damage!',
            'With a roar, the Ogre swings a heavy club, smashing into you for {amount} damage!',
            'The ground shakes as the Ogre stomps, dealing {amount} damage!'
        ]
    },
    {
        name: 'Shadow Assassin',
        health: 60,
        attackPower: 25,
        behavior: 'evasive',
        description: 'A figure cloaked in shadow, its movements are silent and deadly. The only warning of its presence is a glint of steel.',
        attackMessages: [
            'A flash of steel cuts through the air as the Shadow Assassin strikes, dealing {amount} damage!',
            'From the shadows, the assassin slashes, leaving you with {amount} damage!',
            'A quick and deadly strike from behind leaves you reeling for {amount} damage!'
        ]
    },
    {
        name: 'Fire Elemental',
        health: 120,
        attackPower: 35,
        behavior: 'aggressive',
        description: 'A blazing figure of living flame, its touch sears the air itself. It moves erratically, fueled by a thirst for destruction.',
        attackMessages: [
            'The Fire Elemental engulfs you in flames, burning for {amount} damage!',
            'With a burst of heat, the Fire Elemental sears your skin, causing {amount} damage!',
            "Flames lick at you as the Fire Elemental's fiery form closes in, burning for {amount} damage!"
        ]
    },
    {
        name: 'Crystal Golem',
        health: 180,
        attackPower: 20,
        behavior: 'defensive',
        description: 'A towering figure made entirely of shimmering crystal. Each blow reflects light in a dazzling array of colors.',
        attackMessages: [
            "The Crystal Golem's heavy fist strikes with crushing force, dealing {amount} damage!",
            'A shining arm smashes into you as the Crystal Golem moves, causing {amount} damage!',
            'The Crystal Golem swings its gleaming body, delivering {amount} damage!'
        ]
    },
    {
        name: 'Bloodthirsty Wraith',
        health: 85,
        attackPower: 40,
        behavior: 'evasive',
        description: 'A ghostly figure with sunken eyes and skeletal fingers. It drifts across the battlefield, feeding on the life force of the living.',
        attackMessages: [
            "The Wraith's cold touch drains your life force, causing {amount} damage!",
            'The Wraith hovers close, sapping your vitality for {amount} damage!',
            'You feel your life force ebbing as the Wraith feeds, dealing {amount} damage!'
        ]
    },
    {
        name: 'Ghoul',
        health: 70,
        attackPower: 15,
        behavior: 'aggressive',
        description: 'A hunched, decaying creature that lurks in dark corners. It smells of death and hunger, always searching for its next meal.',
        attackMessages: [
            'The Ghoul bites into your flesh, tearing for {amount} damage!',
            'The Ghoul claws at you savagely, dealing {amount} damage!',
            'The stench of decay fills the air as the Ghoul attacks, causing {amount} damage!'
        ]
    },
    {
        name: 'Stone Guardian',
        health: 150,
        attackPower: 22,
        behavior: 'defensive',
        description: 'A sentinel made of ancient stone, bound to protect the ruins it calls home. Its heavy limbs move slowly but with great force.',
        attackMessages: [
            'The Stone Guardian swings a heavy arm, smashing you for {amount} damage!',
            'With a slow but powerful blow, the Stone Guardian strikes for {amount} damage!',
            "The Guardian's stone fist crushes into you, dealing {amount} damage!"
        ]
    },
    {
        name: 'Demon Hound',
        health: 55,
        attackPower: 18,
        behavior: 'aggressive',
        description: 'A hellish beast with glowing red eyes and fangs that drip molten saliva. Its bark reverberates with infernal energy.',
        attackMessages: [
            'The Demon Hound bites down with fiery fangs, dealing {amount} damage!',
            'With a snarl, the Demon Hound tears into your flesh for {amount} damage!',
            "The Demon Hound's molten saliva burns your skin, causing {amount} damage!"
        ]
    },
    {
        name: 'Frost Giant',
        health: 200,
        attackPower: 45,
        behavior: 'aggressive',
        description: 'A massive giant with skin as cold as ice, it wields a club made of frozen stone. Each swing carries a chilling wind.',
        attackMessages: [
            "The Frost Giant's club crashes into you with freezing force, causing {amount} damage!",
            'A chilling wind follows as the Frost Giant smashes its weapon down, dealing {amount} damage!',
            "The Frost Giant's icy touch freezes you, inflicting {amount} damage!"
        ]
    },
    {
        name: 'Arcane Construct',
        health: 130,
        attackPower: 30,
        behavior: 'defensive',
        description: 'A magical automaton, its joints glowing with runes. It moves with a mechanical precision, defending its arcane master’s domain.',
        attackMessages: [
            'The Arcane Construct releases a burst of magical energy, dealing {amount} damage!',
            'A rune-covered arm swings mechanically, striking you for {amount} damage!',
            "The Arcane Construct's body pulses with power as it strikes, causing {amount} damage!"
        ]
    },
    {
        name: 'Necromancer',
        health: 90,
        attackPower: 38,
        behavior: 'defensive',
        description: 'A skeletal mage who commands the dead, raising allies from the grave to fight in its place. Its gaunt hands crackle with dark energy.',
        attackMessages: [
            "The Necromancer's dark magic strikes you with a wave of necrotic energy, causing {amount} damage!",
            'Skeletal hands rise from the ground, clawing at you for {amount} damage!',
            'The Necromancer sends a blast of black energy, dealing {amount} damage!'
        ]
    },
    {
        name: 'Dire Wolf',
        health: 80,
        attackPower: 20,
        behavior: 'aggressive',
        description: 'A massive wolf with a coat as black as night. Its growl sends shivers down the spine, and it attacks without hesitation.',
        attackMessages: [
            'The Dire Wolf pounces, sinking its teeth into you for {amount} damage!',
            'With a snarl, the Dire Wolf claws at you, dealing {amount} damage!',
            "The Dire Wolf's powerful bite tears through your defenses, causing {amount} damage!"
        ]
    },
    {
        name: 'Living Armor',
        health: 110,
        attackPower: 26,
        behavior: 'defensive',
        description: 'An empty suit of armor animated by some dark magic. Its sword swings with surprising strength for a hollow form.',
        attackMessages: [
            'The Living Armor swings its sword, striking you for {amount} damage!',
            'An iron gauntlet punches forward, dealing {amount} damage!',
            'With a hollow clang, the Living Armor slams into you for {amount} damage!'
        ]
    },
    {
        name: 'Rogue Sorcerer',
        health: 95,
        attackPower: 33,
        behavior: 'evasive',
        description: 'A once great wizard, now corrupted by power. He summons spells of fire and lightning, always moving just out of reach.',
        attackMessages: [
            'The Rogue Sorcerer hurls a fireball at you, causing {amount} damage!',
            'Lightning crackles as the Sorcerer summons a bolt, dealing {amount} damage!',
            'With a flick of his wrist, the Sorcerer sends a blast of arcane energy, causing {amount} damage!'
        ]
    },
    {
        name: 'Man-Eating Plant',
        health: 65,
        attackPower: 15,
        behavior: 'aggressive',
        description: 'A carnivorous plant with vines that lash out at anything near. Its petals are lined with sharp teeth and drip with venom.',
        attackMessages: [
            'A vine lashes out, whipping you for {amount} damage!',
            'The Plant snaps its tooth-lined petals, biting down for {amount} damage!',
            "Venom drips from the Plant's fangs as it strikes, causing {amount} damage!"
        ]
    },
    {
        name: 'Chimera',
        health: 150,
        attackPower: 50,
        behavior: 'aggressive',
        description: 'A monstrous beast with the heads of a lion, goat, and snake. It roars in unison, each head striking with lethal precision.',
        attackMessages: [
            "The Chimera's lion head roars and bites, dealing {amount} damage!",
            "The Chimera's snake head strikes with deadly venom, causing {amount} damage!",
            "The Chimera's goat head rams into you, delivering {amount} damage!"
        ]
    },
    { name: 'Spectral Knight', health: 140, attackPower: 30, behavior: 'defensive', description: 'A knight clad in ghostly armor, wielding a translucent sword. It silently defends its ancient tomb.', attackMessages: ['The knight swings its sword with ghostly precision, dealing {amount} damage.', 'A spectral slash slices through the air towards you, causing {amount} damage.'] },
    { name: 'Hydra', health: 180, attackPower: 55, behavior: 'aggressive', description: 'A many-headed serpent that regenerates each time it is struck. Cutting off one head only leads to two more taking its place.', attackMessages: ['The hydra lashes out with multiple heads, snapping ferociously, inflicting {amount} damage.', 'A head strikes, followed by a second just as fierce, dealing {amount} damage.'] },
    { name: 'Djinn', health: 105, attackPower: 35, behavior: 'evasive', description: 'A spirit of the wind, capable of vanishing in a puff of smoke. It strikes swiftly with bolts of energy before disappearing again.', attackMessages: ['The djinn materializes, launching a bolt of energy at you, causing {amount} damage.', 'With a flourish, it vanishes and reappears to strike again, dealing {amount} damage.'] },
    { name: 'War Beast', health: 190, attackPower: 40, behavior: 'aggressive', description: 'A massive beast bred for battle, with armored scales and bloodstained tusks. It charges relentlessly toward its prey.', attackMessages: ['The war beast charges forward, tusks gleaming, dealing {amount} damage.', 'It rams into you with the force of a freight train, inflicting {amount} damage.'] },
    { name: 'Haunted Mirror', health: 50, attackPower: 28, behavior: 'evasive', description: 'An ethereal entity trapped in a reflective surface. It casts illusions, confusing and disorienting those who face it.', attackMessages: ['The mirror shimmers, distorting reality around you, causing {amount} damage.', 'You see yourself reflected, but the image is warped and mocking, inflicting {amount} damage.'] },
    { name: 'Cursed Samurai', health: 120, attackPower: 45, behavior: 'defensive', description: 'An undead warrior with a katana that gleams in the moonlight. Its honor binds it to eternal battle.', attackMessages: ['The samurai draws its katana, ready to defend its honor, dealing {amount} damage.', 'It strikes with unmatched precision, a blur in the moonlight, causing {amount} damage.'] },
    { name: 'Infernal Imp', health: 40, attackPower: 18, behavior: 'evasive', description: 'A mischievous demon with bat-like wings and fiery breath. It flits about the battlefield, leaving trails of smoke.', attackMessages: ['The imp darts around, breathing fire in your direction, inflicting {amount} damage.', 'With a laugh, it swoops down, claws extended, dealing {amount} damage.'] },
    { name: 'Gorgon', health: 160, attackPower: 48, behavior: 'aggressive', description: 'A serpent-haired woman whose gaze turns enemies to stone. Her hissing laughter can freeze the blood of the bravest warrior.', attackMessages: ['The gorgon locks eyes with you, her gaze freezing and dealing {amount} damage.', 'Her laughter echoes as she strikes with her serpentine hair, inflicting {amount} damage.'] },
    { name: 'Bone Dragon', health: 250, attackPower: 70, behavior: 'aggressive', description: 'A skeletal dragon raised from the grave, its eyes glowing with necromantic energy. It breathes an icy, deathly fog.', attackMessages: ['The bone dragon lets out a chilling roar before striking, dealing {amount} damage.', 'It breathes a cloud of necrotic fog that saps your strength, causing {amount} damage.'] },
    { name: 'Thunderbird', health: 145, attackPower: 60, behavior: 'aggressive', description: 'A gigantic bird whose wings crackle with lightning. Each beat of its wings summons a storm.', attackMessages: ['The thunderbird swoops down, lightning dancing on its wings, dealing {amount} damage.', 'A thunderous clap accompanies its talons as they dive toward you, inflicting {amount} damage.'] },
    { name: 'Plague Rat', health: 60, attackPower: 22, behavior: 'evasive', description: 'A diseased rodent with gnashing teeth and infectious bites. It spreads sickness wherever it roams.', attackMessages: ['The plague rat lunges, teeth bared and infectious, causing {amount} damage.', 'With a squeal, it darts in and out, spreading disease and inflicting {amount} damage.'] },
    { name: 'Iron Colossus', health: 300, attackPower: 55, behavior: 'defensive', description: 'A gigantic iron construct, built for war. Its slow movements are matched by devastating blows.', attackMessages: ['The colossus raises its arm to strike with unyielding force, dealing {amount} damage.', 'With a heavy thud, it crashes down upon you, inflicting {amount} damage.'] },
    { name: 'Lava Serpent', health: 130, attackPower: 38, behavior: 'aggressive', description: 'A serpent of molten rock, leaving a trail of fire in its wake. It strikes with the heat of a forge.', attackMessages: ['The lava serpent lashes out, fire trailing behind, causing {amount} damage.', 'It lunges forward, molten rock dripping from its fangs, inflicting {amount} damage.'] },
    { name: 'Witch Queen', health: 175, attackPower: 65, behavior: 'aggressive', description: 'A malevolent ruler with mastery over dark magic. Her spells twist reality itself, making her foes tremble in fear.', attackMessages: ['The Witch Queen raises her hands, dark energy swirling, dealing {amount} damage.', 'With a sinister laugh, she unleashes a spell that strikes you for {amount} damage.'] },
    { name: 'Silverback Gorilla', health: 140, attackPower: 50, behavior: 'aggressive', description: 'A hulking gorilla with silver fur, it pounds its chest before attacking with bone-crushing strength.', attackMessages: ['The silverback pounds its chest and charges, inflicting {amount} damage.', 'It swings its massive fists, dealing {amount} damage with each strike.'] },
    { name: 'Void Terror', health: 280, attackPower: 80, behavior: 'aggressive', description: 'A creature from the depths of the void, its form shifting between nightmares. It attacks the mind as much as the body.', attackMessages: ['The void terror lashes out, causing you to question reality itself, dealing {amount} damage.', 'It attacks with a wave of despair, inflicting {amount} damage to your very essence.'] }

];

export function createEnemy(name) {
    const definition = enemyDefinitions.find(enemy => enemy.name === name);
    if (definition) {
        return new Enemy(
            definition.name,
            definition.health,
            definition.attackPower,
            definition.behavior,
            definition.description,
            definition.attackMessages // Pass attackMessages here
        );
    }
    return null;
}

export function getRandomEnemy() {
    const definition = enemyDefinitions[Math.floor(Math.random() * enemyDefinitions.length)];
    return new Enemy(definition.name, definition.health, definition.attackPower, definition.behavior, definition.description, definition.attackMessages);
}