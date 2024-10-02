//need getrandomItems from items.mjs
import {getRandomItems} from "./items.mjs";

class entity {
    constructor(room,name="random", type="decoration"){
        if(name!== "random" && entityList[type][name]){
            this.name = name;
        }
    }
}
//types of entities
//doors - can be opened or closed, lockable
//chests - can be accessed, items can be added or removed, lockable

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







const entityList = {
    containers: {
        //name, lockable, items, gen random items?, how many items?
        chests: [
            //{name: "Treasure Chest", lockable: true, items: []},
            {name: "Wooden Chest", lockable: false, items: [], genRandom:true, itemNum:2, description: "A small wooden chest. It looks like it could be opened.", roomType: "any"},
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
