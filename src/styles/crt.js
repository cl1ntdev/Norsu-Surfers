var linescont = document.querySelector('.lines-container')
// used in index.js
const animateFlick = () =>{
    var lineCountBase = 0
    var crtRemove = 0
    var allCrtLines = document.querySelectorAll('.crt-line')
    let scan = setInterval(() => {
        allCrtLines[lineCountBase].classList.toggle('flick')
        lineCountBase++;   
        if(lineCountBase>=allCrtLines.length){
            clearInterval(scan)
        } 
    }, 15);
    let removeScan = setInterval(() => {
        allCrtLines[crtRemove].className = 'crt-line'
        crtRemove++
        if(crtRemove>=allCrtLines.length){
            clearInterval(removeScan)
        }    
    }, 8);
}
const crtLineMake = () =>{
    
    for(let i = 0;i<10;i++){
        const newLine = document.createElement('div')
        newLine.className = 'crt-line';
        linescont.appendChild(newLine)
        // newLine.classList.toggle('flick')
    }
    animateFlick()
}