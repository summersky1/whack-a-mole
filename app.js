const gridSize = 16
const squareElements = setupGrid()
const moleElement = createMoleImageElement()
const timeLeft = document.querySelector('#time-left')
const scoreElement = document.querySelector('#score')
const animationClasses = ['animated', 'fadeIn', 'fast']

let score = 0
let currentTime = timeLeft.textContent
let hitPosition = 0

let countdownJob = setInterval(countdown, 1000)

function setupGrid() {
    let gridElement = document.querySelector('#grid')
    let squares = []
    for (let i = 0; i < gridSize; i++) {
        let squareElement = document.createElement('div')
        squareElement.classList.add('col-3', 'border', 'square', 'p-1')
        squareElement.id = i
        squareElement.addEventListener('mouseup', detectHit)
        gridElement.appendChild(squareElement)
        squares.push(squareElement)
    }
    return squares
}

function createMoleImageElement() {
    let mole = document.createElement('img')
    mole.setAttribute('src', 'mole.png')
    mole.classList.add('img-fluid')
    return mole
}

function callMole() {
    // remove mole from last square
    if (squareElements[hitPosition].contains(moleElement)) {
        squareElements[hitPosition].removeChild(moleElement)
    }
    let randomSquare = squareElements[Math.floor(Math.random() * gridSize)]
    randomSquare.appendChild(moleElement)
    // don't animate if mole appears in same position
    if (hitPosition !== randomSquare.id) {
        animateMole(moleElement)
        hitPosition = randomSquare.id
    }
    if (currentTime > 1) {
        setTimeout(callMole, Math.floor(Math.random() * 1000) + 500)
    }
}

function detectHit() {
    if (this.id === hitPosition) {
        score++
        scoreElement.textContent = score
    }
}

function animateMole(mole) {
    mole.classList.remove(...animationClasses)
    mole.offsetWidth // necessary to replay animation
    mole.classList.add(...animationClasses)
}

function countdown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(countdownJob)
        hitPosition = -1 // disable hit detection
        alert('Game over! Your final score is: ' + score)
    }
}

callMole()
