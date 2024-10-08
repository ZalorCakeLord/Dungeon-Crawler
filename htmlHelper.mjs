export function grabButton(itemName, str) {
    return `<button class="button-62" onclick="document.getElementById('command').value = 'grab ${itemName.replace(/'/g, "\\'")}'; document.getElementById('send').click();">
    ${str.replace(/'/g, "\'")}
</button>`;
}

export function inspectButton(itemName) {
    return `<button class="button-62" onclick="document.getElementById('command').value = 'inspect ${itemName.replace(/'/g, "\\'")}'; document.getElementById('send').click();">
    ${itemName.replace(/'/g, "\'")}
</button>`;
}

export function attackButton(enemyName, str) {
    return `<button class="button-62" onclick="document.getElementById('command').value = 'attack ${enemyName.replace(/'/g, "\\'")}'; document.getElementById('send').click();">
    ${str.replace(/'/g, "\'")}
</button>`;
}

export function readButton(itemName) {
    return `<button class="button-62" onclick="document.getElementById('command').value = 'read ${itemName.replace(/'/g, "\\'")}'; document.getElementById('send').click();">
    Read Excerpt
</button>`;
}

export function interactButton(itemName, str="interact") {
    return `<button class="button-62" onclick="document.getElementById('command').value = 'interact ${itemName.replace(/'/g, "\\'")}'; document.getElementById('send').click();">
    ${str.replace(/'/g, "\'")}
</button>`;
}