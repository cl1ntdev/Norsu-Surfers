var timerShowNums = document.querySelector('.timer')
var mainTime = 0;

const startTimerFunc = () =>{    
    var startTimer = setInterval(()=>{
        if(!isGameStart){
            clearInterval(startTimer)
            return
        }
        playerEndTime = mainTime
        mainTime++   
        timerShowNums.innerText = mainTime
    },1000)
}
