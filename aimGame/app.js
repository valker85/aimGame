const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')
const colors = ['#844ddd', '#ad4646', '#bb9a3e', '#50af31', '#2fafaf']

let time = 0
let score = 0

startBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('time-btn')){
        time = +event.target.getAttribute('data-time')
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click', event =>{
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)

    createRandomCircle()

    seTime(time)
}

function decreaseTime(){
    time === 0 ? finishGame() : seTime(--time)
}

function seTime(value) {
    timeEl.innerHTML = `00:${value < 10 ? '0' : ''}${value}`  
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = colors[getRandomNumber(0, colors.length - 1)]

    board.append(circle)
}


function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}