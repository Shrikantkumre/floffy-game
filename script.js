const rodContainer = document.querySelectorAll('.rodContainer');
const gamecontainer = document.querySelector('.gamecontainer');
const character = document.querySelector('.character');
const scorediv = document.querySelector('.score');
function generateRandomNumberInRange(startRange, endRange) {
    // Calculate the range
    const range = endRange - startRange;

    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Scale the random number to fit within the specified range
    const scaledNumber = randomNumber * range + startRange;

    // Round the scaled number to the nearest integer
    const randomNumberInRange = Math.round(scaledNumber);

    return randomNumberInRange;
}
let score = 0;
let isGameOver = false;
function areDivsOverlapping(div1, div2) {
    // Get the position and dimensions of the first div
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    // Check for overlap
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}
let gameInterval = setInterval(moveRods, 100);

function gameOver() {
    clearInterval(gameInterval)
}

let rodmoved = 0;
function moveRods() {

    // const moveInterval = setInterval(() => {
    rodmoved = rodmoved + 10;

    rodContainer.forEach((element, index) => {
        score += 0.2
        scorediv.innerHTML = Math.round(score);
        const topRod = element.querySelector('.rodTop')
        const bottomRod = element.querySelector('.rodBottom')

        const isTopRodCollapsed = areDivsOverlapping(character, topRod)
        const isBottomRodCollapsed = areDivsOverlapping(character, bottomRod)

        console.log(isTopRodCollapsed);
        console.log(isBottomRodCollapsed);

        if (isTopRodCollapsed || isBottomRodCollapsed) {
            gameOver();
            isGameOver = true;
            return;
        }

        if (index === 0) {
            element.style.right = rodmoved + 'px'; // Add 'px' for pixel units
            if (element.offsetLeft < -50) {
                console.log('done')
                rodContainer.forEach(function (elem, index) {
                    elem.style.right = '0px'
                    rodmoved = -160;
                    elem.style.top = generateRandomNumberInRange(40, 100) + 'px'
                    elem.querySelector('.rodTop').style.top = - generateRandomNumberInRange(50, 80) + '%'
                })
            }
        }
        if (index === 1) {
            element.style.right = rodmoved + 100 + 'px'; // Add 'px' for pixel units

        }
        if (index === 2) {
            element.style.right = rodmoved + 200 + 'px'; // Add 'px' for pixel units


        }

    })

    // console.log(rodContainer.offsetLeft);


    // }, 100);
}

// moveRods();


document.addEventListener('keyup', function (event) {
    console.log(event.key)
    if (isGameOver) return;
    if (event.key === 'ArrowUp' && character.offsetTop > 0) {
        character.style.top = character.offsetTop - 10 + 'px'
        console.log(character.offsetTop);
    }

    if (event.key === 'ArrowDown' && character.offsetTop < 480) {
        character.style.top = character.offsetTop + 10 + 'px'
        console.log(character.offsetTop);
    }
})