const gridSize = 16
const squareElements = setupGrid()
const timeLeft = document.querySelector('#time-left')
const scoreElement = document.querySelector('#score')

let score = 0
let currentTime = timeLeft.textContent
let hitPosition = 0

let countdownJob = setInterval(countdown, 1000)
let callMoleJob = setInterval(callMole, 1000)

function setupGrid() {
    let gridElement = document.querySelector('#grid')
    let squares = []
    for (let i = 0; i < gridSize; i++) {
        let squareElement = document.createElement('div')
        squareElement.classList.add('col-3', 'border', 'square')
        squareElement.id = i
        gridElement.appendChild(squareElement)
        squares.push(squareElement)
    }
    return squares
}

function callMole() {
    // remove mole from last square
    squareElements[hitPosition].classList.remove('mole')
    let randomSquare = squareElements[Math.floor(Math.random() * gridSize)]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
}

squareElements.forEach(square => {
    square.addEventListener('mouseup', () => {
        if (square.id === hitPosition) {
            score++
            scoreElement.textContent = score
        }
    })
})

function countdown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(countdownJob)
        clearInterval(callMoleJob)
        alert('Game over! Your final score is: ' + score)
    }
}
