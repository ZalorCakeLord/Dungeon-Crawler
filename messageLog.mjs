export class MessageLog {
    constructor() {
        this.messages = [];
        this.enemiesKilled = 0;
        this.deathCause = 'a dungeon collapse!'//default death cause, means something has gone wrong
    }

    add(message) {
        this.messages.push(message);
    }

    getMessages() {
        return this.messages;
    }

    clear() {
        this.messages = [];
    }

    nl() {
        this.add('');
    }
}

export const messageLog = new MessageLog();