const rockPick = document.querySelector('.js-rock');
const paperPick = document.querySelector('.js-paper');
const scissorsPick = document.querySelector('.js-scissors');
const resetScoreButton = document.querySelector('.resetScore');
const autoPlayButton = document.querySelector('.autoplay');

rockPick.addEventListener('click',()=>{
    playGame('rock');
})
paperPick.addEventListener('click',()=>{
    playGame('paper');
})
scissorsPick.addEventListener('click',()=>{
    playGame('scissors');
})
resetScoreButton.addEventListener('click',resetScore)
autoPlayButton.addEventListener('click',autoPlay)
const score = JSON.parse(localStorage.getItem('score'))||{
    wins: 0,
    losses: 0,
    ties:0
}
scoreOutput();

let timeoutId;
let isAutoPlaying = false;

function autoPlay(){
    const playerChoice = computerPick();
    if(!isAutoPlaying){
        timeoutId = setInterval(()=>{
            playGame(playerChoice)
        },1000)
        isAutoPlaying = true;
        autoPlayButton.innerHTML = 'Stop playing'
    }
    else if(isAutoPlaying){
        clearInterval(timeoutId);
        isAutoPlaying = false;
        autoPlayButton.innerHTML = 'Auto Play'
    }
}

function playGame(playerChoice){
    let computerMove = computerPick();
    let results = ';'

    if (playerChoice === 'rock'){
        if (computerMove === 'rock'){
            results = "It's a tie";
        }
        else if (computerMove === 'paper'){
            results = "You lose";
        }
        else if (computerMove === 'scissors'){
            results = "You won";
        }
    }
    else if (playerChoice === 'paper'){
        if (computerMove === 'rock'){
            results = "You won";
        }
        else if (computerMove === 'paper'){
            results = "It's a tie";
        }
        else if (computerMove === 'scissors'){
            results = "You lose";
        }
    }
    else if (playerChoice === 'scissors'){
        if (computerMove === 'rock'){
            results = "You lose";
        }
        else if (computerMove === 'paper'){
            results = "You won";
        }
        else if (computerMove === 'scissors'){
            results = "It's a tie";
        }
    }
    document.querySelector('.js-result').innerHTML = results;
    document.querySelector('.js-output').innerHTML = `You <img class="pick" src="${playerChoice}-emoji.png" alt="scissors-emoji"> <img class="pick" src="${computerMove}-emoji.png" alt="paper-emoji"> Computer`;


    if (results === "You lose"){
        score.losses++
    }
    else if (results === "You won"){
        score.wins++
    }
    else if (results === "It's a tie"){
        score.ties++;
    }
    localStorage.setItem('score',JSON.stringify(score))
    scoreOutput()
}
function computerPick(){
    let randomPick = Math.floor(Math.random()*3);
    let computerMove;

    if (randomPick === 0){
        computerMove = 'rock';
    }
    else if (randomPick === 1){
        computerMove = 'paper';
    }
    else if (randomPick === 2){
        computerMove = 'scissors';
    }
    return computerMove;
}

function scoreOutput(){
   document.querySelector('.js-score').innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}
function resetScore(){
    document.querySelector('.exitGame').innerHTML ='Are you sure you want to exit? <button class="yes">Yes</button> <button class="no">No</button>'
    const yesButton = document.querySelector('.yes');
    const noButton = document.querySelector('.no')

    yesButton.addEventListener('click',()=>{
        localStorage.removeItem('score');
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        scoreOutput();
        document.querySelector('.exitGame').innerHTML = '';
    });
    noButton.addEventListener('click',()=>{
        document.querySelector('.exitGame').innerHTML = '';
    })
}

document.addEventListener('keydown',event=>{
    if (event.key === 'r'){
        playGame('rock');
    }
    else if (event.key === 'p'){
        playGame('paper');
    }
    else if (event.key === 's'){
        playGame('scissors')
    }
    else if (event.key === 'a'){
        autoPlay();
    }
    else if (event.key === 'c'){
        resetScore();
    }
    else if (event.key === 'Backspace'){
        resetScore();
    }
})
