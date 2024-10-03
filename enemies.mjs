import { deathMessages } from './deathMessages.mjs';
import { Enemy, Boss } from './enemy.mjs';

const enemyDefinitionsRaw = [
    {
        name: 'Dragon', health: 100, attackPower: 20, behavior: 'aggressive', description: 'A massive beast with scales like armor and eyes that burn with ancient fire. Its roar shakes the ground.', attackMessages: [
            'The Dragon roars, spewing fire that deals {amount} damage!',
            'With a swift motion, the Dragon slashes its claws, inflicting {amount} damage!',
            "The Dragon's tail lashes out, striking you for {amount} damage!",
            'A stream of flame erupts from the Dragon’s maw, scorching you for {amount} damage!',
            'The ground trembles as the Dragon crashes into you, dealing {amount} damage!'
        ],
        deathMessages: [
            'The Dragon lets out a final roar as it falls to the ground, defeated.',
            'With a mighty crash, the Dragon collapses, its fire extinguished.',
            'The great beast falls, its scales dulled and lifeless.',
            'A thunderous silence follows as the Dragon takes its last breath.',
            'The Dragon crumples, its ancient eyes dimming as it succumbs.'
        ],
        speed: 0.25
    },
    {
        name: 'Wily Fox', health: 25, attackPower: 8, behavior: 'evasive', description: 'A sleek, cunning fox with eyes that dart around. It seems to be waiting for an opening to strike.', attackMessages: [
            'The Wily Fox darts in and out, dealing {amount} damage!',
            'With a quick pounce, the Wily Fox strikes, inflicting {amount} damage!',
            'The Wily Fox circles around you, landing a hit for {amount} damage!',
            'A flash of fur and teeth, and the Wily Fox bites you for {amount} damage!',
            'The Wily Fox moves with blinding speed, dealing {amount} damage!'
        ],
        deathMessages: [
            'The Wily Fox collapses, its cunning gaze fading into the shadows.',
            'With a final yelp, the Wily Fox falls, defeated by your hand.',
            'The sly creature lies still, its mischievous spirit extinguished.',
            'The cunning fox’s last breath escapes as it succumbs to its wounds.',
            'The Wily Fox’s body goes limp, its cleverness lost forever.'
        ],
        speed: 0.75
    },
    {
        name: 'Troll', health: 70, attackPower: 12, behavior: 'aggressive', description: 'A massive troll with a crooked back and gnarled fists. Its thick skin is covered in scars.', attackMessages: [
            "The Troll's club crashes down, dealing {amount} damage!",
            'With a mighty swing, the Troll strikes you for {amount} damage!',
            'The Troll bellows and charges, inflicting {amount} damage!',
            'A heavy blow from the Troll lands, dealing {amount} damage!',
            "The Troll's fists slam into you, dealing {amount} damage!"
        ],
        deathMessages: [
            'The Troll lets out a final roar, crashing to the ground with a heavy thud.',
            'With a last desperate swing, the Troll falls, its might extinguished.',
            'The massive creature crumples, its gnarled fists falling still.',
            'The ground shakes as the Troll collapses, its power finally broken.',
            'The Troll’s breath slows, and it slumps to the ground, defeated.'
        ],
        speed: 0.5
    },
    {
        name: 'Skeleton', health: 35, attackPower: 7, behavior: 'defensive', description: 'A skeletal warrior held together by dark magic. Its bones rattle as it moves.', attackMessages: [
            "The Skeleton's sword slashes, dealing {amount} damage!",
            "With a swift strike, the Skeleton hits you for {amount} damage!",
            "The Skeleton's bony fingers claw at you, inflicting {amount} damage!",
            "A bone-rattling blow from the Skeleton deals {amount} damage!",
            "The Skeleton's eyes glow with dark energy as it strikes you for {amount} damage!"
        ],
        deathMessages: [
            'The Skeleton falls apart, its bones scattering across the ground.',
            'With a final clatter, the Skeleton crumbles into a heap of bones.',
            'The dark magic fades, leaving only scattered bones behind.',
            'The rattle of bones goes silent as the Skeleton succumbs to defeat.',
            'The skeletal warrior collapses, its enchanted form returning to dust.'
        ],
        speed: 0.6
    },
    {
        name: 'Vampire', health: 60, attackPower: 18, behavior: 'aggressive', description: 'A pale figure with glowing red eyes and sharp fangs. It moves with eerie grace, seeking fresh blood.', attackMessages: [
            "The Vampire's fangs sink into your neck, dealing {amount} damage!",
            "With a swift motion, the Vampire strikes you for {amount} damage!",
            "The Vampire's claws rake across your skin, inflicting {amount} damage!",
            "A dark mist surrounds the Vampire as it deals {amount} damage!",
            "The Vampire's eyes gleam with hunger as it strikes you for {amount} damage!"
        ],
        deathMessages: [
            'The Vampire lets out a final hiss, collapsing into a heap of shadows.',
            'With a final gasp, the Vampire disintegrates into a cloud of dust.',
            'The allure of the night fades as the Vampire falls to the ground.',
            'The once-mighty creature crumbles, its power extinguished.',
            'The pale figure lies still, its hunger for blood forever silenced.'
        ],
        speed: 0.4
    },
    {
        name: 'Wolf', health: 40, attackPower: 10, behavior: 'aggressive', description: 'A snarling, gray wolf with bared teeth. Its muscles tense as it prepares to lunge.', attackMessages: [
            "The Wolf's jaws snap shut, dealing {amount} damage!",
            "With a quick pounce, the Wolf strikes you for {amount} damage!",
            "The Wolf circles around you, landing a hit for {amount} damage!",
            "A flash of fur and teeth, and the Wolf bites you for {amount} damage!",
            "The Wolf moves with blinding speed, dealing {amount} damage!"
        ],
        deathMessages: [
            'The Wolf lets out a final growl, collapsing in defeat.',
            'With a last desperate lunge, the Wolf falls, its spirit extinguished.',
            'The fierce creature slumps to the ground, its eyes dimming.',
            'The howl of the Wolf fades into silence as it succumbs.',
            'The gray wolf lies still, its fierce heart stilled forever.'
        ],
        speed: 0.7
    },
    {
        name: 'Zombie', health: 45, attackPower: 6, behavior: 'passive', description: 'A shambling corpse, its flesh decayed and its movements sluggish. It moans as it drags itself forward.', attackMessages: [
            "The Zombie's decaying hands claw at you, dealing {amount} damage!",
            "With a slow strike, the Zombie hits you for {amount} damage!",
            "The Zombie's jaws snap shut, inflicting {amount} damage!",
            "A putrid stench surrounds the Zombie as it deals {amount} damage!",
            "The Zombie's eyes glow with malevolent light as it strikes you for {amount} damage!"
        ],
        deathMessages: [
            'The Zombie crumbles into a heap of decayed flesh and bones.',
            'With a final moan, the Zombie collapses, its curse lifted.',
            'The shambling creature goes still, its unholy life extinguished.',
            'The decay fades as the Zombie falls, a putrid silence left behind.',
            'The undead horror lies motionless, its hunger finally sated.'
        ],
        speed: 0.1
    },
    {
        name: 'Serpent', health: 30, attackPower: 14, behavior: 'evasive', description: 'A long, sinuous snake with gleaming scales. It slithers swiftly, its eyes locking onto prey.', attackMessages: [
            "The Serpent's fangs sink into your flesh, dealing {amount} damage!",
            "With a quick strike, the Serpent hits you for {amount} damage!",
            "The Serpent's tail lashes out, inflicting {amount} damage!",
            "A venomous bite from the Serpent deals {amount} damage!",
            "The Serpent moves with blinding speed, dealing {amount} damage!"
        ],
        deathMessages: [
            'The Serpent coils up one last time before falling lifeless.',
            'With a final hiss, the Serpent drops to the ground, defeated.',
            'The gleaming scales dull as the Serpent succumbs to its wounds.',
            'The agile creature lies still, its life force slipping away.',
            'The Serpent’s eyes dim, and it collapses in a lifeless heap.'
        ],
        speed: 0.8
    },
    {
        name: 'Dark Knight', health: 80, attackPower: 20, behavior: 'defensive', description: 'A knight in pitch-black armor, standing motionless with sword in hand. A dark aura surrounds it.', attackMessages: [
            "The Dark Knight's sword slashes, dealing {amount} damage!",
            "With a swift motion, the Dark Knight strikes you for {amount} damage!",
            "The Dark Knight's shield blocks your attack and counters for {amount} damage!",
            "A powerful blow from the Dark Knight lands, dealing {amount} damage!",
            "The Dark Knight's eyes glow with dark energy as it strikes you for {amount} damage!"
        ],
        deathMessages: [
            'The Dark Knight lets out a final cry as it collapses, its armor clattering.',
            'With a last desperate swing, the Dark Knight falls, its power extinguished.',
            'The knight crumples, its dark aura dissipating into the air.',
            'The ground shakes as the Dark Knight falls, its might finally broken.',
            'The Dark Knight’s breath slows, and it slumps to the ground, defeated.'
        ],
        speed: 0.5
    },
    {
        name: 'Ghost', health: 25, attackPower: 5, behavior: 'evasive', description: 'A wispy figure, drifting through the air with a mournful wail. Its presence sends shivers down your spine.', attackMessages: [
            "The Ghost reaches out with icy fingers, dealing {amount} damage!",
            "With a chilling wail, the Ghost strikes you for {amount} damage!",
            "The Ghost's haunting presence drains your spirit, inflicting {amount} damage!",
            "A cold breeze surrounds the Ghost as it deals {amount} damage!",
            "The Ghost vanishes and reappears, hitting you for {amount} damage!"
        ],
        deathMessages: [
            'The Ghost lets out a final wail, fading into nothingness.',
            'With a last shiver, the Ghost disappears, its haunting lifted.',
            'The ethereal figure dissolves, leaving behind a faint whisper.',
            'The ghostly apparition crumples, its energy returning to the void.',
            'The Ghost’s chilling presence vanishes, a silence left in its wake.'
        ],
        speed: 0.6
    },    
    {
        name: 'Griffin',
        health: 75,
        attackPower: 19,
        behavior: 'aggressive',
        description: 'A majestic beast with the head of an eagle and the body of a lion. It screeches as it spreads its wings.',
        attackMessages: [
            'The Griffin swoops down and slashes you with its talons, dealing {amount} damage!',
            'With a deafening screech, the Griffin lunges, its beak striking you for {amount} damage!',
            'The Griffin’s powerful claws tear into you, causing {amount} damage!',
            'The wind from the Griffin’s wings knocks you down, as it bites you for {amount} damage!',
            'The Griffin dives from above, its claws ripping into your flesh for {amount} damage!'
        ],
        deathMessages: [
            'The Griffin lets out a final screech, collapsing as its wings fold.',
            'With a heavy thud, the Griffin falls to the ground, its majestic form lifeless.',
            'The last breath of the Griffin escapes in a cloud of feathers as it falls.',
            'The mighty creature crashes down, its spirit returning to the skies above.',
            'The Griffin’s roar fades into silence, its body sprawled across the ground.'
        ],
        speed: 0.5
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
        ],
        deathMessages: [
            'The Slime loses its form, collapsing into a puddle with a final splatter.',
            'With a squelching sound, the Slime dissolves into nothingness.',
            'The Slime quivers and bursts, its gooey remnants spreading across the floor.',
            'The Slime’s mass dissipates, leaving behind a faint, acrid smell.',
            'The gelatinous creature bubbles and fades, leaving only a slick residue.'
        ],
        speed: 0.2
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
        ],
        deathMessages: [
            'The Bandit falls, clutching a wound, his greed extinguished.',
            'With a final gasp, the Bandit collapses, his dagger slipping from his grasp.',
            'The sneaky figure crumples to the ground, eyes wide with surprise.',
            'The Bandit’s last breath escapes, leaving his plans unfulfilled.',
            'The shadowy figure goes limp, the glint of greed fading from his eyes.'
        ],
        speed: 0.7
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
        ],
        deathMessages: [
            'The Minotaur lets out a final bellow, collapsing under its own weight.',
            'With a thunderous crash, the beast falls, its fury extinguished.',
            'The creature roars once more before crumpling, its power waning.',
            'The Minotaur’s body shudders and falls, the ground trembling beneath it.',
            'The towering figure falls silent, its massive form a lifeless heap.'
        ],
        speed: 0.4
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
        ],
        deathMessages: [
            'The Banshee’s wail fades to silence, her form dissipating into the air.',
            'With one last mournful cry, the Banshee fades into nothingness.',
            'The ghostly figure shudders and vanishes, leaving only an eerie stillness.',
            'Her final scream echoes and then falls silent, the haunting lifted.',
            'The Banshee’s essence disperses, her cries no longer haunting the night.'
        ],
        speed: 0.8
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
        ],
        deathMessages: [
            'The Lich crumbles to dust, its dark power fading into the ether.',
            'With a final hiss, the Lich collapses, its dark magic extinguished.',
            'The undead sorcerer collapses, its robes fluttering to the ground.',
            'The last remnants of dark magic dissipate as the Lich falls silent.',
            'The Lich’s skeletal frame crumbles, shadows retreating into the darkness.'
        ],
        speed: 0.3
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
        ],
        deathMessages: [
            'The Giant Spider collapses, its legs twitching before going still.',
            'With a final hiss, the massive creature falls, its fangs slackening.',
            'The spider’s body goes limp, venom pooling around it as it breathes its last.',
            'The Giant Spider’s form shudders before collapsing, its threat ended.',
            'Its many eyes dim as the Giant Spider falls, leaving only silence.'
        ],
        speed: 0.6
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
        ],
        deathMessages: [
            'The Harpy lets out a final screech, collapsing to the ground as its wings fold.',
            'With a pained cry, the Harpy crashes to the earth, its wings still.',
            'The creature falls, feathers scattered, its voice silenced forever.',
            'The Harpy’s form crumples, leaving only echoes of its wicked calls.',
            'The once-mighty screech fades as the Harpy lies still, its wings spread wide.'
        ],
        speed: 0.7
    },
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
        ],
        deathMessages: [
            'The Warlock collapses, its dark magic dissipating into the air.',
            'With a final, anguished scream, the Warlock crumples to the ground.',
            'The flames surrounding the Warlock extinguish as it falls, leaving only ashes behind.'
        ],
        speed: 0.5
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
        ],
        deathMessages: [
            'The Wyvern lets out a final roar before crashing to the ground, its wings folding in defeat.',
            'Its venomous fangs lose their bite as the Wyvern collapses, lifeless on the ground.',
            'With a shudder, the Wyvern falls from the sky, its body hitting the earth with a thunderous thud.'
        ],
        speed: 0.4
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
        ],
        deathMessages: [
            'The Gargoyle shatters into pieces, its stone form crumbling at your feet.',
            'With a final groan, the Gargoyle collapses back to its stony form, lifeless.',
            'The glow in the Gargoyle’s eyes fades as it becomes just another statue.'
        ],
        speed: 0.3
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
        ],
        deathMessages: [
            'The Mimic’s jaws snap shut for the last time, and it falls silent, reverting to a normal chest.',
            'Its form quivers, and with a final groan, the Mimic collapses, no longer animated.',
            'With a squelch, the Mimic deflates, leaving behind only a mundane treasure chest.'
        ],
        speed: 0
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
        ],
        deathMessages: [
            'The Cyclops stumbles, its massive frame crashing to the ground with a thunderous impact.',
            'With a final, pained cry, the Cyclops falls, its single eye dimming.',
            'The Cyclops collapses, shaking the earth as its club drops from its grasp.'
        ],
        speed: 0.2
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
        ],
        deathMessages: [
            'The Phantom dissipates into mist, leaving no trace of its presence.',
            'With a soft sigh, the Phantom fades away, returning to the void.',
            'As if caught in a breeze, the Phantom vanishes, leaving only silence behind.'
        ],
        speed: 0.8
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
        ],
        deathMessages: [
            'The Cursed Statue crumbles to the ground, the curse finally lifted.',
            'With a shudder, the Cursed Statue cracks and falls apart, revealing nothing but dust.',
            'The magical energy fades, and the Cursed Statue collapses, now just a pile of stone.'
        ],
        speed: 0
    },
    /*{
        name: 'Basilisk',
        health: 70,
        attackPower: 22,
        behavior: 'aggressive',
        description: 'A serpent-like creature with deadly eyes that can turn any who meet its gaze to stone.',
        attackMessages: [
            "The Basilisk's venomous bite pierces your flesh, causing {amount} damage!",
            'The Basilisk coils around you, squeezing for {amount} damage!',
            'Its deadly gaze briefly meets yours, and pain shoots through you for {amount} damage!'
        ],
        deathMessages: [
            'The Basilisk thrashes in its death throes before falling still, its gaze forever blank.',
            'With a final hiss, the Basilisk collapses, its deadly eyes dimming.',
            'The creature succumbs, its serpentine body going limp as the venom runs dry.'
        ],
        speed: 0.6
    },*/
    {
        name: 'Ogre',
        health: 60,
        attackPower: 16,
        behavior: 'aggressive',
        description: 'A lumbering giant with thick, warty skin. Its fists are massive, ready to crush anything in its way.',
        attackMessages: [
            'The Ogre slams its massive fist into you, crushing for {amount} damage!',
            'With a roar, the Ogre swings a heavy club, smashing into you for {amount} damage!',
            'The ground shakes as the Ogre stomps, dealing {amount} damage!',
            'The Ogre charges forward, tackling you with brutal force for {amount} damage!',
            'With a wild swing of its arm, the Ogre catches you off guard, causing {amount} damage!'
        ],
        deathMessages: [
            'The Ogre lets out a final roar as it crashes to the ground, lifeless.',
            'With a heavy thud, the Ogre falls, shaking the earth beneath you.',
            'You watch as the massive form of the Ogre crumbles, its reign of terror ended.'
        ],
        speed: 0.4
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
            'A quick and deadly strike from behind leaves you reeling for {amount} damage!',
            'The Shadow Assassin vanishes into the darkness, reappearing to stab you for {amount} damage!',
            'With swift precision, the assassin throws a dagger, hitting you for {amount} damage!'
        ],
        deathMessages: [
            'The Shadow Assassin collapses, their form fading into the shadows.',
            'With a final, silent gasp, the assassin falls, leaving no trace behind.',
            'You see the glint of steel dim as the Shadow Assassin succumbs to defeat.'
        ],
        speed: 0.8
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
            'Flames lick at you as the Fire Elemental\'s fiery form closes in, burning for {amount} damage!',
            'The Fire Elemental erupts in a fiery explosion, catching you in the blast for {amount} damage!',
            'With a flick of its fiery limbs, it sends a wave of flames crashing into you, dealing {amount} damage!'
        ],
        deathMessages: [
            'The Fire Elemental sputters and collapses, its flames flickering out.',
            'With a final roar, the elemental bursts into a shower of sparks before fading away.',
            'The fire dims as the elemental falls, leaving behind only ash and smoke.'
        ],
        speed: 0.5
    },
    {
        name: 'Crystal Golem',
        health: 180,
        attackPower: 20,
        behavior: 'defensive',
        description: 'A towering figure made entirely of shimmering crystal. Each blow reflects light in a dazzling array of colors.',
        attackMessages: [
            'The Crystal Golem\'s heavy fist strikes with crushing force, dealing {amount} damage!',
            'A shining arm smashes into you as the Crystal Golem moves, causing {amount} damage!',
            'The Crystal Golem swings its gleaming body, delivering {amount} damage!',
            'The golem charges forward, tackling you with its solid form for {amount} damage!',
            'With a sharp movement, the Golem sends shards of crystal flying at you, dealing {amount} damage!'
        ],
        deathMessages: [
            'The Crystal Golem shatters into a thousand sparkling pieces, falling silent.',
            'With a heavy crash, the golem crumbles, its shards glimmering in the light.',
            'You watch as the once-mighty figure collapses, leaving only scattered crystals behind.'
        ],
        speed: 0.3
    },
    {
        name: 'Bloodthirsty Wraith',
        health: 85,
        attackPower: 40,
        behavior: 'evasive',
        description: 'A ghostly figure with sunken eyes and skeletal fingers. It drifts across the battlefield, feeding on the life force of the living.',
        attackMessages: [
            'The Wraith\'s cold touch drains your life force, causing {amount} damage!',
            'The Wraith hovers close, sapping your vitality for {amount} damage!',
            'You feel your life force ebbing as the Wraith feeds, dealing {amount} damage!',
            'A chilling wail escapes the Wraith as it strikes, causing {amount} damage!',
            "The Wraith's presence chills your bones as it deals {amount} damage!"
        ],
        deathMessages: [
            'The Wraith lets out a final, haunting wail before dissolving into mist.',
            'With a shudder, the Wraith vanishes, leaving only silence in its wake.',
            'You see the Wraith dissipate into shadows, its hunger finally sated.'
        ],
        speed: 0.8
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
            'The stench of decay fills the air as the Ghoul attacks, causing {amount} damage!',
            'With a vicious snarl, the Ghoul lunges at you, dealing {amount} damage!',
            'The Ghoul emits a guttural growl as it strikes, causing {amount} damage!'
        ],
        deathMessages: [
            'The Ghoul collapses, its body decomposing into the ground.',
            'With a final, desperate screech, the Ghoul falls still, its hunger unfulfilled.',
            'The smell of decay fades as the Ghoul crumples into a lifeless heap.'
        ],
        speed: 0.6
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
            'The Guardian\'s stone fist crushes into you, dealing {amount} damage!',
            'The Stone Guardian stomps forward, its weight crashing down for {amount} damage!',
            'With a fierce growl, the Guardian slams its arm into you, dealing {amount} damage!'
        ],
        deathMessages: [
            'The Stone Guardian shatters, its pieces scattering across the ground.',
            'With a deep rumble, the Guardian crumbles, leaving behind only rubble.',
            'You watch as the ancient sentinel falls, its duty finally complete.'
        ],
        speed: 0
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
            "The Demon Hound's molten saliva burns your skin, causing {amount} damage!",
            'The Demon Hound lunges at you, claws raking for {amount} damage!',
            'With a vicious growl, it snaps at you, inflicting {amount} damage!'
        ],
        deathMessages: [
            'The Demon Hound lets out a final howl as it crumples to the ground!',
            'With a burst of flames, the Demon Hound is vanquished, leaving only ashes behind.',
            'The once ferocious Demon Hound falls silent, its glowing eyes dimming.'
        ],
        speed: 0.7
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
            "The Frost Giant's icy touch freezes you, inflicting {amount} damage!",
            'With a massive swing, the Frost Giant sends icy shards flying, dealing {amount} damage!',
            'The Frost Giant stomps down, sending a blast of frost that deals {amount} damage!'
        ],
        deathMessages: [
            'The Frost Giant lets out a last icy breath before crumbling into a pile of snow and ice.',
            'With a thunderous crash, the Frost Giant falls, shattering upon impact.',
            'The colossal form of the Frost Giant collapses, ice shards scattering everywhere.'
        ],
        speed: 0.4
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
            "The Arcane Construct's body pulses with power as it strikes, causing {amount} damage!",
            'With a whirring sound, it unleashes a barrage of arcane bolts, dealing {amount} damage!',
            'The construct charges up and delivers a powerful magical punch, inflicting {amount} damage!'
        ],
        deathMessages: [
            'The Arcane Construct shudders, its runes flickering before going dark.',
            'With a final spark, the Arcane Construct collapses, its magic dissipating into the air.',
            'The mechanical figure falls apart, gears and runes scattered across the ground.'
        ],
        speed: 0
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
            'The Necromancer sends a blast of black energy, dealing {amount} damage!',
            'With a sinister chant, the Necromancer releases a dark wave, causing {amount} damage!',
            'A burst of deathly energy envelops you, inflicting {amount} damage!'
        ],
        deathMessages: [
            'The Necromancer crumbles into bones, their dark magic finally extinguished.',
            'With a final gasp, the Necromancer falls, its power fading away.',
            'The skeletal figure shatters, leaving only a whisper of dark energy behind.'
        ],
        speed: 0.3
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
            "The Dire Wolf's powerful bite tears through your defenses, causing {amount} damage!",
            'It howls and lunges, crashing into you for {amount} damage!',
            'With feral agility, the Dire Wolf whips around and delivers a fierce bite, dealing {amount} damage!'
        ],
        deathMessages: [
            'The Dire Wolf collapses, its growl fading into silence.',
            'With a final howl, the Dire Wolf falls, its eyes losing their fierce light.',
            'The great beast slumps to the ground, still and lifeless.'
        ],
        speed: 0.7
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
            'With a hollow clang, the Living Armor slams into you for {amount} damage!',
            'The armor stomps forward, delivering a crushing blow for {amount} damage!',
            'A blade of spectral energy emerges from the armor, cutting deep for {amount} damage!'
        ],
        deathMessages: [
            'The Living Armor collapses, its metal body clanging noisily as it falls.',
            'With a final echoing clang, the armor falls apart, leaving only silence.',
            'The dark magic fades, causing the armor to collapse into a heap.'
        ],
        speed: 0.2
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
            'With a flick of his wrist, the Sorcerer sends a blast of arcane energy, causing {amount} damage!',
            'He gestures wildly, unleashing a torrent of flame that deals {amount} damage!',
            'The Sorcerer weaves through the air, striking you with a bolt of raw energy for {amount} damage!'
        ],
        deathMessages: [
            'The Rogue Sorcerer falls to the ground, his last spell fizzling out.',
            'With a final scream, the Sorcerer is engulfed in his own flames.',
            'The once-powerful mage collapses, his corrupted energy dissipating into the ether.'
        ],
        speed: 0.8
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
            "Venom drips from the Plant's fangs as it strikes, causing {amount} damage!",
            'The plant entangles you with its vines, dealing {amount} damage!',
            'With a sudden snap, the plant attacks, inflicting {amount} damage!'
        ],
        deathMessages: [
            'The Man-Eating Plant wilts, its vines falling limp as it succumbs.',
            'With a final shudder, the plant collapses, its teeth clattering to the ground.',
            'The carnivorous plant withers away, leaving nothing but a pile of leaves.'
        ],
        speed: 0
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
        ],
        deathMessages: [
            "The Chimera lets out a final roar before collapsing.",
            "With a defeated cry, the Chimera falls, its heads drooping lifelessly.",
            "The once fearsome Chimera crumbles into a heap of defeated flesh."
        ],
        speed: 0.6
    },
    {
        name: 'Wraith',
        health: 90,
        attackPower: 40,
        behavior: 'passive',
        description: 'A haunting spirit cloaked in shadows, it glides silently through the air, seeking the souls of the living.',
        attackMessages: [
            "The Wraith reaches out with icy fingers, dealing {amount} damage!",
            "A chilling wail echoes as the Wraith drains your life force, causing {amount} damage!",
            "The Wraith's touch is like ice, delivering {amount} damage!"
        ],
        deathMessages: [
            "The Wraith dissipates into mist, its scream fading into silence.",
            "With a final, anguished wail, the Wraith fades from existence.",
            "The Wraith's form crumbles into shadows, leaving only a whisper behind."
        ],
        speed: 0.8
    },
    {
        name: 'Minotaur',
        health: 160,
        attackPower: 70,
        behavior: 'aggressive',
        description: 'A towering beast with the body of a man and the head of a bull, it charges with immense force through the labyrinth.',
        attackMessages: [
            "The Minotaur charges forward, goring you with its horns for {amount} damage!",
            "With a furious bellow, the Minotaur slams into you, dealing {amount} damage!",
            "The Minotaur swings its mighty fists, causing {amount} damage!"
        ],
        deathMessages: [
            "The Minotaur collapses, its massive body thudding against the ground.",
            "With a final roar, the Minotaur falls, shaking the earth beneath.",
            "The Minotaur's last breath escapes in a low groan as it succumbs."
        ],
        speed: 0.4
    },
    {
        name: 'Eldritch Horror',
        health: 200,
        attackPower: 100,
        behavior: 'defensive',
        description: 'A twisting mass of tentacles and eyes that defies comprehension, its mere presence induces madness.',
        attackMessages: [
            "The Eldritch Horror lashes out with a tentacle, dealing {amount} damage!",
            "An eye opens wide, unleashing a psychic scream that causes {amount} damage!",
            "The ground quakes as the Eldritch Horror shifts, dealing {amount} damage!"
        ],
        deathMessages: [
            "The Eldritch Horror lets out a final, unearthly shriek before unraveling.",
            "As it dies, the Eldritch Horror dissolves into an array of colors and whispers.",
            "The horrors of its existence fade away, leaving only echoes of madness."
        ],
        speed: 0.2
    },
    {
        name: 'Vampire',
        health: 120,
        attackPower: 60,
        behavior: 'aggressive',
        description: 'A pale figure with a predatory gaze, it lurks in the shadows, seeking its next victim.',
        attackMessages: [
            "The Vampire lunges forward, biting deeply and dealing {amount} damage!",
            "With a swift slash of its claws, the Vampire inflicts {amount} damage!",
            "The Vampire's hypnotic gaze lures you closer, causing {amount} damage!"
        ],
        deathMessages: [
            "The Vampire crumbles into dust, a chilling grin frozen on its face.",
            "With a final gasp, the Vampire vanishes into mist, leaving only silence.",
            "The dark energy around the Vampire dissipates, revealing a lifeless husk."
        ],
        speed: 0.7
    },
    {
        name: 'Dragon',
        health: 180,
        attackPower: 80,
        behavior: 'aggressive',
        description: 'A majestic beast with scales like armor and wings that darken the sky, it breathes fire with a terrifying roar.',
        attackMessages: [
            "The Dragon unleashes a torrent of flames, dealing {amount} damage!",
            "With a swipe of its massive claws, the Dragon inflicts {amount} damage!",
            "The Dragon's tail strikes like a whip, causing {amount} damage!"
        ],
        deathMessages: [
            "The Dragon lets out a final roar before collapsing in a heap of scales.",
            "With a massive shudder, the Dragon falls, extinguished forever.",
            "The once-mighty Dragon breathes its last, its body lying still and lifeless."
        ],
        speed: 0.5
    },
    {
        name: 'Ghoul',
        health: 60,
        attackPower: 30,
        behavior: 'aggressive',
        description: 'A grotesque creature that feasts on the remains of the dead, it skitters about with unnatural speed.',
        attackMessages: [
            "The Ghoul lunges at you, its claws raking for {amount} damage!",
            "With a ghastly shriek, the Ghoul bites, dealing {amount} damage!",
            "The stench of decay surrounds the Ghoul as it inflicts {amount} damage!"
        ],
        deathMessages: [
            "The Ghoul lets out a final, pitiful moan before falling still.",
            "With a desperate gasp, the Ghoul collapses, its hunger finally sated.",
            "The Ghoul's lifeless body slumps to the ground, a look of despair on its face."
        ],
        speed: 0.9
    },
    {
        name: 'Treant',
        health: 200,
        attackPower: 50,
        behavior: 'defensive',
        description: 'A massive tree-like creature, it guards the forest with ancient wisdom and formidable strength.',
        attackMessages: [
            "The Treant slams a heavy branch down, causing {amount} damage!",
            "Roots erupt from the ground, ensnaring you and dealing {amount} damage!",
            "With a deep rumble, the Treant shakes its branches, inflicting {amount} damage!"
        ],
        deathMessages: [
            "The Treant shudders, its bark cracking as it falls to the forest floor.",
            "With a mournful groan, the Treant collapses, life leaving its ancient form.",
            "The Treant's last sigh rustles through the leaves as it succumbs."
        ],
        speed: 0.3
    },
    {
        name: 'Zombie',
        health: 80,
        attackPower: 20,
        behavior: 'aggressive',
        description: 'A reanimated corpse, driven by an insatiable hunger for flesh, it stumbles forward with relentless determination.',
        attackMessages: [
            "The Zombie lurches forward, biting at you for {amount} damage!",
            "With a decaying hand, the Zombie slaps you, dealing {amount} damage!",
            "The Zombie's moan echoes as it claws at you, causing {amount} damage!"
        ],
        deathMessages: [
            "The Zombie crumples to the ground, lifeless once more.",
            "With a final groan, the Zombie collapses, returning to the grave.",
            "The putrid remains of the Zombie fall silent, no longer a threat."
        ],
        speed: 0.4
    },
    {
        name: 'Gorgon',
        health: 140,
        attackPower: 70,
        behavior: 'defensive',
        description: 'A fearsome creature with snakes for hair, its gaze can turn flesh to stone.',
        attackMessages: [
            "The Gorgon locks eyes with you, dealing {amount} damage and petrifying your resolve!",
            "With a hiss, the Gorgon strikes, delivering {amount} damage!",
            "The Gorgon whips her serpentine hair, causing {amount} damage!"
        ],
        deathMessages: [
            "The Gorgon lets out a final hiss as she falls, her snakes lying still.",
            "With a pained gasp, the Gorgon crumbles into stone.",
            "The once-mighty Gorgon shatters, her power lost forever."
        ],
        speed: 0.5
    },
    {
        name: 'Space Pirate',
        health: 100,
        attackPower: 50,
        behavior: 'aggressive',
        description: 'A rogue in a cybernetic suit, this space pirate uses advanced weaponry and cunning tactics.',
        attackMessages: [
            "The Space Pirate fires a blaster, dealing {amount} damage!",
            "With a swift move, the Space Pirate slashes with a plasma dagger, inflicting {amount} damage!",
            "The Space Pirate's energy shield crackles as it strikes, causing {amount} damage!"
        ],
        deathMessages: [
            "The Space Pirate's suit sparks and sputters before collapsing.",
            "With a final gasp, the Space Pirate falls, his weapons clattering to the ground.",
            "The Space Pirate's suit powers down, leaving only a lifeless form."
        ],
        speed: 0.7
    },

    { name: 'Spectral Knight', health: 140, attackPower: 30, behavior: 'defensive', description: 'A knight clad in ghostly armor, wielding a translucent sword. It silently defends its ancient tomb.', attackMessages: ['The knight swings its sword with ghostly precision, dealing {amount} damage.', 'A spectral slash slices through the air towards you, causing {amount} damage.'], speed: 0.3 },
    { name: 'Hydra', health: 180, attackPower: 55, behavior: 'aggressive', description: 'A many-headed serpent that regenerates each time it is struck. Cutting off one head only leads to two more taking its place.', attackMessages: ['The hydra lashes out with multiple heads, snapping ferociously, inflicting {amount} damage.', 'A head strikes, followed by a second just as fierce, dealing {amount} damage.'], speed: 0.5 },
    { name: 'Djinn', health: 105, attackPower: 35, behavior: 'evasive', description: 'A spirit of the wind, capable of vanishing in a puff of smoke. It strikes swiftly with bolts of energy before disappearing again.', attackMessages: ['The djinn materializes, launching a bolt of energy at you, causing {amount} damage.', 'With a flourish, it vanishes and reappears to strike again, dealing {amount} damage.'], speed: 0.8 },
    { name: 'War Beast', health: 190, attackPower: 40, behavior: 'aggressive', description: 'A massive beast bred for battle, with armored scales and bloodstained tusks. It charges relentlessly toward its prey.', attackMessages: ['The war beast charges forward, tusks gleaming, dealing {amount} damage.', 'It rams into you with the force of a freight train, inflicting {amount} damage.'], speed: 0.4 },
    { name: 'Haunted Mirror', health: 50, attackPower: 28, behavior: 'evasive', description: 'An ethereal entity trapped in a reflective surface. It casts illusions, confusing and disorienting those who face it.', attackMessages: ['The mirror shimmers, distorting reality around you, causing {amount} damage.', 'You see yourself reflected, but the image is warped and mocking, inflicting {amount} damage.'], speed: 0.8 },
    { name: 'Cursed Samurai', health: 120, attackPower: 45, behavior: 'defensive', description: 'An undead warrior with a katana that gleams in the moonlight. Its honor binds it to eternal battle.', attackMessages: ['The samurai draws its katana, ready to defend its honor, dealing {amount} damage.', 'It strikes with unmatched precision, a blur in the moonlight, causing {amount} damage.'], speed: 0.3 },
    { name: 'Infernal Imp', health: 40, attackPower: 18, behavior: 'evasive', description: 'A mischievous demon with bat-like wings and fiery breath. It flits about the battlefield, leaving trails of smoke.', attackMessages: ['The imp darts around, breathing fire in your direction, inflicting {amount} damage.', 'With a laugh, it swoops down, claws extended, dealing {amount} damage.'], speed: 0.8 },
    { name: 'Gorgon', health: 160, attackPower: 48, behavior: 'aggressive', description: 'A serpent-haired woman whose gaze turns enemies to stone. Her hissing laughter can freeze the blood of the bravest warrior.', attackMessages: ['The gorgon locks eyes with you, her gaze freezing and dealing {amount} damage.', 'Her laughter echoes as she strikes with her serpentine hair, inflicting {amount} damage.'], speed: 0.6 },
    { name: 'Bone Dragon', health: 250, attackPower: 70, behavior: 'aggressive', description: 'A skeletal dragon raised from the grave, its eyes glowing with necromantic energy. It breathes an icy, deathly fog.', attackMessages: ['The bone dragon lets out a chilling roar before striking, dealing {amount} damage.', 'It breathes a cloud of necrotic fog that saps your strength, causing {amount} damage.'], speed: 0.5 },
    { name: 'Thunderbird', health: 145, attackPower: 60, behavior: 'aggressive', description: 'A gigantic bird whose wings crackle with lightning. Each beat of its wings summons a storm.', attackMessages: ['The thunderbird swoops down, lightning dancing on its wings, dealing {amount} damage.', 'A thunderous clap accompanies its talons as they dive toward you, inflicting {amount} damage.'], speed: 0.7 },
    { name: 'Plague Rat', health: 60, attackPower: 22, behavior: 'evasive', description: 'A diseased rodent with gnashing teeth and infectious bites. It spreads sickness wherever it roams.', attackMessages: ['The plague rat lunges, teeth bared and infectious, causing {amount} damage.', 'With a squeal, it darts in and out, spreading disease and inflicting {amount} damage.'], speed: 0.8 },
    { name: 'Iron Colossus', health: 300, attackPower: 55, behavior: 'defensive', description: 'A gigantic iron construct, built for war. Its slow movements are matched by devastating blows.', attackMessages: ['The colossus raises its arm to strike with unyielding force, dealing {amount} damage.', 'With a heavy thud, it crashes down upon you, inflicting {amount} damage.'], speed: 0.2 },
    { name: 'Lava Serpent', health: 130, attackPower: 38, behavior: 'aggressive', description: 'A serpent of molten rock, leaving a trail of fire in its wake. It strikes with the heat of a forge.', attackMessages: ['The lava serpent lashes out, fire trailing behind, causing {amount} damage.', 'It lunges forward, molten rock dripping from its fangs, inflicting {amount} damage.'], speed: 0.6 },
    { name: 'Witch Queen', health: 175, attackPower: 65, behavior: 'aggressive', description: 'A malevolent ruler with mastery over dark magic. Her spells twist reality itself, making her foes tremble in fear.', attackMessages: ['The Witch Queen raises her hands, dark energy swirling, dealing {amount} damage.', 'With a sinister laugh, she unleashes a spell that strikes you for {amount} damage.'], speed: 0.5 },
    { name: 'Silverback Gorilla', health: 140, attackPower: 50, behavior: 'aggressive', description: 'A hulking gorilla with silver fur, it pounds its chest before attacking with bone-crushing strength.', attackMessages: ['The silverback pounds its chest and charges, inflicting {amount} damage.', 'It swings its massive fists, dealing {amount} damage with each strike.'], speed: 0.7 },
    { name: 'Void Terror', health: 280, attackPower: 80, behavior: 'aggressive', description: 'A creature from the depths of the void, its form shifting between nightmares. It attacks the mind as much as the body.', attackMessages: ['The void terror lashes out, causing you to question reality itself, dealing {amount} damage.', 'It attacks with a wave of despair, inflicting {amount} damage to your very essence.'], speed: 0.4 },
    { 
        name: 'Goblin', 
        health: 35, 
        attackPower: 8, 
        behavior: 'aggressive', 
        description: 'A small but vicious creature with a sharp blade and even sharper teeth.', 
        attackMessages: ['The goblin slashes wildly with its dagger, dealing {amount} damage.', 'It cackles as it lunges with a crude blade, causing {amount} damage.'], 
        speed: 0.6 
    },
    { 
        name: 'Cave Bat', 
        health: 20, 
        attackPower: 6, 
        behavior: 'evasive', 
        description: 'A small, fast creature that strikes from the shadows of the cave ceiling.', 
        attackMessages: ['The bat swoops down from the darkness, biting you for {amount} damage.', 'With a flutter of wings, it darts past, grazing you for {amount} damage.'], 
        speed: 0.9 
    },
    { 
        name: 'Zombie', 
        health: 45, 
        attackPower: 7, 
        behavior: 'slow', 
        description: 'A shambling corpse animated by dark magic. Slow but relentless.', 
        attackMessages: ['The zombie drags itself toward you, clawing for {amount} damage.', 'It groans and lunges forward, rotting hands dealing {amount} damage.'], 
        speed: 0.3 
    },
    { 
        name: 'Slime', 
        health: 30, 
        attackPower: 5, 
        behavior: 'defensive', 
        description: 'A mindless blob of acidic goo. Difficult to harm, but not very dangerous.', 
        attackMessages: ['The slime stretches out, burning your skin with acid for {amount} damage.', 'It splashes toward you, the goo searing your flesh for {amount} damage.'], 
        speed: 0.4 
    },
    { 
        name: 'Skeleton', 
        health: 40, 
        attackPower: 10, 
        behavior: 'aggressive', 
        description: 'An animated skeleton wielding a rusted sword. It fights without fear or pain.', 
        attackMessages: ['The skeleton swings its sword, cutting you for {amount} damage.', 'It thrusts its sword at you with a rattle of bones, dealing {amount} damage.'], 
        speed: 0.5 
    },
    { 
        name: 'Giant Spider', 
        health: 50, 
        attackPower: 12, 
        behavior: 'evasive', 
        description: 'A venomous spider that strikes quickly and retreats into the shadows.', 
        attackMessages: ['The spider bites you with venomous fangs, causing {amount} damage.', 'It leaps at you, injecting venom and dealing {amount} damage.'], 
        speed: 0.8 
    },
    { 
        name: 'Bandit', 
        health: 55, 
        attackPower: 15, 
        behavior: 'aggressive', 
        description: 'A lawless rogue looking to make a quick profit at your expense.', 
        attackMessages: ['The bandit slashes with a rusty blade, causing {amount} damage.', 'It swings wildly, aiming for your throat and dealing {amount} damage.'], 
        speed: 0.7 
    },
    { 
        name: 'Swarm of Insects', 
        health: 20, 
        attackPower: 4, 
        behavior: 'evasive', 
        description: 'A buzzing cloud of biting and stinging insects, hard to hit but not very strong.', 
        attackMessages: ['The swarm engulfs you, biting and stinging for {amount} damage.', 'Insects bite and claw at your skin, causing {amount} damage.'], 
        speed: 1.0 
    },
    { 
        name: 'Fire Beetle', 
        health: 25, 
        attackPower: 9, 
        behavior: 'aggressive', 
        description: 'A beetle that spits small bursts of fire when threatened.', 
        attackMessages: ['The fire beetle spits a small flame, scorching you for {amount} damage.', 'It launches a burst of fire from its mandibles, causing {amount} damage.'], 
        speed: 0.6 
    },
    { 
        name: 'Wild Boar', 
        health: 60, 
        attackPower: 18, 
        behavior: 'aggressive', 
        description: 'A powerful and fast wild animal with dangerous tusks.', 
        attackMessages: ['The boar charges forward, goring you with its tusks for {amount} damage.', 'It rushes at you in a rage, slamming into you for {amount} damage.'], 
        speed: 0.7 
    },
    { 
        name: 'Living Vine', 
        health: 40, 
        attackPower: 7, 
        behavior: 'defensive', 
        description: 'A sentient vine that wraps around its victims and strangles them.', 
        attackMessages: ['The vine wraps around you, constricting you for {amount} damage.', 'It lashes out, slapping you with its thorny tendrils, causing {amount} damage.'], 
        speed: 0.5 
    },
    { 
        name: 'Mud Golem', 
        health: 70, 
        attackPower: 15, 
        behavior: 'defensive', 
        description: 'A creature formed from mud and stone, slow but resilient.', 
        attackMessages: ['The mud golem slams its heavy fists into you, dealing {amount} damage.', 'It throws a chunk of mud at you, causing {amount} damage.'], 
        speed: 0.3 
    },
    { 
        name: 'Dire Wolf', 
        health: 55, 
        attackPower: 20, 
        behavior: 'aggressive', 
        description: 'A large and ferocious wolf with sharp teeth and a hunger for blood.', 
        attackMessages: ['The dire wolf lunges at you, biting deeply for {amount} damage.', 'It growls as it leaps, sinking its fangs into your flesh, dealing {amount} damage.'], 
        speed: 0.8 
    },
    { 
        name: 'Shade', 
        health: 25, 
        attackPower: 12, 
        behavior: 'evasive', 
        description: 'A shadowy figure that slips in and out of existence. It strikes with chilling force.', 
        attackMessages: ['The shade moves through you, chilling your bones for {amount} damage.', 'It strikes from the shadows, sapping your strength for {amount} damage.'], 
        speed: 0.9 
    },
    { 
        name: 'Wild Dog', 
        health: 40, 
        attackPower: 10, 
        behavior: 'aggressive', 
        description: 'A feral dog with rabid tendencies. Its bite is nasty and diseased.', 
        attackMessages: ['The wild dog bites viciously, dealing {amount} damage.', 'It snarls and lunges, teeth bared, causing {amount} damage.'], 
        speed: 0.6 
    },
    { 
        name: 'Feral Cat', 
        health: 25, 
        attackPower: 8, 
        behavior: 'evasive', 
        description: 'A wild, agile cat. It scratches and bites before fleeing into the shadows.', 
        attackMessages: ['The feral cat slashes at you with its claws, causing {amount} damage.', 'It bites and scratches before darting away, dealing {amount} damage.'], 
        speed: 0.9 
    },
    { 
        name: 'Will-o\'-Wisp', 
        health: 15, 
        attackPower: 6, 
        behavior: 'evasive', 
        description: 'A floating, glowing orb of ghostly light. It drains life force from those it encounters.', 
        attackMessages: ['The wisp flickers around you, drawing away {amount} health.', 'It pulses with energy, draining your life force for {amount} damage.'], 
        speed: 0.9 
    },
    { 
        name: 'Gnoll', 
        health: 50, 
        attackPower: 14, 
        behavior: 'aggressive', 
        description: 'A hyena-like humanoid with a sadistic thirst for battle.', 
        attackMessages: ['The gnoll strikes with its axe, laughing as it deals {amount} damage.', 'It bites and claws in a frenzy, inflicting {amount} damage.'], 
        speed: 0.7 
    },
    { 
        name: 'Cursed Armor', 
        health: 65, 
        attackPower: 16, 
        behavior: 'defensive', 
        description: 'An empty suit of armor, animated by a malevolent spirit.', 
        attackMessages: ['The armor swings its heavy sword, clanging as it deals {amount} damage.', 'It bashes into you with its shield, causing {amount} damage.'], 
        speed: 0.4 
    },
    { 
        name: 'Dire Rat', 
        health: 45, 
        attackPower: 12, 
        behavior: 'aggressive', 
        description: 'A larger and deadlier version of the common plague rat, with the same infectious bite.', 
        attackMessages: ['The dire rat bites into your flesh, dealing {amount} damage.', 'It leaps at you with gnashing teeth, inflicting {amount} damage.'], 
        speed: 0.8 
    },
    { 
        name: 'Toxic Slime', 
        health: 55, 
        attackPower: 11, 
        behavior: 'aggressive', 
        description: 'A bubbling mass of green goo that leaves a trail of corrosive liquid. Its very presence is a hazard, corroding anything it touches.', 
        attackMessages: ['The Toxic Slime engulfs you, inflicting {amount} damage with its corrosive touch.', 'It splatters toxic goo, dealing {amount} damage from the poison.'], 
        speed: 0.5 
    },
    { 
        name: 'Vengeful Spirit', 
        health: 70, 
        attackPower: 14, 
        behavior: 'aggressive', 
        description: 'A ghostly figure wrapped in tattered rags, with hollow eyes that burn with fury. It seeks vengeance on those who disturb its eternal rest.', 
        attackMessages: ['The Vengeful Spirit reaches out, dealing {amount} damage with its icy touch.', 'It screeches in rage, causing a wave of despair that inflicts {amount} damage.'], 
        speed: 0.8 
    },
    { 
        name: 'Ghastly Apparition', 
        health: 40, 
        attackPower: 8, 
        behavior: 'defensive', 
        description: 'An ethereal figure that drifts silently through the air, emitting a mournful wail. Its presence chills the air around it, creating an aura of dread.', 
        attackMessages: ['The Ghastly Apparition unleashes a chilling wail, dealing {amount} damage to your psyche.', 'It hovers close, draining your willpower and inflicting {amount} damage.'], 
        speed: 0.6 
    },
    { 
        name: 'Shadow Wraith', 
        health: 50, 
        attackPower: 10, 
        behavior: 'aggressive', 
        description: 'A swirling mass of darkness with glowing red eyes, the Shadow Wraith feeds on fear and despair, striking from the shadows with deadly precision.', 
        attackMessages: ['The Shadow Wraith lunges at you, inflicting {amount} damage with its dark tendrils.', 'You feel a chill as the Wraith siphons your strength, dealing {amount} damage.'], 
        speed: 0.75 
    },
    { 
        name: 'Creeping Terror', 
        health: 60, 
        attackPower: 15, 
        behavior: 'stealth', 
        description: 'A green, hulking creature that silently approaches, ready to unleash an explosive surprise. Its face is blank, save for a pair of haunting eyes that glow in the darkness.', 
        attackMessages: ['The Creeping Terror detonates in a burst of energy, dealing {amount} damage.', 'It lunges forward, causing a shockwave that inflicts {amount} damage.'], 
        speed: 0.9 
    },    
    
    
];

