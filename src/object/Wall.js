let id = 0

class Wall {
    constructor(game, x, y, width, height) {
        this.game = game
        this.id = id
        this.shape = { x, y, width, height }
        this.size = 20
        id++
    }

    update() {
        this.game.canvas.beginPath()
        this.game.canvas.fillStyle = 'yellow'
        this.game.canvas.rect(
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height
        )
        this.game.canvas.fill()
    }
}

export default Wall
