
const powerUpShow = document.querySelector('.power-up-show')
const spawnLettersInterval = 3000;
const spawnCoinsInterval = 1500;
const pwrSpawnTime = 2000;
var isOn = true; //debugging purposes

// const words = [
//     "I LOVE NEGROS ORIENTAL STATE UNIVERSITY",
// ]


var randomWords = [];

const checkGameStart = () =>{ // check Game
    if(isGameStart){
        // console.log('game started')
        initSpawn();
    }else{
        return
    }
}



const initSpawn = () =>{
    // randomWords = shuffle(words) // if word is one by one 
    randomWords = removeSpace(words);
    initSpawnLetters(randomWords);
    initSpawnCoins();
    initSpawnEnemy();
    initRandomPowerUp() //add power up
}

const initSpawnLetters = (ar) =>{
    var canNextWord = false;
    if(!isOn){
        return
    }
    if(ar.length<=0){
        console.log('done')
        return
    }
    var wordLenCount = 0
    var baseWords = ar
    // console.log(baseWords)
    // var baseWord = ar[baseWords.length-1];
    // console.log(baseWord)
    var spawnLetters = setInterval(()=>{
        const gameContainerRect = gamePhase.getBoundingClientRect();
        const rectWidth = parseInt(gameContainerRect.width)// the 50 is used to adjust the randge so that the eleent size wont overlap
        const rectHeight = parseInt(gameContainerRect.height)

        if(!isGameStart){
            clearInterval(spawnLetters)
            return
        }
        const randx = Math.floor(Math.random() * rectWidth)
        const randy = Math.floor(Math.random() * rectHeight)
        const newLet = document.createElement('h3')
        newLet.className = 'letter-base'
        // console.log(wordLenCount)
        // console.log("??" + baseWord.length )
        if(
            // baseWord[wordLenCount] == baseWord[baseWord.length] 
            //  baseWord[wordLenCount] == undefined  // optional
            wordLenCount == baseWords.length
        ){//limits the creation according to the last letter of the base word to reset to next
            if(canNextWord){
                clearInterval(spawnLetters)
                baseWords.pop();
                initSpawnLetters(baseWords)
                return
            }else{
                console.log('ckeared')
                clearInterval(spawnLetters)
                return // after adding removed letters, add neww interval for letters that not got
            }
        }
        newLet.innerText = baseWords[wordLenCount]
        newLet.style.left = randx + 'px'
        newLet.style.top = randy + 'px'
        gamePhase.appendChild(newLet)
        wordLenCount++;
        setInterval(() => {
            var letter = newLet.getBoundingClientRect();
            var mcComRect = mainCharBase.getBoundingClientRect();
            if (
                letter.left < mcComRect.right &&
                letter.right > mcComRect.left &&
                letter.top < mcComRect.bottom &&
                letter.bottom > mcComRect.top
            ) {
                // Collision detected
                newLet.remove()
                score+=5;
                updateScore();
                updateLet(newLet.innerText)
            } else {
                
            }
        }, 1);
        // console.log(newLet)
    },spawnLettersInterval)

}

const initSpawnCoins = () => {
    
    var spawnCoins = setInterval(()=>{
        const gameContainerRect = gamePhase.getBoundingClientRect();
        const rectWidth = parseInt(gameContainerRect.width)// the 50 is used to adjust the randge so that the eleent size wont overlap
        const rectHeight = parseInt(gameContainerRect.height)
        if(!isGameStart){
            clearInterval(spawnCoins)
            return
        }
        const randx = Math.floor(Math.random() * rectWidth)
        const randy = Math.floor(Math.random() * rectHeight)
        
        const newCoin = document.createElement('div')
        newCoin.className = 'coin-base'
        newCoin.style.top = randy + 'px'
        newCoin.style.left = randx + 'px'
        
        //put randx to class i guess
        var removeCoin = setTimeout(()=>{
            newCoin.classList.add('fade')
            setTimeout(() => {
                //remove
                newCoin.remove()
            }, 5000);
        },7000)//7s after showing
        gamePhase.appendChild(newCoin)
        
        setInterval(() => {
            var letter = newCoin.getBoundingClientRect();
            var mcComRect = mainCharBase.getBoundingClientRect();
            if (
                letter.left < mcComRect.right &&
                letter.right > mcComRect.left &&
                letter.top < mcComRect.bottom &&
                letter.bottom > mcComRect.top
            ) {
                document.querySelector('#coin').play();
                // Collision detected
                newCoin.remove()
                score++;
                updateScore();
            } else {
                
            }
        }, 1);
        // clearInterval(spawnCoins); // debugging
        
    },spawnCoinsInterval)
}


