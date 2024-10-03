//need getrandomItems from items.mjs
import {getRandomItems} from "./items.mjs";

class entity {
    constructor(room,name="random", type="decoration"){
        //either random or a specific name. if random, type is not needed.
    }
}
//types of entities
//containers - chests, cabinets, etc.   have inventories. can be locked.
//interactables - doors, levers, etc.  can be triggered. cause changes in the room.
//decoration - statues, paintings, etc.  no special properties. just for looks.

//potential properties for all entities
//name, description, walkable



export class container extends entity {
    constructor(name, room){
        super(name, room);
        this.inventory = [];
    }
}

export class interactable extends entity {
    constructor(name, room){
        super(name, room);
        this.triggered = false;
    }
}

export class decoration extends entity {
    constructor(name, room){
        super(name, room);
    }
}

export class door extends interactable {
    constructor(name, room, entity){
        super(name, room);
        this.locked = false;
        this.open = false;
        this.image = entity.image || "404"
    }
    openClose(){}
}







const entityList = {
    containers: {
        //name, lockable, items, gen random items?, how many items?
        //chests, cabinets, desks, barrels, etc.
        chests: [
            //{name: "Treasure Chest", lockable: true, items: []},
            {name: "Wooden Chest", lockable: false, items: [], genRandom:true, itemNum:2, description: "A small wooden chest. It looks like it could be opened.", roomType: "any",image:'woodenChest'},
        ],
        cabinets: [
           //{name: "Ancient Cabinet", lockable: true, items: []}
        ]
    },
    interactables: {
        doors: [
            //{name: "Wooden Door", lockable: true, status: "closed"},
            //{name: "Iron Door", lockable: true, status: "closed"}
        ],
        levers: [
            //{name: "Stone Lever", triggered: false}
        ]
    },
    decorations: {
        statues: [
            //{name: "Stone Statue"},
            //{name: "Golden Idol"}
        ],
        paintings: [
            //{name: "Portrait of the Fallen King"},
            //{name: "Abstract Landscape"}
        ]
    }
};

const getRandomEntity = (type = keys[Math.floor(Math.random()*keys.length)], room) => {
    if(!entityList[type]){
        // pick a random type
        let keys = Object.keys(entityList);
        type = keys[Math.floor(Math.random()*keys.length)];
    }
    let entity = entityList[type][Math.floor(Math.random()*entityList[type].length)];
    return new entity(entity.name, room);
}


const getRandomEntityByRoomType = (roomType, type = keys[Math.floor(Math.random()*keys.length)], room) => {
    if(!entityList[type]){
        // pick a random type
        let keys = Object.keys(entityList);
        type = keys[Math.floor(Math.random()*keys.length)];
    }
    let entity = entityList[type].find(e => e.roomType === roomType);
    return new entity(entity.name, room);
}