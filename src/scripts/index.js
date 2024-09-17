const loading = document.querySelector('.loading')
const startGame = document.querySelector('.start-game')
const gamePhase = document.querySelector('.game-phase')
const gameOver = document.querySelector('.game-over')
const gameNotif = document.querySelector('.game-notif')
const scrBoard = document.querySelector('.score-board')
const mainBg = document.querySelector('.main-bg')
// const pauseButton = document.querySelector('.pause')
const timerShow = document.querySelector('.timer-show')
const introDur = 0;


document.querySelector('.start-button').addEventListener('click',()=>{
    initGame();
})


const initWordsGoal = () =>{
    const wordBase = removeSpace(words)
    for(var i = 0;i<words.length;i++){
        var newLetterGoal = document.createElement('h5')
        newLetterGoal.innerText = words[i]
        newLetterGoal.className = 'goal-letters'
        newLetterGoal.setAttribute('obtained',false);
        gameNotif.appendChild(newLetterGoal);
    }
}

const initGame = () =>{
    initWordsGoal(); //goal letters
    crtLineMake() // design
    startTimerFunc();
    checkPowerUp();
    document.querySelector('#bg-music').play()
    mainBg.classList.add('game')
    powerUpShow.style.display = 'block'
    startGame.style.display = 'none'
    scrBoard.style.display = 'block'
    // pauseButton.style.display = 'block'
    timerShow.style.display = 'block'
    //play some intro
    isGameStart = true;
    checkGameStart();
    const g = setTimeout(()=>{
        gamePhase.style.display = 'block'
    },introDur)//intro duration
}

if(isGameStart){ // debug process comment this after
    initGame();
}