const initRandomPowerUp = () => {
    
    var startPowerSpawn = setInterval(()=>{
        const gameContainerRect = gamePhase.getBoundingClientRect();
        const rectWidth = parseInt(gameContainerRect.width)// the 50 is used to adjust the randge so that the eleent size wont overlap
        const rectHeight = parseInt(gameContainerRect.height)
        if(!isGameStart){
            clearInterval(startPowerSpawn)
            return
        }
        const powerUpType = shuffle(['speed','immune'])
        const powerObj = new PowerUp(powerUpType[0])
        const randx = Math.floor(Math.random() * rectWidth)
        const randy = Math.floor(Math.random() * rectHeight)
        const newPower = document.createElement('div')
        newPower.style.left = randx + 'px'
        newPower.style.top = randy + 'px'
        newPower.className = 'power '+ powerUpType[0]
        // newPower.typeOfPower =  powerUpType[0]
        
        // console.log('working')
        var removeCoin = setTimeout(()=>{
            //animation of flickering
            setTimeout(() => {
                //remove
                newPower.remove()
            }, 5000);
        },7000)//7s after showing
        gamePhase.appendChild(newPower)
        
        setInterval(() => {
            var power = newPower.getBoundingClientRect();
            var mcComRect = mainCharBase.getBoundingClientRect();
            if (
                power.left < mcComRect.right &&
                power.right > mcComRect.left &&
                power.top < mcComRect.bottom &&
                power.bottom > mcComRect.top
            ) {
                
                newPower.remove()
                
                if(powerObj.power == 'speed'){
                   
                    
                    const newPowerUpShow = document.createElement('h1')
                    newPowerUpShow.innerText = powerObj.power
                    newPowerUpShow.className = 'cur-power-up pwr'
                    powerUpShow.appendChild(newPowerUpShow)
                    //mayber assign this to a variable and then if another speed up, this will be removed making it start to a new one
                    setTimeout(()=>{
                        newPowerUpShow.classList.add('fade')
                    },7000)
                    setTimeout(() => {
                        newPowerUpShow.remove()
                        velo = defaultVelo
                    }, 10000);//10 sec speed up
                }else if(powerObj.power == 'immune'){
                    
                    const newPowerUpShow = document.createElement('h1')
                    newPowerUpShow.innerText = powerObj.power
                    newPowerUpShow.className = 'cur-power-up pwr'
                    powerUpShow.appendChild(newPowerUpShow)
                    //mayber assign this to a variable and then if another speed up, this will be removed making it start to a new one
                    setTimeout(()=>{
                        newPowerUpShow.classList.add('fade')
                    },2000)
                  
                    setTimeout(() => {
                        newPowerUpShow.remove()
                        console.log('working')
                        isImmune = false  
                    //     var decrement = 2;                  
                    //     var shrink = setInterval(() => {
                       
                    //     if (pWidthHeight<=50) {
                    //         clearInterval(shrink); 
                    //         return;
                    //     }
                        

                    //     // Decrease the size gradually
                    //     pWidthHeight -= decrement;
                    //     mainCharBase.style.width = pWidthHeight + 'px';
                    //     mainCharBase.style.height = pWidthHeight + 'px';
                    //     if(pWidthHeight == 50){
                    //         clearInterval(shrink)
                    //     }
                    // }, 16); // Adjust to around 60fps (16ms per frame)
                    }, 5000);// 5 sec immune
                }
            } 
        }, 1);
    },pwrSpawnTime)
}
