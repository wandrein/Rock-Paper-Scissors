const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    tie: 0
};

updatedScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-rock-button').addEventListener('click', () => { playGame('rock') })
document.querySelector('.js-paper-button').addEventListener('click', () => { playGame('paper') })
document.querySelector('.js-scissors-button').addEventListener('click', () => { playGame('scissors') })

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock')

    } else if (event.key === 'p') {
        playGame('paper')

    } else if (event.key === 's') {
        playGame('scissors')

    } else if (event.key === 'a') {
        autoPlay()

    }
})

document.querySelector('.js-auto-play').addEventListener('click', () => { autoPlay() })

function autoPlay() {

    const button = document.getElementById('autoPlyBttn');

    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove)
        }, 1000)
        isAutoPlaying = true;
        button.innerHTML = 'Stop Auto Play';

    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        button.innerHTML ='Auto Play';
    }

};

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {

        if (computerMove === 'rock') {
            result = 'you lost';

        } else if (computerMove === 'paper') {
            result = 'you win';

        } else if (computerMove === 'scissors') {
            result = 'tie';
        }

    }


    else if (playerMove === 'paper') {

        if (computerMove === 'rock') {
            result = 'you win';

        } else if (computerMove === 'paper') {
            result = 'tie';

        } else if (computerMove === 'scissors') {
            result = 'you lost';
        }

    }


    else if (playerMove === 'rock') {

        if (computerMove === 'rock') {
            result = 'tie';

        } else if (computerMove === 'paper') {
            result = 'you lost';

        } else if (computerMove === 'scissors') {
            result = 'you win';
        }
    }

    if (result === 'you win') {
        score.wins += 1;
    } else if (result === 'you lost') {
        score.loses += 1;
    } else if (result === 'tie') {
        score.tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score)); // localstorage only supports strings, json changes everything into string
    updatedScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images-rpc/${playerMove}-emoji.png" class="move-icon"> <img src="images-rpc/${computerMove}-emoji.png" class="move-icon"> computer`;

}
function updatedScoreElement() {
    document.querySelector('.js-score').innerHTML = `
wins:${score.wins}, loses:${score.loses}, tie:${score.tie}`;
};

document.querySelector('.js-reset-button').addEventListener('click', () => {
    showResetConfirmation();
});

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML = `
    <div class="ensurer" >are you sure?</div>
    <div class="ensurer"><buton class="js-reset-confirm-yes reset-confirm-button" >Yes</buton>
    <buton class="js-reset-confirm-no reset-confirm-button" >No</buton></div>`;
    document.querySelector('.js-reset-confirm-yes').addEventListener('click',
        () => {resetScore();
               hideResetConfirmation();
        });

    document.querySelector('.js-reset-confirm-no').addEventListener('click',
        () => {hideResetConfirmation();
})};

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';

    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';

    } else if (randomNumber >= 2 / 3 && randomNumber < 1) { computerMove = 'scissors'; }

    return computerMove;
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation').innerHTML ='';
}

function resetScore () {
    score.wins = 0;
    score.loses = 0;
    score.tie = 0;
    localStorage.removeItem('score');
    updatedScoreElement();
}