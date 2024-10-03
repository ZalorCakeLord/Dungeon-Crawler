//buildin this feature from the bottom up


//in this file we are making a map so that the player actually moves around inside of rooms
class tile {
    constructor({x,y,room,edge = false, attach}){
        //if edge is true, this tile is on the edge of the room. Attach designates whether it connects to another room, and which tile it connects to
        //if attach is not defined, it is assumed that the tile is not connected to another room
        //if attach is defined, it is an object with the following properties: attached, room, x, y
        this.x = x;
        this.y = y;
        this.roomType = room.roomType;
        this.items = [];
        this.creatures = [];
        this.players = [];
        this.entities = []; //anything that can be interacted with that is not a player or creature
        //this includes doors, chests, etc. 
    }
}



export class roomMap {
    constructor({ name, description, startMessage, impassable, contents , roomType},size) {
        //add everything in description to this
        this.rooms = [];
        this.currentRoom = 0;
        this.name = name;
        this.description = description;
        this.startMessage = startMessage;
        this.impassable = impassable;
        this.contents = contents;
        this.roomType = roomType;
        //possible sizes are small, medium, large, huge, and endless
        //small is 5x5, medium is 10x10, large is 20x20, huge is 50x50, endless will be procedurally generated
        //until generation is implemented, endless will be 100x100
        switch(size){
            case "small":
                this.size = 5;
                break;
            case "medium":
                this.size = 10;
                break;
            case "large":
                this.size = 20;
                break;
            case "huge":
                this.size = 50;
                break;
            case "endless":
                this.size = 100;
                break;
            default:
                this.size = 10;
        }

        if(!roomType){
            this.roomType = "default";
        }
        this.size = size;
        this.roomMap = this.generateRoomMap(size, room);
        
        
    }


    generateRoomMapBounded(size, room){
        //this will be used to generate room maps that are not endless
        //a room map will be a 2d array of tiles

        //this is a single room, as a reminder.
        //tiles on the edge of the room will have edge set to true.

        const roomMap = [];
        for(let i = 0; i < size; i++){
            roomMap.push([]);
            for(let j = 0; j < size; j++){
                roomMap[i].push(new tile({x:i,y:j,room:room}));
            }
        }
    }




    defaultRoom(){

    }

    
}