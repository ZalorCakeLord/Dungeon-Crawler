document.addEventListener('DOMContentLoaded', () => {
    const name = prompt('Enter your name: ');
    const gender = prompt('Enter your gender (M/F): ');
    const species = prompt('Choose your species (Human/Elf/...): ');
    let start = true
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
    

    document.getElementById('send').addEventListener('click', () => {
        const command = document.getElementById('command').value;
        // Send command to the server and handle response
        fetch('/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Update game state based on server response
            document.getElementById('map').innerHTML = data.map; // Use innerHTML here
            document.getElementById('stats').innerText = data.stats;
            document.getElementById('messages').innerHTML = data.messages.join('\n');
            document.getElementById('room').innerHTML = `<h3>${data.room.name}</h3>`+'<br>'+data.room.description;
            
            document.getElementById('enemy').innerHTML = data.room.enemy?`<b>${data.room.enemy.name}</b><br>${data.room.enemy.isDead()?`The corpse of a ${data.room.enemy.name}.`:`${data.room.description}`}`:'';
        });
    });
});