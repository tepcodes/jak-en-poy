// Global variables to store health points
let userHealthPoints = 50;
let monsterHealthPoints = 50;
let monsterAction = '';
let healCounter = 3;

// Event listeners for user actions (assuming buttons with ids 'attack', 'defend', 'heal')
document.getElementById('attack').addEventListener('click', function () {
    getUserAction('Attack');
});

document.getElementById('defend').addEventListener('click', function () {
    getUserAction('Defend');
});

document.getElementById('heal').addEventListener('click', function () {
    if (healCounter > 0) {
        getUserAction('Heal');
        healCounter--;
        document.querySelector('#heal').textContent = `Heal (${healCounter})`;
    }
});

// Function to get user action based on the clicked button
function getUserAction(action) {
    chooseMonsterAction();
    calculateDamage(action, monsterAction);
}

// Function to choose a random action for the monster
function chooseMonsterAction() {
    let actions = ['Attack', 'Attack', 'Attack', 'Attack', 'Defend', 'Defend', 'Defend', 'Defend', 'Heal', 'Heal'];
    let actionIndex = Math.floor(Math.random() * actions.length);
    monsterAction = actions[actionIndex];
}

// Function to calculate damage and update health points
function calculateDamage(userAction, monsterAction) {
    const userDamage = [5, 5, 5, 5, 5, 15, 10, 10, 10, 15];
    const monsterDamage = [5, 5, 5, 5, 10, 10, 10, 20, 15, 15];
    
    // Random damage for both user and monster
    let userRandomDamage = Math.floor(Math.random() * userDamage.length);
    let monsterRandomDamage = Math.floor(Math.random() * monsterDamage.length);

    let userAttackDamage = userDamage[userRandomDamage];
    let monsterAttackDamage = monsterDamage[monsterRandomDamage];

    const criticalChance = 0.5;

    if (Math.random() < criticalChance) {
        const userBonusDamage = userAttackDamage * 0.50;
        const monsterBonusDamage = monsterAttackDamage * 0.50;

        userAttackDamage += userBonusDamage;
        monsterAttackDamage += monsterBonusDamage;

        console.log('Critical Hit!'); // You can modify this to display a message or take other actions for a critical hit.
    }

    const healAction = 20;

    let userLog = '';
    let monsterLog = '';

    if (userAction === 'Attack' && monsterAction === 'Attack') {
        userHealthPoints -= monsterAttackDamage;
        monsterHealthPoints -= userAttackDamage;
        userLog = `deals ${userAttackDamage} damage.`;
        monsterLog = `deals ${monsterAttackDamage} damage.`;
    } else if (
        userAction === 'Attack' && monsterAction === 'Defend' ||
        userAction === 'Defend' && monsterAction === 'Defend' ||
        userAction === 'Defend' && monsterAction === 'Attack'
    ) {
        userLog = `deals 0 damage.`;
        monsterLog = `receives 0 damage.`;
    } else if (userAction === 'Attack' && monsterAction === 'Heal') {
        monsterHealthPoints += healAction;
        monsterHealthPoints -= userAttackDamage;
        userLog = `deals ${userAttackDamage} damage.`;
        monsterLog = `heals ${healAction} HP.`;
    } else if (userAction === 'Defend' && monsterAction === 'Heal') {
        monsterHealthPoints += healAction;
        userLog = `receives 0 damage.`;
        monsterLog = `heals ${healAction} HP.`;
    } else if (userAction === 'Heal' && monsterAction === 'Attack') {
        userHealthPoints += healAction;
        userHealthPoints -= monsterAttackDamage;
        userLog = `heals ${healAction} HP.`;
        monsterLog = `deals ${monsterAttackDamage} damage.`;
    } else if (userAction === 'Heal' && monsterAction === 'Defend') {
        userHealthPoints += healAction;
        userLog = `heals ${healAction} HP.`;
        monsterLog = `receives 0 damage.`;
    } else if (userAction === 'Heal' && monsterAction === 'Heal') {
        userHealthPoints += healAction;
        monsterHealthPoints += healAction;
        userLog = `heals ${healAction} HP.`;
        monsterLog = `heals ${healAction} HP.`;
    }

    updateHP();
    displayGameLog(userAction, userLog, monsterAction, monsterLog);
}


// Function to update health points on the UI
function updateHP() {
    updateUserHP();
    updateMonsterHP();
    checkGameEnd(); // Check if the game should end after updating health points
}

function updateUserHP() {
    document.querySelector('#userHP').textContent = `Your HP: ${userHealthPoints}`;
}

function updateMonsterHP() {
    document.querySelector('#monsterHP').textContent = `Monster HP: ${monsterHealthPoints}`;
}

// Function to check game end conditions and restart the game if needed
function checkGameEnd() {
    if (userHealthPoints <= 0 || monsterHealthPoints <= 0) {
        userHealthPoints = 50;
        monsterHealthPoints = 50;
        healCounter = 3;
        document.querySelector('#gameResult').textContent = `Game Over! Restarting...`;
        playGame(); // Restart the game
    }
}

// Function to display game log with the latest entry at the top
function displayGameLog(userAction, userLog, monsterAction, monsterLog) {
    let gameLogElement = document.getElementById('gameLog');
    let logEntry = document.createElement('p');
    logEntry.textContent = `The user ${userAction.toLowerCase()}ed, ${userLog} The monster ${monsterAction.toLowerCase()}ed, ${monsterLog}`;
    gameLogElement.insertBefore(logEntry, gameLogElement.firstChild);

    // Limit the number of paragraphs to a maximum of 10
    if (gameLogElement.childElementCount > 10) {
        gameLogElement.removeChild(gameLogElement.lastChild);
    }
}

// Call playGame() to start the initial game
playGame();
