import LifeBar from './ui/LifeBar'

class Core {
    constructor(game, x, y, size) {
        this.game = game
        this.size = size
        this.position = { x: x - size / 2, y: y - size / 2 }

        this.life = 1000

        this.colorFill = `#f0f`

        this.lifeBar = new LifeBar(game, this, 200)
    }

    getPosition() {
        return this.position
    }

    reduceLife(force) {
        if (this.life > 0) {
            this.life -= force
        }
        if (this.life < 0) {
            this.life = 0
        }
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
        this.lifeBar.update()
    }
}

export default Core
