const squares = document.querySelectorAll('.square')
const moles = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')

let score = document.querySelector('#score')
let result = 0

function callMole() {
    squares.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = squares[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')
}
