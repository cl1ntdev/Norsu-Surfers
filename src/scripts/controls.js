
var mainChar = document.querySelector('.main-char')
var gameCont = document.querySelector('.game-container')
var gameContRect = gameCont.getBoundingClientRect();
var mainCharComStyle = window.getComputedStyle(mainChar)
var mainCharX = mainCharComStyle.left
var mainCharY = mainCharComStyle.top
var mx = parseInt(mainCharX)
var my = parseInt(mainCharY)
var playerHp = 3;
var isImmune = false; // in enemyspawning detects this type shi
const mainCharClass = new MainCharacter(3);
var isMoving = false;
var currentMovement = ""
var velo = defaultVelo;
var idleTimeout;
document.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter' && isGameOver){
        location.reload()
        isGameOver = false;
    }
    if(!isGameStart){
        return
    }
   
    if(e.key){
        isMoving = true
        clearInterval(idleTimeout)
    } 
    charMovement(e.key)
})

 charMovement = (val) =>{
var mainCharRect = mainChar.getBoundingClientRect()
    switch(val){
        case 'w':
            currentMovement = "up"
            mainChar.classList.add('up')
            if(mainCharRect.top <= gameContRect.top + 15){
                return
            }
            my-=velo
            mainChar.style.top = my + 'px'
        break;
        case 's':
            currentMovement = "down"
            mainChar.classList.add('down')
            if(mainCharRect.bottom >= gameContRect.bottom - 5){
                return
            }
            my+=velo
            mainChar.style.top = my + 'px'
        break;
        case 'a':
            currentMovement = "down"
            mainChar.classList.add('left')
            if(mainCharRect.left <= gameContRect.left + 12){
                return
            }
            mx-=velo
            mainChar.style.left = mx + 'px'
        break;
        case 'd':
            currentMovement = "right"
            mainChar.classList.add('right')
            if(mainCharRect.right >= gameContRect.right - 9){
                return
            }
            mx+=velo
            mainChar.style.left = mx + 'px'
        break;
        default:
            isMoving = false;
            break;
    }
    idleTimeout = setTimeout(() => {
        isMoving = false;
        switch(currentMovement){
            case "right":
                mainChar.classList.remove('right');
                break;
            case "up":
                mainChar.classList.remove('up')
                break;
            case "left":
                mainChar.classList.remove('left')
                break;
            case "down":
                mainChar.classList.remove('down')
                break;
        }
        mainChar.className = 'main-char'; // Add idle class when not moving
    }, 100);
}

setTimeout(() => {
    isMoving = false;
    
    mainChar.className = 'main-char'; // Add idle class when not moving
}, 100);

