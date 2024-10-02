class MessageLog {
    constructor() {
        this.playerMessages = new Map(); // Store messages by playerId
        this.playerList = new Map();
        this.globalMessages = []; // Initialize globalMessages to store global messages
        this.timeStampedMessages = [];
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

    add(message, playerId = null, type = 'default', time = false, expireAfterSeconds = null) {
        let formattedMessage;
        switch (type) {
            case 'error':
                console.error(message);
                break;
            case 'info':
                formattedMessage = `[${type.toUpperCase()}] ${message}<br>`;
                break;
            case 'global':
                formattedMessage = `[GLOBAL] ${message}<br>`;
                this.globalMessages.push(formattedMessage);
                break;
            case 'default':
                formattedMessage = `${message}<br>`;
                break;
            case 'timed':
                formattedMessage = `[TIMED] ${message}<br>`;
                break;
            default:
                formattedMessage = `${message}<br>`;
        }

        if (time) {
            const timestampedMessage = { message: formattedMessage, timestamp: Date.now(), expireAfterSeconds };
            this.timeStampedMessages.push(timestampedMessage);

            // Automatically remove the message after the expiration time
            setTimeout(() => {
                this.timeStampedMessages = this.timeStampedMessages.filter(
                    msg => msg !== timestampedMessage
                );
            }, expireAfterSeconds * 1000);
        }

        if (playerId) {
            if (playerId === "GLOBAL") {
                this.globalMessages.push(formattedMessage);
            } else {
                // Ensure the playerMessages map is initialized for the playerId
                if (!this.playerMessages.has(playerId)) {
                    this.playerMessages.set(playerId, []);
                }
                this.playerMessages.get(playerId).push(formattedMessage);
            }
        }
    }


    getMessages(playerId = null) {
        const now = Date.now();

        // Filter out expired global timestamped messages
        this.timeStampedMessages = this.timeStampedMessages.filter(msg => {
            const elapsed = (now - msg.timestamp) / 1000;
            return elapsed < msg.expireAfterSeconds;
        });

        const timestampedMsgs = this.timeStampedMessages.map(msg => msg.message);

        if (playerId) {
            const playerMsgs = this.playerMessages.get(playerId) || [];
            //only get the messages
            let timestmpd = []
            for (let i = 0; i < timestampedMsgs.length; i++) {
                timestmpd.push(timestampedMsgs[i].message)
            }
            return [...this.globalMessages, ...timestmpd, ...playerMsgs];
        }
        let timestmpd = []
        for (let i = 0; i < timestampedMsgs.length; i++) {
            timestmpd.push(timestampedMsgs[i].message)
        }
        return [...this.globalMessages, ...timestmpd];
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

