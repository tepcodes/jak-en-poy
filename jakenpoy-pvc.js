// alert('Welcome to Jaken Power! The village of Jaken has been distrought by the vicious monster. He is reigning terror among the dwellers. Our people needs a hero to slay this monster once and for and bring lasting peace in our land! You chose to be here but the land chose you!')

class Game {
    constructor() {
        this.userHealthPoints = 50;
        this.monsterHealthPoints = 50;
        this.monsterAction = '';
        this.healCounter = 3;
        this.gameEnded = false;

        this.enableButtons();
        this.addEventListeners();

        // Elements
        this.userHPElement = document.querySelector('#userHP');
        this.monsterHPElement = document.querySelector('#monsterHP');
        this.healButtonElement = document.querySelector('#heal');
        this.gameResultElement = document.querySelector('#gameResult');
        this.gameLogElement = document.querySelector('#gameLog');

        this.playGame();
    }

    addEventListeners() {
        document.getElementById'attack'.addEventListener('click', () => this.getUserAction('Attack'));
        document.getElementById('defend').addEventListener('click', () => this.getUserAction('Defend'));
        document.getElementById('heal').addEventListener('click', () => this.heal());
    }

    getUserAction(action) {
        this.chooseMonsterAction();
        this.calculateDamage(action, this.monsterAction);
    }

    chooseMonsterAction() {
        const actions = ['Attack', 'Attack', 'Attack', 'Attack', 'Attack', 'Defend', 'Defend', 'Defend', 'Heal', 'Heal'];
        const actionIndex = Math.floor(Math.random() * actions.length);
        this.monsterAction = actions[actionIndex];
    }

    calculateDamage(userAction, monsterAction) {
        const userDamage = [5, 8, 10, 10, 10, 12, 12, 12, 15, 15, 15, 20, 20];
        const monsterDamage = [5, 5, 8, 8, 10, 10, 10, 12, 12, 12, 12, 15, 15, 15, 20];

        const userRandomDamage = Math.floor(Math.random() * userDamage.length);
        const monsterRandomDamage = Math.floor(Math.random() * monsterDamage.length);

        let userAttackDamage = userDamage[userRandomDamage];
        let monsterAttackDamage = monsterDamage[monsterRandomDamage];

        const criticalChance = 0.5;

        if (Math.random() < criticalChance) {
            const userBonusDamage = userAttackDamage * 0.50;
            const monsterBonusDamage = monsterAttackDamage * 0.50;

            userAttackDamage += userBonusDamage;
            monsterAttackDamage += monsterBonusDamage;

            console.log("Critical hit!" + userBonusDamage);
            console.log("Critical hit!" + monsterBonusDamage);
        }

        const healAction = 20;
        const userHealBonus = Math.abs(this.userHealthPoints - 50) * 0.2;
        const userHealAction = healAction + userHealBonus;        

        const userDefend = monsterAttackDamage * 0.4;

        let userLog = '';
        let monsterLog = '';

        if (userAction === 'Attack' && monsterAction === 'Attack') {
            this.userHealthPoints -= monsterAttackDamage;
            this.monsterHealthPoints -= userAttackDamage;
            userLog = `deals ${userAttackDamage} damage.`;
            monsterLog = `deals ${monsterAttackDamage} damage.`;
        } else if (userAction === 'Attack' && monsterAction === 'Defend') {
            userLog = `deals 0 damage.`;
            monsterLog = `receives 0 damage.`;
        } else if (userAction === 'Defend' && monsterAction === 'Defend') {
            userLog = `blocks 0 damage.`;
            monsterLog = `receives 0 damage.`;
        } else if (userAction === 'Defend' && monsterAction === 'Attack') {
            this.userHealthPoints += userDefend;
            this.userHealthPoints -= monsterAttackDamage;
            userLog = `blocks ${userDefend} damage.`;
            monsterLog = `deals ${monsterAttackDamage} damage.`;
        } else if (userAction === 'Attack' && monsterAction === 'Heal') {
            this.monsterHealthPoints += healAction;
            this.monsterHealthPoints -= userAttackDamage;
            userLog = `deals ${userAttackDamage} damage.`;
            monsterLog = `heals ${healAction} HP.`;
        } else if (userAction === 'Defend' && monsterAction === 'Heal') {
            this.monsterHealthPoints += healAction;
            userLog = `blocks 0 damage.`;
            monsterLog = `heals ${healAction} HP.`;
        } else if (userAction === 'Heal' && monsterAction === 'Attack') {
            this.userHealthPoints += userHealAction;
            this.userHealthPoints -= monsterAttackDamage;
            userLog = `heals ${userHealAction} HP.`;
            monsterLog = `deals ${monsterAttackDamage} damage.`;
        } else if (userAction === 'Heal' && monsterAction === 'Defend') {
            this.userHealthPoints += userHealAction;
            userLog = `heals ${userHealAction} HP.`;
            monsterLog = `receives 0 damage.`;
        } else if (userAction === 'Heal' && monsterAction === 'Heal') {
            this.userHealthPoints += userHealAction;
            this.monsterHealthPoints += healAction;
            userLog = `heals ${userHealAction} HP.`;
            monsterLog = `heals ${healAction} HP.`;
        }

        this.updateHP();
        this.displayGameLog(userAction, userLog, monsterAction, monsterLog);
        this.checkGameEnd();
    }

