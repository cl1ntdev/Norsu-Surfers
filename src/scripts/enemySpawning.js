const eSpawns = document.querySelectorAll('.eSpawn')

var enemySpawnTime = 3000;


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
        moveEnemy(enemy, spawnBase)
        spawnBase.appendChild(enemy)
    },enemySpawnTime)
}

const moveEnemy = (e,w) =>{
    var enemySpeed = shuffle([2,2,.5,.1,.1,3,.5,.5,.3,.1])
    var enemyMainVelo = enemySpeed[0]
    var enemyVelo = enemyMainVelo 
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
    const enemy = new Enemy(0,0,enemyVelo);
    var enemyMove = setInterval(()=>{
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
            },3000)
        }
    },enemyVelo)
}
