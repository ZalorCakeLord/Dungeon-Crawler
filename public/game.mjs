document.addEventListener('DOMContentLoaded', () => {
    const name = prompt('Enter your name: ');
    const gender = prompt('Enter your gender (M/F): ');
    const species = prompt('Choose your species (Human/Elf/...): ');
    let start = true;

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
                p.innerHTML = message;  // Use innerHTML to correctly render HTML content
                messagesDiv.appendChild(p);
            });
        })
        .catch(error => console.error('Error:', error));

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
            console.log(data);

            if (data.health <= 0) {
                document.getElementById('map').innerHTML = `<h1>Game Over</h1>`;
                document.getElementById('stats').innerText = '';
                document.getElementById('messages').innerHTML = `${data.deathMessage}<br><br><button onclick="location.reload()">Restart</button>`;
                document.getElementById('room').innerHTML = '';
                document.getElementById('enemy').innerHTML = '';
                return;
            }

            // Update game state based on server response
            document.getElementById('map').innerHTML = data.map; // Use innerHTML here
            document.getElementById('stats').innerText = data.stats;
            document.getElementById('messages').innerHTML = data.messages.join('\n');
            document.getElementById('room').innerHTML = `<h3>${data.room.name}</h3>` +
                `<img src="media/images/rooms/${data.room.name}.jfif" alt="${data.room.name}" style="width: 30%; height: auto;">` +
                '<br>' + data.room.description;
            document.getElementById('enemy').innerHTML = data.room.enemy ?
                `<b>${data.room.enemy.name}</b><br>${data.room.enemy.health > 0 ? `${data.room.enemy.description}` : `The corpse of a ${data.room.enemy.name}.`}` : '';
        } catch (error) {
            console.error('Error sending command:', error);
        }
    });
});