const bosses = [
    {
        name: 'Basilisk',
        health: 70,
        attackPower: 22,
        behavior: 'aggressive',
        description: 'A serpent-like creature with deadly eyes that can turn any who meet its gaze to stone.',
        attackMessages: [
            "The Basilisk lunges forward, its fangs glinting ominously, and sinks them into your flesh, dealing {amount} damage!",
            "With a swift motion, the Basilisk wraps its powerful coils around you, tightening its grip and inflicting {amount} damage!",
            "As you glance into its cold, unfeeling eyes, the Basilisk hisses and lunges, causing {amount} damage as its scales scrape against you.",
            "The Basilisk's serpentine body twists and turns with unsettling speed, delivering a bite that rends your skin for {amount} damage!",
            "You feel a jolt of pain as the Basilisk strikes, its venom seeping into your bloodstream and dealing {amount} damage with each heartbeat."
        ],
        deathMessages: [
            "In a final, desperate attempt to strike, the Basilisk lets out a chilling hiss before collapsing, its deadly gaze forever lost.",
            "With a shudder, the Basilisk succumbs to its wounds, its body going limp, leaving only the echo of its menacing presence.",
            "As the last breath leaves the Basilisk’s body, its once-vibrant scales dim, and the dungeon falls eerily silent.",
            "The Basilisk thrashes one last time, a spasm of fury and pain, before it lies still, the threat it once posed now extinguished.",
            "Its serpentine form sprawls on the ground, the malevolent power it once wielded now just a memory in the dark."
        ],
        speed: 0.6,
        specialAttack: {
            effect:'fleshToStone',
            chance: 0.9,
            duration: 15,
            messages: [
                "Your heart races as you meet the Basilisk's gaze. Time seems to slow as you feel your body beginning to stiffen, transforming into stone!",
                "The world around you blurs as the Basilisk locks eyes with you, its petrifying gaze seeping into your very essence, leaving you breathless.",
                "With a wicked grin, the Basilisk unleashes its gaze, and you feel your muscles tightening, caught in the throes of a sinister transformation.",
                "As you gaze into the Basilisk's eyes, the air thickens, and panic floods your mind; your body is betraying you as you begin to turn to stone!",
                "A shiver runs down your spine as the Basilisk's eyes meet yours. You gasp in horror as your limbs start to freeze in place, becoming cold and unyielding."
            ]
        }
    }, 
]

