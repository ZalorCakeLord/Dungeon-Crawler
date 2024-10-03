document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Establish a WebSocket connection

    const name = prompt('Enter your name: ');
    const gender = prompt('Enter your gender (M/F): ');
    const species = prompt('Choose your species (Human/Elf/...): ');
    let player = {}
    const messagesHist = [];
    let timestamp = Date.now();
    // Send player introduction data to the server
    socket.emit('intro', { name, gender, species });
    window.infoEmit = infoEmit;
    // Handle the server's response to the introduction
    socket.on('init', (messages) => {
        const messagesDiv = document.getElementById('messages');
        messages.forEach(message => {
            const p = document.createElement('p');
            p.innerHTML = message;
            messagesDiv.appendChild(p);
        });
    });

    // Function to send commands to the server
    function sendCommand(command) {
        timestamp = Date.now();
        socket.emit('command', command);
    }



    // Event listener for pressing the Enter key
    document.getElementById('command').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = event.target.value;
            sendCommand(command); // Call the function to send the command
            event.target.value = ''; // Clear the input field
        }
    });

    // Event listener for button click
    document.getElementById('send').addEventListener('click', () => {
        const command = document.getElementById('command').value;
        sendCommand(command); // Call the function to send the command
        document.getElementById('command').value = ''; // Clear the input field
    });

    function infoEmit(info){
        //{subject, data}
        console.log('misc',info);
        socket.emit('misc', {...info, playerId: player.id});
    }

    // Handle errors from the server
    socket.on('error', (error) => {
        console.error('Error:', error);
    });

    socket.on('gameState', (data) => {
        let responseTime = Date.now();
        let ping = responseTime - timestamp;
        console.log(`Ping: ${ping}ms`);
        if (data.health <= 0) {
            // Transmit that this player is dead
            socket.emit('dead', data.playerId);

            document.getElementById('map').innerHTML = `<h1>Game Over</h1>`;
            document.getElementById('stats').innerText = '';
            document.getElementById('messages').innerHTML = `${data.deathMessage}<br><br><button onclick="location.reload()">Restart</button>`;
            document.getElementById('room').innerHTML = '';
            document.getElementById('enemy').innerHTML = '';
            return;
        }

        // Update game state based on server response
        let nameEdit = ''



        document.getElementById('map').innerHTML = data.map;
        document.getElementById('stats').innerText = data.stats;
        document.getElementById('messages').innerHTML = data.messages.join('\n');
        document.getElementById('room').innerHTML =
            `<h3 style="color: ${data.room.impassable ? 'red' : 'inherit'};">${`${data.room.name}` == `undefined` ? 'Dungeon Chamber' : data.room.name}</h3>` +
            `<img src="media/images/rooms/${data.room.name}.jfif" alt="${data.room.name}" style="width: 30%; height: auto;">` +
            '<br>' + data.room.description;
        document.getElementById('enemy').innerHTML = data.room.enemy ?
            `<b>${data.room.enemy.name}</b><br>${data.room.enemy.health > 0 ? `Health: ${data.room.enemy.health}  Attack Power: ${data.room.enemy.attackPower}<br>${data.enemyDesc ? data.enemyDesc : data.room.enemy.description}` : `The corpse of a ${data.room.enemy.name}.`}` : '';
        if (data.room.players > 1) {
            document.getElementById('players').innerHTML = `There are ${data.room.players - 1} other players in this room.`;
        } else {
            document.getElementById('players').innerHTML = '';
        }
        player = data.player
        messagesHist.push(...data.messages);
    })



    socket.on('update', (data) => {
        console.log('Received update:', data);
        const receiveTime = Date.now(); // Get the current time when the response is received

        document.getElementById('map').innerHTML = data.map;
        console.log(data.messages);

        if (data.messages.length > 0) {
            // Filter messages not in history
            let newMessage = data.messages.filter(message => !messagesHist.includes(message));

            // Add new messages to history
            messagesHist.push(...newMessage);

            // Check if there are new messages to display
            if (newMessage.length > 0 && newMessage[0] !== '') {
                document.getElementById('messages').innerHTML += newMessage.join('<br>');
            }
        }


        // Reset the failure count on successful response
        // failureCount = 0;
    });

    // Periodic update every 5 seconds for updating the map only
    /*function updateMap() {
        const sendTime = Date.now(); // Get the current time in milliseconds
        fetch('/map', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const receiveTime = Date.now(); // Get the current time when the response is received
                const timeDiff = receiveTime - sendTime; // Calculate the ping in milliseconds

                document.getElementById('map').innerHTML = data.map;
                console.log(data.messages, `ping: ${timeDiff}ms`);

                let newMessage = data.messages.filter(message => !messagesHist.includes(message));
                messagesHist.push(...newMessage);
                document.getElementById('messages').innerHTML += newMessage.join('<br>');

                // Reset the failure count on successful response
                failureCount = 0;
            })
            .catch(error => {
                console.error('Error updating map:', error);
                failureCount++;

                if (failureCount >= maxFailures) {
                    clearInterval(mapUpdateInterval); // Stop the updates
                    document.getElementById('messages').innerHTML += `<br><span style="color:red;">Failed to connect to the server. Please refresh, or try again later.</span>`;
                }
            });
    }

    // Declare the interval variable but don't start it yet
    let mapUpdateInterval;

    // Set a max failure limit
    let failureCount = 0;
    const maxFailures = 3; // Adjust as necessary

    // Function to start the map update interval
    function startMapUpdate() {
        mapUpdateInterval = setInterval(updateMap, 5000);
    }

    // Function to stop the map update interval if needed
    function stopMapUpdate() {
        clearInterval(mapUpdateInterval);
    }

    // Start the map update interval
    startMapUpdate();*/
});