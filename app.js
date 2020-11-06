const gridSize = 16
const squareElements = setupGrid()
const moleElement = createMoleImageElement()
const timeLeft = document.querySelector('#time-left')
const scoreElement = document.querySelector('#score')
const moleAppearAnimation = ['animated', 'fadeIn', 'fast']
const moleHitAnimation = ['animated', 'rubberBand', 'fast']

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
    mole.style.cursor = 'pointer'
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
        animateMoleAppears(moleElement)
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
        animateMoleHit(this)
    }
}

function animateMoleAppears(mole) {
    mole.classList.add(...moleAppearAnimation)
    setTimeout(() => mole.classList.remove(...moleAppearAnimation), 500)
}

function animateMoleHit(mole) {
    mole.classList.add(...moleHitAnimation)
    setTimeout(() => mole.classList.remove(...moleHitAnimation), 500)
}

function countdown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(countdownJob)
        hitPosition = -1 // disable hit detection
        moleElement.style.cursor = 'auto'
        alert('Game over! Your final score is: ' + score)
    }
}

callMole()
