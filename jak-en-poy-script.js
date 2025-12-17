// Declaration of initial variables
let choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

document.getElementById('').addEventListener('click', function () {
    playGame('rock');
});

document.getElementById('paperBtn').addEventListener('click', function () {
    playGame('paper');
});

document.getElementById('scissorsBtn').addEventListener('click', function () {
    playGame('scissors');
});

function playGame(playerChoice) {
    let computerChoice = getRandomChoice();
    displayComputerChoice(computerChoice);

    let result = determineResult(computerChoice, playerChoice);
    displayResult(result);

    updateScore(computerChoice, playerChoice);
    displayScores();

    displayMessage();
}

function getRandomChoice() {
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineResult(computer, player) {
    if (computer === player) {
        return 'It\'s a draw!';
    } else if (
        (computer === 'rock' && player === 'scissors') ||
        (computer === 'paper' && player === 'rock') ||
        (computer === 'scissors' && player === 'paper')
    ) {
        return 'You lose!';
    } else {
        return 'You win!';
    }
}

function updateScore(computer, player) {
    if (computer === player) {
    } else if (
        (computer === 'rock' && player === 'scissors') ||
        (computer === 'paper' && player === 'rock') ||
        (computer === 'scissors' && player === 'paper')
    ) {
        computerScore += 1;
    } else {
        playerScore += 1;
    }
}

function displayComputerChoice(choice) {
    document.getElementById('computer-choice').textContent = `Computer chooses: ${choice}`;
}

function displayResult(result) {
    document.getElementById('result').textContent = result;
}

function displayScores() {
    document.querySelector('.computer-score').textContent = `Computer: ${computerScore}`;
    document.querySelector('.player-score').textContent = `Player: ${playerScore}`;
}

function displayMessage() {
    let totalScore = computerScore + playerScore;
    let computerUp = computerScore - playerScore;
    if (totalScore >= 10 && totalScore % 5 === 0) {
        if (computerUp > 1) {
            document.getElementById('messageBoard').textContent = 'Try harder!';
        } else if (computerUp > 3) {
            document.getElementById('messageBoard').textContent = 'You might want to give up!';
        } else if (totalScore > 5) {
            document.getElementById('messageBoard').textContent = 'Haha! You are being crushed!';
        } else if (totalScore > 9) {
            document.getElementById('messageBoard').textContent = 'This is not even funny!';
        }
    }
}


