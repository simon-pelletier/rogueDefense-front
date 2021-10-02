import LifeBar from './ui/LifeBar'
import Bullet from './Bullet'

class Tower {
    constructor(game, x, y, size, type) {
        this.game = game
        this.size = size
        this.position = { x: x - size / 2, y: y - size / 2 }
        this.type = type

        this.life = 100

        this.range = 500

        this.angle = 0

        this.lifeBar = new LifeBar(game, this, 100)

        this.isShooting = false

        this.colorFill = this.type === 'bullet' ? 'blue' : 'purple'

        this.delay = 5
        this.shootingDelay = 0
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

    getCloserEnemy() {
        let closerDistance = Infinity
        let target = null
        if (this.game.enemies.length > 0) {
            for (const enemy of this.game.enemies) {
                let a = enemy.position.x - this.position.x
                let b = enemy.position.y - this.position.y
                let distance = Math.sqrt(a * a + b * b)
                if (distance < closerDistance && distance < this.range) {
                    closerDistance = distance
                    target = enemy
                    this.angle = Math.atan2(
                        (enemy.position.y + enemy.size / 2) - (this.position.y + this.size / 2),
                        (enemy.position.x + enemy.size / 2) - (this.position.x + this.size / 2)
                    )
                }
            }
        }

        return target
    }

    update() {
        this.shootingDelay--
        if (this.shootingDelay < 0) {
            this.shootingDelay = 0
        }

        let enemyTarget = this.getCloserEnemy()

        if (enemyTarget) {
            if (!this.isShooting) {
                this.isShooting = true
            }
            this.game.canvas.beginPath()
            if (this.type === 'laser') {
                this.game.canvas.lineWidth = 5
                this.game.canvas.strokeStyle = 'red'
                this.game.canvas.moveTo(
                    this.position.x + this.size / 2,
                    this.position.y + this.size / 2
                )
                this.game.canvas.lineTo(
                    enemyTarget.position.x + enemyTarget.size / 2,
                    enemyTarget.position.y + enemyTarget.size / 2
                )
            } else {
                // this.game.canvas.lineWidth = 1
                // this.game.canvas.strokeStyle = 'white'
            }
            
        } else {
            if (this.isShooting) {
                this.isShooting = false
            }
        }

        if (this.isShooting) {
            if (this.type === 'bullet' && this.shootingDelay === 0) {
                this.shootingDelay = this.delay
                //* envoie une bullet
                this.game.bullets.push(
                    new Bullet(
                        this.game,
                        this.position,
                        this.size / 2,
                        this.angle
                    )
                )
            }
            if (this.type === 'laser') {
                enemyTarget.reduceLife(1)
            }
        }

        this.game.canvas.stroke()
        this.game.canvas.closePath()

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

export default Tower
