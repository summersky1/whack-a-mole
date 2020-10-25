const gridSize = 16
const squareElements = setupGrid()
const timeLeft = document.querySelector('#time-left')

let score = document.querySelector('#score')
let result = 0
let currentTime = timeLeft.textContent
let timerId = setInterval(countdown, 1000)
let moveMoleId = setInterval(callMole, 1000)

function setupGrid() {
    let gridElement = document.querySelector('#grid')
    let squares = []
    for (let i = 0; i < gridSize; i++) {
        let squareElement = document.createElement('div')
        squareElement.classList.add('col-3', 'border', 'square')
        squareElement.id = i + 1
        gridElement.appendChild(squareElement)
        squares.push(squareElement)
    }
    return squares
}

function callMole() {
    squareElements.forEach(element => {
        element.classList.remove('mole')
    })
    let randomPosition = squareElements[Math.floor(Math.random() * gridSize)]
    randomPosition.classList.add('mole')

    hitPosition = randomPosition.id
}

squareElements.forEach(square => {
    square.addEventListener('mouseup', () => {
        if (square.id === hitPosition) {
            result = result + 1
            score.textContent = result
        }
    })
})

function countdown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(timerId)
        clearInterval(moveMoleId)
        alert('GAME OVER! Your final score is: ' + result)
    }
}
