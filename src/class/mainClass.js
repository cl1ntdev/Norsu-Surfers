class MainCharacter{
    
    constructor(hp){
        this.health = hp;
        
    }
}

class Enemy{
    constructor(x,y,velo){
        this.x = x
        this.y = y
        this.velo = velo
    }
    
    colliding(mcComRect,enemyRect){
        if (
            enemyRect.left < mcComRect.right &&
            enemyRect.right > mcComRect.left &&
            enemyRect.top < mcComRect.bottom &&
            enemyRect.bottom > mcComRect.top
        ) {
            return true;
        }
    }
}

class PowerUp{
    constructor(e){
        this.power = e;
    }
}