// Global variables to store health points
let userHealthPoints = 50;
let monsterHealthPoints = 50;
let monsterAction = '';

// Function to choose a random action for the monster
function chooseMonsterAction() {
    let actions = ['Attack', 'Defend', 'Heal'];
    let actionIndex = Math.floor(Math.random() * actions.length);
    monsterAction = actions[actionIndex];
}

// Function to get user action based on the clicked button
function getUserAction(action) {
    calculateDamage(action, monsterAction);
}

// Function to get a random monster action and play the game
function playGame() {
    // Randomize monster action for each iteration
    chooseMonsterAction();
}
    // Event listeners for user actions (assuming buttons with ids 'attack', 'defend', 'heal')
    document.getElementById('attack').addEventListener('click', function () {
        getUserAction('Attack');
    });

    document.getElementById('defend').addEventListener('click', function () {
        getUserAction('Defend');
    });

    document.getElementById('heal').addEventListener('click', function () {
        getUserAction('Heal');
    });


// Call playGame() to start the initial game
playGame();

// Function to calculate damage and update health points
function calculateDamage(userAction, monsterAction) {
    const attackAction = 5;
    const healAction = 10;
    chooseMonsterAction();

    if (userAction === 'Attack' && monsterAction === 'Attack') {
        userHealthPoints -= attackAction;
        monsterHealthPoints -= attackAction;
        updateHP();
        displayGameLog(userAction, monsterAction);
    } else if (
        userAction === 'Attack' && monsterAction === 'Defend' ||
        userAction === 'Defend' && monsterAction === 'Defend' ||
        userAction === 'Defend' && monsterAction === 'Attack'
    ) {
        // No change in health points
        updateHP();
        displayGameLog(userAction, monsterAction);
    } else if (userAction === 'Attack' && monsterAction === 'Heal') {
        monsterHealthPoints += healAction;
        monsterHealthPoints -= attackAction;
        updateHP();
        displayGameLog(userAction, monsterAction);
    } else if (userAction === 'Defend' && monsterAction === 'Heal') {
        monsterHealthPoints += healAction;
        updateHP();
        displayGameLog(userAction, monsterAction);
    } else if (userAction === 'Heal' && monsterAction === 'Attack') {
        userHealthPoints += healAction;
        userHealthPoints -= attackAction;
        updateHP();
        displayGameLog(userAction, monsterAction);
    } else if (userAction === 'Heal' && monsterAction === 'Defend') {
        userHealthPoints += healAction;
        updateHP();
        displayGameLog(userAction, monsterAction);
    } else if (userAction === 'Heal' && monsterAction === 'Heal') {
        userHealthPoints += healAction;
        monsterHealthPoints += healAction;
        updateHP();
        displayGameLog(userAction, monsterAction);
    }
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
        document.querySelector('#gameResult').textContent = `Game Over! Restarting...`;
        playGame(); // Restart the game
    }
}

// Function to display game log with the latest entry at the top
function displayGameLog(userAction, monsterAction) {
    let gameLogElement = document.getElementById('gameLog');
    let logEntry = document.createElement('p');
    logEntry.textContent = `The user ${userAction.toLowerCase()}ed. The monster ${monsterAction.toLowerCase()}ed.`;
    gameLogElement.insertBefore(logEntry, gameLogElement.firstChild);
    
    // Limit the number of paragraphs to a maximum of 10
    if (gameLogElement.childElementCount > 10) {
        gameLogElement.removeChild(gameLogElement.lastChild);
    }
}
