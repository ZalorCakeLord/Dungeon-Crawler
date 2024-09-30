class MessageLog {
    constructor() {
        this.globalMessages = [];
        this.playerMessages = new Map(); // Store messages by playerId
        this.playerList = new Map();
    }

    addPlayer(playerId, player) {
        console.log(`Adding player ${playerId}`);
        this.playerList.set(playerId, player);
    }

    removePlayer(playerId) {
        console.log(`Removing player ${playerId}`);
        this.playerList.delete(playerId);
    }

    getPlayer(playerId) {
        console.log(`Getting player ${playerId}`);
        return this.playerList.get(playerId);
    }

    add(message, playerId = null, type = 'default') {
        let formattedMessage //= `[${type.toUpperCase()}] ${message}`;
        switch (type) {
            case 'error':
                console.error(message);
                break;
            case 'info':
                formattedMessage = `[${type.toUpperCase()}] ${message}<br>`;
                break;
            case 'default':
                formattedMessage = `${message}<br>`;
                break;
            default:
                formattedMessage = `${message}<br>`;
        }
        if (playerId) {
            if (!this.playerMessages.has(playerId)) {
                this.playerMessages.set(playerId, []);
            }
            this.playerMessages.get(playerId).push(formattedMessage);
        } else {
            this.globalMessages.push(formattedMessage);
        }
    }

    getMessages(playerId = null) {
        if (playerId) {
            return this.playerMessages.get(playerId) || [];
        }
        return this.globalMessages;
    }

    clear(playerId = null) {
        if (playerId) {
            this.playerMessages.set(playerId, []);
        } else {
            this.globalMessages = [];
            this.playerMessages.clear();
        }
    }

    nl(playerId = null) {
        this.add('<br>', playerId);
    }

    // Example method to display player messages limited to the last 10
    displayRecentMessages(playerId) {
        const messages = this.getMessages(playerId);
        return messages.slice(-10); // Return the last 10 messages
    }
}

export const messageLog = new MessageLog();
