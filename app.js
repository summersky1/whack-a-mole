const squares = document.querySelectorAll('.square')
const moles = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')

let score = document.querySelector('#score')
let result = 0
let currentTime = timeLeft.textContent
let timerId = setInterval(countdown, 1000)
let moveMoleId = setInterval(callMole, 1000)

function callMole() {
    squares.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = squares[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

    hitPosition = randomPosition.id
}

squares.forEach(square => {
    square.addEventListener('mouseup', () => {
        if (square.id === hitPosition) {
            result = result + 1
            score.textContent = result
        }
    })
})

function moveMole() {
    setInterval(callMole, 1000)
}

function countdown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(timerId)
        clearInterval(moveMoleId)
        alert('GAME OVER! Your final score is: ' + result)
    }
}
