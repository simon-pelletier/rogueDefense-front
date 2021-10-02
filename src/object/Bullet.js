let id = 0

//* SOUNDS
import shotSound from '../assets/sound/shot.wav'

class Bullet {
    constructor(game, position, offset, angle) {
        this.id = id
        this.game = game
        this.position = { x: position.x + offset, y: position.y + offset }
        this.velocity = { x: 0, y: 0 }
        this.friction = 0.9
        this.speed = 25
        this.size = 3
        this.offset = offset
        this.angle = angle

        this.startLifeTime = 50
        this.lifeTime = this.startLifeTime
        this.color = 'yellow'
        this.force = 5
        id++

        if (id > 100000) {
            id = 0
        }

        this.game.audioPlayer.play(shotSound)
    }

    blood() {
        //* BLOOD
        this.force = 0
        this.size = 10
        this.speed = 0
        this.velocity = { x: 0, y: 0 }
        this.friction = 0
        let baseAlpha = 1
        this.color = `rgba(196, 0, 0, ${baseAlpha})`
        this.removeBullet(10000)
    }

    impact() {
        //* IMPACT
        let speed = this.speed
        this.force = 0
        this.size = speed / 2
        this.speed = 0
        this.velocity = { x: 0, y: 0 }
        this.friction = 0
        this.color = 'white'
        setTimeout(() => {
            this.size = speed
            this.color = 'grey'
        }, 100)
        setTimeout(() => {
            this.size = speed * 2
        }, 150)
        this.removeBullet(200)
    }

    removeBullet(time) {
        setTimeout(() => {
            for (var i = 0; i < this.game.bullets.length; i++) {
                if (this.game.bullets[i].id === this.id) {
                    this.game.bullets.splice(i, 1)
                }
            }
        }, time)
    }

    update() {
        //* Security ?!
        this.lifeTime--

        if (this.lifeTime < 0) {
            this.removeBullet()
            return
        }

        this.position.x += this.speed * Math.cos(this.angle)
        this.position.y += this.speed * Math.sin(this.angle)

        if (
            this.position.x > this.game.terrain.width ||
            this.position.x < 0 ||
            this.position.y > this.game.terrain.height ||
            this.position.y < 0
        ) {
            this.removeBullet()
            return
        }

        this.game.canvas.save()
        //* le blur qui nique les perfs ;)
        // if (this.force === 0) {
        //     this.game.canvas.filter = 'blur(1px)';
        // }

        this.game.canvas.fillStyle = this.color
        this.game.canvas.fillRect(
            this.position.x - this.size / 2,
            this.position.y - this.size / 2,
            this.size,
            this.size
        )
        this.game.canvas.restore()
    }
}

export default Bullet
