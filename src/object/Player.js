import Bullet from './Bullet'
import LifeBar from './ui/LifeBar'
import Indicator from './ui/Indicator'
import PlayerMenu from './ui/PlayerMenu'

class Player {
    constructor(game, id, name, img) {
        this.game = game
        this.id = id
        this.name = name
        this.size = 50
        this.spawnPosition = {
            x: game.terrain.width / 2,
            y: game.terrain.height / 2,
        }
        this.position = this.spawnPosition
        this.velocity = { x: 0, y: 0 }
        this.friction = 0.9
        this.speed = 10
        this.life = 100
        this.keysPressed = {}
        this.img = img
        this.shooting = false
        this.shoottingSpeed = 10
        this.lifeBar = new LifeBar(game, this, 100)
        this.coreIndicator = new Indicator(game, this, game.core)
        this.playerMenu = new PlayerMenu(game)
        this.colorFill = 'black'

        this.lastPosition = this.position
        this.lastVelocity = this.velocity

        this.mouse = {
            x: 0,
            y: 0,
        }

        this.angle = 0

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x + this.position.x - this.game.canvas.width / 2
            this.mouse.y = e.y + this.position.y - this.game.canvas.height / 2

            this.angle = Math.atan2(
                this.mouse.y - (this.position.y + this.size / 2),
                this.mouse.x - (this.position.x + this.size / 2)
            )
        })

        window.addEventListener('mousedown', (e) => {
            this.shooting = true
        })

        window.addEventListener('mouseup', (e) => {
            this.shooting = false
        })

        document.addEventListener('keydown', (event) => {
            this.keysPressed[event.key] = true
        })

        document.addEventListener('keyup', (event) => {
            delete this.keysPressed[event.key]
        })
    }

    getPosition() {
        return this.position;
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
        //* Save last velo & pos
        this.lastPosition = { x: this.position.x, y: this.position.y }
        this.lastVelocity = { x: this.velocity.x, y: this.velocity.y }

        if (this.keysPressed['ArrowUp'] || this.keysPressed['z']) {
            if (this.velocity.y > -this.speed) {
                this.velocity.y--
            }
        }

        if (this.keysPressed['ArrowDown'] || this.keysPressed['s']) {
            if (this.velocity.y < this.speed) {
                this.velocity.y++
            }
        }

        if (this.keysPressed['ArrowRight'] || this.keysPressed['d']) {
            if (this.velocity.x < this.speed) {
                this.velocity.x++
            }
        }

        if (this.keysPressed['ArrowLeft'] || this.keysPressed['q']) {
            if (this.velocity.x > -this.speed) {
                this.velocity.x--
            }
        }

        this.velocity.y *= this.friction
        this.position.y += this.velocity.y

        this.velocity.x *= this.friction
        this.position.x += this.velocity.x

        this.game.collisionDetector.checkPlayerBounds(this)

        this.game.canvas.save()

        this.game.canvas.translate(
            this.position.x + this.size / 2,
            this.position.y + this.size / 2
        )
        this.game.canvas.rotate(this.angle + 1.5)
        this.game.canvas.drawImage(
            this.img,
            0 - this.size / 2,
            0 - this.size / 2,
            this.size,
            this.size
        )
        this.game.canvas.restore()

        this.game.canvas.strokeStyle = 'white'
        this.game.canvas.moveTo(
            this.position.x + this.size / 2,
            this.position.y + this.size / 2
        )

        if (this.shooting) {
            //* envoie une bullet
            this.game.bullets.push(
                new Bullet(this.game, this.position, this.size / 2, this.angle)
            )
        }

        for (const bullet of this.game.bullets) {
            bullet.update()
        }
        this.game.canvas.fillStyle = 'white'
        this.game.canvas.textAlign = 'center'
        this.game.canvas.fillText(
            this.life === 0 ? 'DEAD' : this.name,
            this.position.x + this.size / 2,
            this.position.y - 30
        )

        this.coreIndicator.update()
        this.lifeBar.update()
        this.playerMenu.update()
    }
}

export default Player
