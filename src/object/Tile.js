class Tile {
    constructor(game, x, y, size, colorFill) {
        this.game = game
        this.size = size
        this.position = { x, y }

        this.colorFill = colorFill
    }

    update() {
        this.game.canvas.beginPath()
        this.game.canvas.fillStyle = this.colorFill
        this.game.canvas.rect(
            this.position.x,
            this.position.y,
            this.size,
            this.size
        )
        this.game.canvas.fill()
    }
}

export default Tile
