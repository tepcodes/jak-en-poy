//declaration of inital variables
let choices = ['rock' , 'paper' , 'scissors'];
let anotherRound = true;

//looping the game
while (anotherRound) {
    let randomChoice = Math.floor(Math.random() * choices.length)
    let computerChoice = choices[randomChoice];
    let playerChoice = prompt('rock, paper, scissors?');

    function determineResult (computer, player) {
        if (computer === player) {
            return('Draw!');
        } else if (
            (computer === 'rock' && player === 'scissors') ||
            (computer === 'paper' && player === 'rock') ||
            (computer === 'scissors' && player === 'paper')
        ) {
            return('You lose!');
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return('You win!');
        } else {
            return ('Invalid choice. Choose again.')
        }
    }

    function round () {
        let result = determineResult(computerChoice,playerChoice);
        alert(result);
    };

    round();

    anotherRound=confirm('Another round!');
}