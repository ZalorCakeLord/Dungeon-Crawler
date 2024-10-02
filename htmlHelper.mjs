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
