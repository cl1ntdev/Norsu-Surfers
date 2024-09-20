const eSpawns = document.querySelectorAll('.eSpawn')
const enemySpeeds = [.3,.4,.5,.6,.9,1,7]
// const enemySpeeds = [7] // debugging purposes
const speedLineWarning = 7
var enemySpawnTime = 3000;
//spawning ovelflow in css
//[.3,.4,.5,.6,.9,1,5]


const initSpawnEnemy = () =>{
    var startSpawn = setInterval(()=>{
        const randomSpawnPoint = shuffle([0,1]);
        const spawnBase = eSpawns[randomSpawnPoint[0]];
        const spawnBaseRect = spawnBase.getBoundingClientRect()
        const randomXpos = Math.floor(Math.random() * spawnBaseRect.width - 10)
        const randomYpos = Math.floor(Math.random() * spawnBaseRect.height)
        // console.log(randomXpos)
        const enemy = document.createElement('div')
        enemy.className = 'enemy'
        enemy.style.left = randomXpos + 'px'
        enemy.style.top = randomYpos + 'px'

        moveEnemy(enemy, spawnBase, randomYpos)
        
        spawnBase.appendChild(enemy)
        // clearInterval(startSpawn) //debygging purposes
    },enemySpawnTime)
}



const moveEnemy = (e,w,ypos) =>{ //e = enemy element, w = spawnBase 
    
    var enemySpeed = shuffle(enemySpeeds)
    var enemyMainVelo = enemySpeed[0]
    var enemyVelo = enemyMainVelo 
    if(enemyVelo === speedLineWarning){
        roadWarning(ypos);
    }
    const spawnPointPos = w.getAttribute("location")
    switch(spawnPointPos){
        case 'left':
            enemyVelo = enemyMainVelo
            e.classList.add('left')
        break;
        case 'right':
            e.classList.add('right')
            enemyVelo *=-1
        break;
    }
    const enemy = new Enemy(0,ypos,enemyVelo);
    
    var enemyMove = setInterval(()=>{
        var enemyRect = e.getBoundingClientRect()
        if(!isGameStart){
            clearInterval(enemyMove)
            return
        }
        var enemyRect = e.getBoundingClientRect()
        var mcComRect = mainCharBase.getBoundingClientRect();
        enemy.x += enemy.velo;
        e.style.left = enemy.x + 'px'
       
        var colliding = enemy.colliding(mcComRect,enemyRect) 
        if(colliding && !isImmune){
            isImmune = true
            document.querySelector('#damaged').play();
            mainChar.classList.toggle('damaged')
            const playerHeart = document.querySelectorAll('.player-heart')
            playerHeart[playerHeart.length-1].remove()
            playerHp--
            if(playerHp<=0){
                gameOver();
            }
            setTimeout (()=>{
                isImmune = false
                mainChar.classList.toggle('damaged')
            },3000)
        }
        setTimeout(()=>{
            e.remove()
        },20000)//after 20 sec remove enemy
        // console.log(gameContainerRect.left + " == " + enemyRect.x)
    },enemyVelo)
}


const roadWarning = (eYpos) =>{
    const warningLine = document.createElement('div')
    warningLine.className = 'warning-line'
    warningLine.style.top = eYpos + 'px'
    gamePhase.appendChild(warningLine)
    setTimeout(()=>{
        warningLine.remove()
    },1000)
}