import Game from './object/Game'

const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'world')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvasCtx = canvas.getContext('2d')
canvasCtx.width = window.innerWidth
canvasCtx.height = window.innerHeight
canvasCtx.imageSmoothingEnabled = true

document.body.appendChild(canvas)
document.body.style.backgroundColor = '#000'
document.body.style.overflow = 'hidden'
document.body.style.padding = 0
document.body.style.margin = 0

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvasCtx.width = window.innerWidth
    canvasCtx.height = window.innerHeight
})

let game = new Game(canvasCtx)

function animation() {
    window.requestAnimationFrame(animation)
    canvasCtx.clearRect(0, 0, canvasCtx.width, canvasCtx.height)
    canvasCtx.beginPath()
    // canvasCtx.rect(0, 0, canvasCtx.width, canvasCtx.height)
    // canvasCtx.fillStyle = 'grey'
    // canvasCtx.fill()
    

    game.update()
}

animation()

// function animation() {
//     // window.requestAnimationFrame(animation)
//     canvasCtx.clearRect(0, 0, canvasCtx.width, canvasCtx.height)
//     canvasCtx.beginPath()
//     // canvasCtx.rect(0, 0, canvasCtx.width, canvasCtx.height)
//     // canvasCtx.fillStyle = 'grey'
//     // canvasCtx.fill()
//     game.update()
// }

// setInterval(() => {
//     animation()
// }, 20)
