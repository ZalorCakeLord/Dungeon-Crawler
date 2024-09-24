export async function intro() {
    console.clear();
    console.log('Welcome to Dungeon Crawler!');
    console.log('You are poor soul, thrown into the depths of a dark and dangerous dungeon.');
    console.log('You must fight your way through the infinite rooms, searching for an exit.');
    console.log('You will encounter enemies along the way, so be prepared to fight!');
    console.log('Good luck! Press any key to begin...');
    //wait for any key to be pressed
    await new Promise(resolve => process.stdin.once('data', resolve));
    console.clear();
}



function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}