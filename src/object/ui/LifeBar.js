class LifeBar {
    constructor(game, element, size) {
        this.game = game
        this.element = element
        this.size = 100
        this.tickness = 5

        this.baseLife = element.life
    }

    update() {
        let factor = this.baseLife / 100
        this.game.canvas.beginPath()
        this.game.canvas.fillStyle = 'yellow'
        this.game.canvas.lineWidth = 1
        this.game.canvas.rect(
            this.element.position.x - this.size / 2 + this.element.size / 2,
            this.element.position.y - 10,
            (this.baseLife * this.element.life) / this.baseLife / factor,
            this.tickness
        )
        this.game.canvas.fill()
        this.game.canvas.closePath()

        this.game.canvas.beginPath()
        this.game.canvas.strokeStyle = 'red'
        this.game.canvas.rect(
            this.element.position.x - this.size / 2 + this.element.size / 2,
            this.element.position.y - 10,
            this.size,
            this.tickness
        )
        this.game.canvas.stroke()
        this.game.canvas.closePath()

        this.game.canvas.textAlign = 'center'
        this.game.canvas.fillText(
            this.element.life,
            this.element.position.x + this.element.size / 2,
            this.element.position.y - 15
        )
    }
}

export default LifeBar
