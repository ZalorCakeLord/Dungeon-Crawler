export async function intro() {
    console.clear();
    console.log('Welcome to Dungeon Crawler!');
    console.log('You find yourself a poor soul, ensnared within the twisted depths of Zalor\'s dark dungeon.');
    console.log('This is no ordinary prison; it is a labyrinth of horrors crafted by a mad wizard, where every shadow conceals a lurking threat.');
    console.log('Forced into this hellish realm, you must fight your way through countless rooms, each more treacherous than the last, in search of a way out.');
    console.log('Prepare yourself, for every step forward brings you closer to sinister enemies and unimaginable dangers.');
    console.log('Your fate hangs in the balance. Good luck! Press any key to begin your desperate quest for freedom...');    
    //wait for any key to be pressed
    await new Promise(resolve => process.stdin.once('data', resolve));
    console.clear();
}



export function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}