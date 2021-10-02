import LifeBar from './ui/LifeBar'

let id = 0

class Enemy {
    constructor(game, x, y) {
        this.game = game
        this.id = id
        this.size = 20
        this.spawnPosition = { x: x, y: y }
        this.position = this.spawnPosition
        this.velocity = { x: 0, y: 0 }
        this.friction = 0.9
        this.speed = Math.floor(Math.random() * 4) + 1
        this.life = 100
        this.keysPressed = {}
        this.force = 1
        this.shooting = false
        this.shoottingSpeed = 0
        this.target = game.players[0]
        this.collisions = { up: false, right: false, down: false, left: false }

        this.lifeBar = new LifeBar(game, this, 100)
        this.lastPosition = this.position

        this.colorFill = 'white'

        id++
    }

    getPosition() {
        return this.position
    }

    reduceLife(force) {
        if (force > 0) {
            this.colorFill = 'red'
            this.life -= force
        }
    }

    getTarget() {
        let closerDistance = Infinity
        // let target = this.game.players[0]
        let target = this.game.core
        let a = target.position.x - this.position.x
        let b = target.position.y - this.position.y
        let distance = Math.sqrt(a * a + b * b)
        closerDistance = distance
        // for (const player of this.game.players) {
        //     let a = player.position.x - this.position.x
        //     let b = player.position.y - this.position.y
        //     let distance = Math.sqrt(a * a + b * b)
        //     if (distance < closerDistance) {
        //         closerDistance = distance
        //         target = player
        //     }
        // }
        this.target = target
        return closerDistance
    }

    update() {
        let distance = this.getTarget()

        this.lastPosition = { x: this.position.x, y: this.position.y }

        this.position.x +=
            (this.target.position.x - this.position.x) / (distance / this.speed)
        this.position.y +=
            (this.target.position.y - this.position.y) / (distance / this.speed)

        this.game.collisionDetector.checkEnemy(this)

        this.game.canvas.save()
        this.game.canvas.beginPath()
        this.game.canvas.translate(
            this.position.x + this.size / 2,
            this.position.y + this.size / 2
        )
        //! this.game.canvas.rotate(this.angle + 1.5)
        this.game.canvas.rect(
            0 - this.size / 2,
            0 - this.size / 2,
            this.size,
            this.size
        )
        this.game.canvas.fillStyle = this.colorFill
        this.game.canvas.fill()
        //! this.game.canvas.drawImage(
        //     this.img,
        //     0 - this.size / 2,
        //     0 - this.size / 2,
        //     this.size,
        //     this.size
        // )
        this.game.canvas.restore()

        this.lifeBar.update()
        this.colorFill = 'white'
    }
}

export default Enemy