const createIdedArray = (array) => {
    return array.map((item, index) => {
        item.id = index;
        return item;
    });
}

const enemyDefinitions = createIdedArray(enemyDefinitionsRaw);

export function createEnemyById(id){
    const definition = enemyDefinitions.find(enemy => enemy.id === id);
    if (definition) {
        return new Enemy(
            definition.name,
            definition.health,
            definition.attackPower,
            definition.behavior,
            definition.description,
            definition.attackMessages, // Pass attackMessages here
            definition.speed,
            definition.deathMessages,
            definition.id
        );
    }
}


export function createEnemy(name) {
    const definition = enemyDefinitions.find(enemy => enemy.name === name);
    if (definition) {
        return new Enemy(
            definition.name,
            definition.health,
            definition.attackPower,
            definition.behavior,
            definition.description,
            definition.attackMessages, // Pass attackMessages here
            definition.speed,
            definition.deathMessages,
            definition.id
        );
    }
    return null;
}

export function getRandomEnemy() {
    const definition = enemyDefinitions[Math.floor(Math.random() * enemyDefinitions.length)];
    return new Enemy(definition.name, definition.health, definition.attackPower, definition.behavior, definition.description, definition.attackMessages, definition.speed, definition.deathMessages);
}

export function getRandomBoss() {
    const definition = bosses[Math.floor(Math.random() * bosses.length)];
    return new Boss(
        definition.name,
        definition.health,
        definition.attackPower,
        definition.behavior,
        definition.description,
        definition.attackMessages,
        definition.speed,
        definition.deathMessages,
        definition.specialAttack // Include specialAttack when creating the Boss
    ); 
}