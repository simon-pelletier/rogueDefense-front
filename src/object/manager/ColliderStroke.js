class ColliderStroke {
    constructor(game) {
        this.game = game
    }

    stroke(element) {
        if (this.game.debugMode) {
            this.game.canvas.beginPath()
            this.game.canvas.strokeStyle = '#f0f'
            this.game.canvas.lineWidth = 1
            this.game.canvas.rect(
                element.x,
                element.y,
                element.xMax - element.x,
                element.yMax - element.y
            )
            this.game.canvas.stroke()
        }
    }
}

export default ColliderStroke
