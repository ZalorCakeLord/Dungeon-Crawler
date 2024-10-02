document.addEventListener('DOMContentLoaded', () => {
    const name = prompt('Enter your name: ');
    const gender = prompt('Enter your gender (M/F): ');
    const species = prompt('Choose your species (Human/Elf/...): ');
    const messagesHist = []
    fetch('/intro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gender, species })
    })
        .then(response => response.json())
        .then(messages => {
            const messagesDiv = document.getElementById('messages');
            messages.forEach(message => {
                const p = document.createElement('p');
                p.innerHTML = message;
                messagesDiv.appendChild(p);
            });
        })
        .catch(error => console.error('Error:', error));

    // Periodic update every 5 seconds
    //setInterval(periodicUpdate, 5000);
    // Periodic update every 5 seconds for updating the map only

    function updateMap() {
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

    // Expose the functions to the global window object
    window.gameFunctions = {
        updateMap,
        startMapUpdate,
        stopMapUpdate
    };

    // Send command event listener
    document.getElementById('send').addEventListener('click', async () => {
        const command = document.getElementById('command').value;
        try {
            const response = await fetch('/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ command })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();

            if (data.health <= 0) {
                // Transmit that this player is dead
                fetch('/dead', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ playerId: data.id })
                });

                document.getElementById('map').innerHTML = `<h1>Game Over</h1>`;
                document.getElementById('stats').innerText = '';
                document.getElementById('messages').innerHTML = `${data.deathMessage}<br><br><button onclick="location.reload()">Restart</button>`;
                document.getElementById('room').innerHTML = '';
                document.getElementById('enemy').innerHTML = '';
                return;
            }

            // Update game state based on server response
            document.getElementById('map').innerHTML = data.map;
            document.getElementById('stats').innerText = data.stats;
            document.getElementById('messages').innerHTML = data.messages.join('\n');
            document.getElementById('room').innerHTML = `<h3>${`${data.room.name}` == `undefined` ? 'Dungeon Chamber' : data.room.name}</h3>` +
                `<img src="media/images/rooms/${data.room.name}.jfif" alt="${data.room.name}" style="width: 30%; height: auto;">` +
                '<br>' + data.room.description;
            document.getElementById('enemy').innerHTML = data.room.enemy ?
                `<b>${data.room.enemy.name}</b><br>${data.room.enemy.health > 0 ? `${data.room.enemy.description}` : `The corpse of a ${data.room.enemy.name}.`}` : '';
            if (data.room.players > 1) {
                document.getElementById('players').innerHTML = `There are ${data.room.players - 1} other players in this room.`;
            } else {
                document.getElementById('players').innerHTML = '';
            }
            messagesHist.push(...data.messages);
        } catch (error) {
            console.error('Error sending command:', error);
        }
    });


    // Function to add ripple effect to existing buttons
    function addRippleEffectToButtons(buttons) {
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const ANIMATION_SPEED = 1000;

                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;

                const ripple = document.createElement('div');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, ANIMATION_SPEED);
            });
        });
    }

    // Initially apply ripple effect to buttons on page load
    const existingButtons = document.querySelectorAll('.ripple-effect');
    addRippleEffectToButtons(existingButtons);

    // Use event delegation for dynamically created buttons
    const buttonContainer = document.getElementById('messages');

    buttonContainer.addEventListener('click', (e) => {
        // Check if the clicked element is a button with the ripple-effect class
        if (e.target.classList.contains('ripple-effect')) {
            const ANIMATION_SPEED = 1000;

            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            const ripple = document.createElement('div');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            e.target.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, ANIMATION_SPEED);
        }
    });



});
