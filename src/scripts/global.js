var isGameStart = false;
var mainCharBase = document.querySelector('.main-char')
var score = 0;
var isGameOver = false;
const defaultVelo = 8
var playerEndTime = 0
var pWidthHeight = 50


const gameContainer = document.querySelector('.game-container');
var gamePhase = document.querySelector('.game-phase')
//controls for main character, used for collision in spawning
const words = "I LOVE NEGROS ORIENTAL STATE UNIVERSITY";
const removeSpace = (w) =>{
    var noSpace = ''
    for(let i = 0;i<w.length;i++){
        if(w[i]!=" "){
            noSpace+=w[i]
        }
    }

    return noSpace;
}
const updateScore = () => {
    document.querySelector('.score').innerText = score;
}

const updateLet = (letter) =>{
var allLettersGoal = document.querySelectorAll('.goal-letters')
    for(let i = 0;i<allLettersGoal.length;i++){
    var obtainedAtt = allLettersGoal[i].getAttribute('obtained')
        if(allLettersGoal[i].innerText == letter && obtainedAtt == "false"){
         allLettersGoal[i].setAttribute('obtained',true)
         allLettersGoal[i].style.color = 'blue'
         checkObtained();
            return
        }
    }
   
}

const checkObtained = () =>{
var obtained = 0;
var noSpaceBaseObtained = removeSpace(words)
var allLettersGoal = document.querySelectorAll('.goal-letters')
    for(let i = 0;i<allLettersGoal.length;i++){
        var obtainedAtt = allLettersGoal[i].getAttribute('obtained')
        if(obtainedAtt == 'true'){
            obtained++
        }
    }
    if(obtained == noSpaceBaseObtained.length){
        winner();
        
    }
}

//shuffle 


const shuffle = (array) => {
    let currentIndex = array.length;
      while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

const gameOver = () =>{
    isGameStart = false
    isGameOver = true
    document.querySelector('.game-notif').style.display = 'none'
    document.querySelector('.game-over').innerHTML = 
    `
     <div class="game-status">
        <h1 class="game-over-txt">GAME OVER !! </h1>
        <h3 class="player-end-score-time">${playerEndTime + 's' + '|' + score}</h3>
     </div>
    `
}

const winner = () =>{
    isGameStart = false
    isGameOver = true
    document.querySelector('.game-notif').style.display = 'none'
    document.querySelector('.game-over').innerHTML = 
    `
     <div class="game-status">
        <h1 class="game-over-txt">YOU WIN !!</h1>
        <h3 class="player-end-score-time">${playerEndTime + 's' + '|' + score}</h3>
     </div>
    `
}

const checkPowerUp = () =>{
    // velo = defaultVelo //player original velo, after power up
    // isImmune =  false
    
    var powerUpChecker = setInterval(()=>{
        
        console.log(pWidthHeight)
        
        var allPowerUp = document.querySelectorAll('.cur-power-up')
        for(let i = 0;i<allPowerUp.length;i++){
            if(allPowerUp[i].innerText == 'speed'){
                velo = 15;
            }else if(allPowerUp[i].innerText == 'immune'){
                isImmune = true
                // var add = 2;
                // var grow = setInterval(()=>{
                    
                //     if(pWidthHeight==100){
                //         clearInterval(grow);
                //         return
                //     }
                //     pWidthHeight+=add
                //     mainCharBase.style.width = pWidthHeight + 'px'
                //     mainCharBase.style.height = pWidthHeight + 'px'
                // },16)
            }
        }
    },16)
}  


// add poweer up