    updateHP() {
        this.updateUserHP();
        this.updateMonsterHP();
    }

    updateUserHP() {
        let backgroundColor = '';
    
        if (this.userHealthPoints > 50) {
            backgroundColor = 'purple';
        } else if (this.userHealthPoints > 30) {
            backgroundColor = 'green';
        } else if (this.userHealthPoints > 24) {
            backgroundColor = 'olivedrab';
        } else if (this.userHealthPoints > 10) {
            backgroundColor = 'orange';
        } else if (this.userHealthPoints > 0) {
            backgroundColor = 'goldenrod'
        } else {
            backgroundColor = 'red';
        }
    
        this.userHPElement.textContent = `Your HP: ${this.userHealthPoints.toFixed(2)}`;
        this.userHPElement.style.backgroundColor = backgroundColor;
    }
    
    updateMonsterHP() {
        let backgroundColor = '';
    
        if (this.monsterHealthPoints > 50) {
            backgroundColor = 'purple';
        } else if (this.monsterHealthPoints > 30) {
            backgroundColor = 'green';
        } else if (this.monsterHealthPoints > 24) {
            backgroundColor = 'olivedrab';
        } else if (this.monsterHealthPoints > 10) {
            backgroundColor = 'orange';
        } else if (this.monsterHealthPoints > 0) {
            backgroundColor = 'goldenrod'
        } else {
            backgroundColor = 'red';
        }
    
        this.monsterHPElement.textContent = `Monster HP: ${this.monsterHealthPoints.toFixed(2)}`;
        this.monsterHPElement.style.backgroundColor = backgroundColor;
    }
    

    checkGameEnd() {
        if (!this.gameEnded && (this.userHealthPoints <= 0 || this.monsterHealthPoints <= 0)) {
            this.gameEnded = true;
            this.disableButtons();
            this.displayResults();
            this.endGame();
        }
    }

    disableButtons() {
        document.getElementById('attack').disabled = true;
        document.getElementById('defend').disabled = true;
        document.getElementById('heal').disabled = true;
    }

    displayResults() {
        let resultText = '';
        let backgroundColor = '';
    
        if (this.userHealthPoints > 0) {
            resultText = 'You have fought valiantly and slayed the monster!';
            backgroundColor = 'green';
        } else if (this.userHealthPoints <= 0 && this.monsterHealthPoints <= 0) {
            resultText = "Martyr! You joined the monster to the grave!";
            backgroundColor = 'teal';
        } else if (this.userHealthPoints < 1) {
            resultText = 'Your feeble body did not stand a chance!';
            backgroundColor = 'red';
        }
    
        this.gameResultElement.textContent = `${resultText}`;
        this.gameResultElement.style.backgroundColor = backgroundColor;
    }
    

    endGame() {
        let playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
    
        playAgainButton.style.backgroundColor = '#474440'; // Set the background color
        playAgainButton.style.color = 'ivory';
    
        playAgainButton.addEventListener('click', () => {
            this.gameResultElement.textContent = '';
            this.clearGameLog();
            this.playGame();
        });
    
        this.gameResultElement.appendChild(playAgainButton);
    }
    

    clearGameLog() {
        this.gameLogElement.innerHTML = '';
        this.gameResultElement.style.backgroundColor = '';
    }

    displayGameLog(userAction, userLog, monsterAction, monsterLog) {
        let logEntry = document.createElement('p');
        logEntry.textContent = `The user ${userAction.toLowerCase()}ed, ${userLog} The monster ${monsterAction.toLowerCase()}ed, ${monsterLog}`;
        this.gameLogElement.insertBefore(logEntry, this.gameLogElement.firstChild);

        if (this.gameLogElement.childElementCount > 9) {
            this.gameLogElement.removeChild(this.gameLogElement.lastChild);
        }
    }

    heal() {
        if (this.healCounter > 0) {
            this.getUserAction('Heal');
            this.healCounter--;
            this.healButtonElement.textContent = `Heal (${this.healCounter})`;
        }
    }

    playGame() {
        this.gameEnded = false;
        this.enableButtons();
        this.gameResultElement.textContent = '';
        this.userHealthPoints = 50;
        this.monsterHealthPoints = 50;
        this.healCounter = 3;
        this.healButtonElement.textContent = `Heal (${this.healCounter})`;
        this.updateHP();
        this.chooseMonsterAction();
    }

    enableButtons() {
        document.getElementById('attack').disabled = false;
        document.getElementById('defend').disabled = false;
        document.getElementById('heal').disabled = false;
    }
}

// Create an instance of the Game class to start the game
const game = new Game();
