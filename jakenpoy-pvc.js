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
        document.getElementById('attack').addEventListener('click', () => this.getUserAction('Attack'));
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
        this.userHPElement.textContent = `Your HP: ${this.userHealthPoints}`;
    }

    updateMonsterHP() {
        this.monsterHPElement.textContent = `Monster HP: ${this.monsterHealthPoints}`;
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
        if (this.userHealthPoints > this.monsterHealthPoints) {
            resultText = 'You have fought valiantly and slayed the monster!';
        } else if (this.userHealthPoints < this.monsterHealthPoints) {
            resultText = 'Your feeble body did not stand a chance!';
        } else if (this.userHealthPoints <= 0 || this.monsterHealthPoints <= 0){
            resultText = "Martyr! You joined the monster to the grave!";
        }
        this.gameResultElement.textContent = `${resultText}`;
    }

    endGame() {
        let playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';

        playAgainButton.addEventListener('click', () => {
            this.gameResultElement.textContent = '';
            this.clearGameLog();
            this.playGame();
        });

        this.gameResultElement.appendChild(playAgainButton);
    }

    clearGameLog() {
        this.gameLogElement.innerHTML = '';
    }

    displayGameLog(userAction, userLog, monsterAction, monsterLog) {
        let logEntry = document.createElement('p');
        logEntry.textContent = `The user ${userAction.toLowerCase()}ed, ${userLog} The monster ${monsterAction.toLowerCase()}ed, ${monsterLog}`;
        this.gameLogElement.insertBefore(logEntry, this.gameLogElement.firstChild);

        if (this.gameLogElement.childElementCount > 10) {
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
