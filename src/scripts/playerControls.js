
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
const keys = {}

// Event listeners for keydown and keyup
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isGameOver) {
        location.reload();
        isGameOver = false;
    }
    if (!isGameStart) {
        return;
    }

    // Track key presses and movement
    if (e.key) {
        keys[e.key] = true;
        clearTimeout(idleTimeout);
    }
});

document.addEventListener('keyup', (e) => {
    // Stop tracking the key when released
    if (e.key) {
        keys[e.key] = false;
    }
    // Handle idle state when no keys are pressed
    checkForIdle();
});

// Function to handle movement
function updateMovement() {
    const mainCharRect = mainChar.getBoundingClientRect();
    const gameContRect = gameContainer.getBoundingClientRect(); // Assuming gameContainer is defined

    if (keys['w'] && mainCharRect.top > gameContRect.top + 15) {
        mainChar.classList.remove('down', 'left', 'right');
        mainChar.classList.add('up');
        my -= velo;
        mainChar.style.top = my + 'px';
    }
    else if (keys['s'] && mainCharRect.bottom < gameContRect.bottom - 5) {
        mainChar.classList.remove('up', 'left', 'right');

        mainChar.classList.add('down');
        my += velo;
        mainChar.style.top = my + 'px';
    }
    else if (keys['a'] && mainCharRect.left > gameContRect.left + 12) {
        mainChar.classList.remove('up', 'down', 'right');

        mainChar.classList.add('left');
        mx -= velo;
        mainChar.style.left = mx + 'px';
    }
    else if (keys['d'] && mainCharRect.right < gameContRect.right - 9) {
        mainChar.classList.remove('up', 'down', 'left');

        mainChar.classList.add('right');
        mx += velo;
        mainChar.style.left = mx + 'px';
    }

    // Continuously update movement
    requestAnimationFrame(updateMovement);
}

// Start updating the movement
updateMovement();

// Function to check if the character is idle (no keys pressed)
function checkForIdle() {
    if (!keys['w'] && !keys['s'] && !keys['a'] && !keys['d']) {
        isMoving = false;
        clearTimeout(idleTimeout);

        idleTimeout = setTimeout(() => {
            // Reset the character's movement classes to idle state
            mainChar.classList.remove('up', 'down', 'left', 'right');
            mainChar.className = 'main-char'; // Add idle class when not moving
        }, 100);
    }
}