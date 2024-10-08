import { Item } from "./item.mjs";

export const items = [
    new Item("Sword", { type: "attack", value: 5 },
        "A sharp blade used for combat. Its hilt is worn, but it gleams with deadly intent."),
    new Item("Shield", { type: "health", value: 20 },
        "A sturdy shield crafted from reinforced steel. Its surface is scratched from many battles."),
    new Item("Potion", { type: "health", value: 10 },
        "A small vial of red liquid that shimmers when shaken. It smells faintly of herbs."),
    new Item("Magic Staff", { type: "attack", value: 10 },
        "A staff imbued with magical powers, crackling with energy. Its wooden frame is smooth and cool to the touch."),
    new Item("Healing Herb", { type: "health", value: 15 },
        "A green herb with a strong, earthy scent. It's said to have miraculous healing properties when brewed."),
    new Item("Ancient Tome", { type: "attack", value: 7 },
        "A dusty old book filled with forgotten spells. The pages hum with magical energy."),

    // Additional items
    new Item("Iron Dagger", { type: "attack", value: 3 },
        "A small, lightweight dagger. It's easy to conceal but deadly in close quarters."),
    new Item("Steel Armor", { type: "health", value: 25 },
        "Heavy armor forged from tempered steel. It offers great protection, though it's cumbersome."),
    new Item("Elven Bow", { type: "attack", value: 8 },
        "A finely crafted bow made by elven hands. It's both elegant and incredibly precise."),
    new Item("Bandages", { type: "health", value: 5 },
        "Simple cloth bandages for quick first aid. They can stop bleeding and mend minor wounds."),
    new Item("Enchanted Ring", { type: "health", value: 12 },
        "A ring that glows faintly with a soft light. It is said to have healing powers for its wearer."),
    new Item("Fireball Scroll", { type: "attack", value: 9 },
        "A scroll containing a powerful fireball spell. The edges of the parchment are singed with use."),
    new Item("Mithril Shield", { type: "health", value: 30 },
        "A shimmering shield made of mithril, light yet nearly indestructible. It shines even in the darkest places."),
    new Item("Battle Axe", { type: "attack", value: 12 },
        "A massive, two-handed axe. Its blade is nicked from countless strikes, but still fearsome."),
    new Item("Dragon Scale Armor", { type: "health", value: 35 },
        "Armor made from the scales of a dragon. It is incredibly tough, yet surprisingly light."),
    new Item("Poisoned Dagger", { type: "attack", value: 6 },
        "A small dagger coated in a dark, lethal poison. One cut can be deadly over time."),
    new Item("Herbal Salve", { type: "health", value: 8 },
        "A jar of ointment made from healing herbs. It soothes burns and accelerates the healing of wounds."),
    new Item("Thunder Hammer", { type: "attack", value: 15 },
        "A hammer infused with the power of lightning. Each strike reverberates with thunderous force."),
    new Item("Phoenix Feather", { type: "health", value: 20 },
        "A rare feather from a phoenix, rumored to have life-restoring properties when used."),
    new Item("Crystal Sword", { type: "attack", value: 14 },
        "A sword with a blade made of pure crystal. It hums with a strange, unearthly power."),
    new Item("Rejuvenation Potion", { type: "health", value: 18 },
        "A glowing liquid in a crystal vial. It not only heals wounds but restores vitality."),
    new Item("Venomous Spear", { type: "attack", value: 11 },
        "A spear tipped with venomous fangs. It can pierce armor and deliver a deadly toxin."),
    new Item("Golden Chalice", { type: "health", value: 22 },
        "An ornate chalice said to be blessed by the gods. Drinking from it restores strength and health."),
    new Item("Silver Arrows", { type: "attack", value: 7 },
        "A quiver of silver-tipped arrows. They are especially effective against magical creatures."),
    new Item("Ring of Vitality", { type: "health", value: 16 },
        "A glowing ring that radiates warmth. It bolsters the wearer's endurance and fortitude."),
    new Item("Bloodstained Gauntlet", { type: "attack", value: 8 },
        "A heavy gauntlet smeared with dried blood. It is said to have once belonged to a tyrant, and it pulses with a desire for violence."),
    new Item("Severed Hand", { type: "attack", value: 6 },
        "A dismembered hand, cold to the touch. The fingers twitch occasionally, seeking a weapon to wield once more."),
    new Item("Beating Heart", { type: "health", value: 18 },
        "A still-living heart, thrumming with vitality. When consumed, its strength is said to bond with the user's own, extending their life."),
    new Item("Mantle of the Archmage", { type: "health", value: 25 },
        "This shimmering robe once belonged to a long-dead archmage. It is enchanted to protect the wearer from even the most lethal spells."),
    new Item("Sword of Eternal Flame", { type: "attack", value: 13 },
        "A sword engulfed in flames that never die. Its heat burns through armor, flesh, and bone alike, leaving nothing but ash."),
    new Item("Warrior's Spirit", { type: "health", value: 10 },
        "An ethereal glow surrounds this token. Legends say it contains the essence of a long-dead warrior, granting fortitude to those who carry it."),
    new Item("Cursed Blade", { type: "attack", value: 14 },
        "A dark, jagged sword, cursed by the souls of its victims. Its power grows stronger with every drop of blood it spills."),
    new Item("Darksteel Helm", { type: "health", value: 30 },
        "Forged in the heart of a dying star, this helm is imbued with cosmic energy. It protects its wearer from both physical and magical harm."),
    new Item("Demon's Fang", { type: "attack", value: 12 },
        "A fang ripped from the maw of a demon, still pulsating with infernal energy. Wielders of this weapon are feared for their brutal strength."),
    new Item("Elixir of Life", { type: "health", value: 20 },
        "A golden liquid that glows faintly in the dark. Drinking it is said to not only heal the body but extend life itself."),
    new Item("Necromancer's Skull", { type: "attack", value: 11 },
        "The cracked skull of a necromancer, imbued with dark magic. It grants power over death, making the bearer a force to be reckoned with."),
    new Item("Phoenix Ashes", { type: "health", value: 15 },
        "A handful of glowing ashes from a resurrected phoenix. When sprinkled on wounds, they close and heal almost instantly."),
    new Item("Dragon's Claw", { type: "attack", value: 16 },
        "The massive claw of an ancient dragon, sharpened to a deadly point. It can tear through even the thickest armor with ease."),
    new Item("Heart of the Forest", { type: "health", value: 22 },
        "This rare gem pulses with the life force of an entire forest. It restores vitality to anyone who carries it, connecting them to nature's power."),
    new Item("Warhammer of the Giants", { type: "attack", value: 18 },
        "A massive hammer wielded by the giants of old. It is said that one blow can flatten entire armies."),
    new Item("Ring of the Dead", { type: "health", value: 12 },
        "A silver ring that glows with an eerie light. It is said to have been worn by a lich, granting unnatural resilience to those who wear it."),
    new Item("Shadow Dagger", { type: "attack", value: 9 },
        "A dagger forged in the shadows of the underworld. It moves like a whisper and strikes as if from another dimension."),
    new Item("Sunstone Amulet", { type: "health", value: 14 },
        "An amulet that captures the radiance of the sun. Its warmth fills the wearer with a sense of hope and restores strength."),
    new Item("Vampire's Fang", { type: "attack", value: 10 },
        "A sharp fang once belonging to a vampire lord. When embedded in a weapon, it thirsts for the blood of enemies."),
    new Item("Cloak of the Night", { type: "health", value: 18 },
        "A cloak woven from the very shadows of night. It grants its wearer an almost supernatural ability to evade harm in darkness."),
    new Item("Celestial Blade", { type: "attack", value: 17 },
        "Forged from a meteorite, this sword glows with the light of distant stars. Legends say it was crafted by the gods themselves for a divine warrior."),
    new Item("Vial of Eternal Night", { type: "health", value: 10 },
        "A small glass vial containing the essence of pure darkness. Drinking it strengthens the soul but leaves the body cold as the void."),
    new Item("Pirate's Cutlass", { type: "attack", value: 8 },
        "Once wielded by a notorious pirate captain, this cutlass has seen countless battles. It smells faintly of saltwater and blood."),
    new Item("Timeworn Hourglass", { type: "health", value: 12 },
        "An hourglass filled with silver sand. It is rumored that turning it can slow the flow of time, giving the bearer a second chance."),
    new Item("Viking Warhorn", { type: "attack", value: 9 },
        "A horn carved from the bone of a long-dead beast. When blown, it summons the strength of ancient warriors, ready for battle once more."),
    new Item("Necrotic Orb", { type: "attack", value: 13 },
        "A swirling sphere of dark energy. It radiates with the necrotic essence of death, draining the life from those it touches."),
    new Item("Galactic Relic", { type: "health", value: 22 },
        "A mysterious object found in the depths of space. It hums with unknown energy, believed to heal and enhance those attuned to its alien power."),
    new Item("Stormbreaker Axe", { type: "attack", value: 15 },
        "This heavy axe crackles with the fury of a thousand storms. Each swing calls down thunder and lightning, obliterating all in its path."),
    new Item("Clockwork Heart", { type: "health", value: 14 },
        "An intricate heart made of gears and springs, still beating. It is said to be a creation of a mad inventor, replacing the life force of the user with mechanical precision."),
    new Item("Blade of the Fallen Angel", { type: "attack", value: 18 },
        "This sword was once wielded by an angel cast down from the heavens. Its edge is sharp as a divine judgment, and it whispers of vengeance."),
    new Item("Radiant Talisman", { type: "health", value: 16 },
        "A glowing talisman said to have been blessed by a holy order. Its warmth banishes evil and restores the spirit."),
    new Item("Cursed Coin", { type: "attack", value: 5 },
        "An ancient coin, tarnished and cursed. Those who carry it find fortune in battle, but at what cost to their soul?"),
    new Item("Spirit of the Wolf", { type: "health", value: 18 },
        "This totem pulses with the spirit of a great wolf. Those who wear it gain the ferocity and healing power of nature's greatest predator."),
    new Item("Jester's Mask", { type: "attack", value: 7 },
        "A garish mask that once belonged to a court jester. Its twisted smile hides a deadly power, unsettling opponents and striking fear in their hearts."),
    new Item("Shard of the Black Sun", { type: "attack", value: 11 },
        "A fragment of a dead star, encased in dark crystal. It is cold to the touch, and its mere presence brings an unsettling quiet."),
    new Item("Elderwood Staff", { type: "health", value: 20 },
        "Carved from the ancient trees of a forgotten forest, this staff is imbued with the magic of nature. It can heal wounds and summon life from the earth."),
    new Item("Plague Doctor's Mask", { type: "health", value: 13 },
        "A grim mask worn by healers during times of plague. It grants resistance to illness and helps the wearer breathe in the foulest of places."),
    new Item("Meteor Hammer", { type: "attack", value: 16 },
        "A massive hammer forged from a meteorite. It holds the cosmic power of the stars, and each swing carries the force of a falling comet."),
    new Item("Pirate's Treasure Map", { type: "health", value: 9 },
        "An old, tattered map that leads to a legendary treasure. Following its path grants luck and vitality, as if the gold awaits just beyond the horizon."),
    new Item("Voidwalker's Cloak", { type: "health", value: 19 },
        "A cloak woven from the fabric of the void. Wearing it grants the ability to pass between worlds, making the wearer elusive and hard to kill."),
    new Item("Samurai's Katana", { type: "attack", value: 14 },
        "A finely crafted katana from the era of the samurai. Its blade is sharp enough to cut through steel, and its spirit yearns for honorable combat."),
    new Item("Molten Gauntlet", { type: "attack", value: 12 },
        "A gauntlet forged in the heart of a volcano. It radiates intense heat, scorching enemies with every punch."),
    new Item("Siren's Tear", { type: "health", value: 17 },
        "A glowing blue tear from a siren of the deep sea. Its magical properties can heal even the most grievous wounds, though some say it holds a tragic curse."),
    new Item("Forgotten Crown", { type: "health", value: 21 },
        "Once worn by a king whose name has been lost to time, this crown still bears traces of the ruler's lost kingdom. It protects its wearer as it did its ancient king."),
    new Item("Vampiric Amulet", { type: "attack", value: 10 },
        "A blood-red amulet that hungers for life. It grants its wearer increased strength, but it comes at the cost of feeding on the vitality of others."),
    new Item("Blade of the Red Moon", { type: "attack", value: 13 },
        "A sword forged in the light of a rare red moon. It holds mysterious powers, most potent under a blood-red sky."),

    new Item("Sleeping Bag", { type: "rest" }, "A warm, comfortable sleeping bag. Resting in it can restore a bit of health."),
    new Item("Devil's Dice", { type: "gamble" }, "A set of dice said to be cursed by the devil. Rolling them can bring great fortune or terrible misfortune."),
    new Item("Lesser Ring of Alias", { type: "oneOff",tag: "genderFlip" }, "One of thousands such bootleg copies of the true Rings of Alias, this one will indeed change your appearance, once and permanently."),

    new Item("Ring of Bloodlust", { type: "health", value: 20 }, "A ring that pulses malevolently in your hand.", true, 10, true, "The moment you put on the ring you feel it leech your lifeforce. You lose 20 health, but gain 10 attack."),

    new Item("Blighted Blade", { type: "health", value: 15 },
        "A cursed blade that draws strength from your life force.", true, 12, false,
        "You lose 15 health while wielding the blade, but gain 12 attack power."),

    new Item("Shattered Mirror", { type: "attack", value: 20 },
        "A broken mirror that reflects the darkest parts of your soul.", true, 5, true,
        "You lose 20 attack as your resolve crumbles, but gain 5 health in exchange."),

    new Item("Ring of Vengeance", { type: "health", value: 20 },
        "A ring that channels your pain into rage-fueled strikes.", true, 10, true,
        "You lose 20 health, but gain 10 attack as your anger intensifies."),

    new Item("Cursed Talisman", { type: "health", value: 25 },
        "A talisman that steals your vitality for a fleeting moment of power.", true, 10, true,
        "You lose 25 health but gain 10 attack as the talisman consumes your energy."),

    new Item("Chalice of Despair", { type: "health", value: 30 },
        "A cursed chalice that weakens your body in exchange for strength.", true, 10, true,
        "You lose 30 health, but gain 10 attack as the dark liquid takes hold."),

    new Item("Bloodstained Shield", { type: "health", value: 15 },
        "A shield stained with the blood of its previous owners.", true, 10, true,
        "You lose 15 health as the shields curse weakens you, and only gain 10 attack in return."),

    new Item("Vial of Betrayal", { type: "health", value: 25 },
        "A potion that promises power but strips you of your life.", true, 20, true,
        "You lose 25 health drinking it, and only gain 20 attack from its bitter curse."),

    new Item("Shadow Dagger", { type: "health", value: 10 },
        "A small blade that feels unnaturally cold in your hands.", true, 10, false,
        "You lose 10 health but gain nothing in return—the blade simply saps your strength."),

    new Item("Crimson Helm", { type: "health", value: 20 },
        "A helmet that weighs heavily on your head, draining your vitality.", true, 18, true,
        "You lose 20 health from its burden, but gain 18 attack as rage consumes you."),

    new Item("Helm of Sacrifice", { type: "attack", value: 15 },
        "A heavy helm that leaves you vulnerable, but restores some of your energy.", true, 10, true,
        "You lose 15 attack, but gain 10 health as the helm dulls your senses but heals your wounds."),

    new Item("Radio", { type: "oneOff", tag: "radio" }, "A small, portable radio that crackles to life when turned on."),
    new Item("Torch", { type: "health", value: 5 }, "A wooden torch that casts flickering light in the darkness."),
];

export function getItem(name) {
    return items.find(item => item.name.toLowerCase() === name.toLowerCase());
}

// Check if an item with the given name exists
export function validateItemName(name) {
    return items.some(item => item.name.toLowerCase() === name.toLowerCase());
}


export function getRandomItems(num) {
    const randomItems = [];
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * items.length);
        randomItems.push(items[randomIndex]);
    }
    return randomItems;
}


export function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}