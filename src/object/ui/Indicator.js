class Indicator {
    constructor(game, element, target) {
        this.game = game
        this.element = element
        this.target = target
        this.distance = 200
    }

    update() {
        this.game.canvas.beginPath()
        this.game.canvas.strokeStyle = 'yellow'
        this.game.canvas.moveTo(
            this.element.position.x + this.element.size / 2,
            this.element.position.y + this.element.size / 2
        )
        this.game.canvas.lineTo(this.target.position.x + this.target.size / 2, this.target.position.y + this.target.size / 2)
        this.game.canvas.stroke()
        this.game.canvas.stroke()
    }
}

export default Indicator
