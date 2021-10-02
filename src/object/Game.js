//* OBJECTS
import Player from './Player'
import Enemy from './Enemy'
import Wall from './Wall'
import Bullet from './Bullet'
import Terrain from './Terrain'
import Core from './Core'
import Tower from './Tower'
import MiniMap from './ui/MiniMap'

//* UTILS
import CollisionDetector from './manager/CollisionDetector'
import AudioPlayer from './manager/AudioPlayer'
import Helper from '../helper'

//* IMAGES
import playerSvg from '../assets/image/player.svg'

class Game {
    constructor(canvas) {
        this.canvas = canvas

        this.debugMode = true
        this.soundMode = false

        this.players = []
        this.enemies = []
        this.walls = []
        this.bullets = []
        this.towers = []

        this.worldSize = 2000

        this.collisionDetector = new CollisionDetector(this)
        this.audioPlayer = new AudioPlayer(this)
        this.terrain = new Terrain(this, this.worldSize)

        this.core = new Core(this, this.worldSize / 2, this.worldSize / 2, 20)

        this.miniMap = new MiniMap(this)

        this.delta = 0
        this.zoomSpeed = 0.08
        this.zoom = 0
        this.zoomLimits = { min: 0, max: 5 }

        this.fps = 0

        this.init()
    }

    getFps() {
        return this.fps
    }

    getWorldSize() {
        return this.worldSize
    }

    init() {
        //! Souci sur le zoom qui fait que rien n'est fiable !!!
        window.addEventListener('wheel', (e) => {
            if (e.deltaY < 0) {
                if (this.zoom < this.zoomLimits.max) {
                    this.zoom++
                }
            } else {
                if (this.zoom > this.zoomLimits.min) {
                    this.zoom--
                }
            }
            if (
                this.zoom > this.zoomLimits.min &&
                this.zoom < this.zoomLimits.max
            ) {
                const delta = Math.sign(e.deltaY)
                this.delta = -delta * this.zoomSpeed
                this.canvas.translate(
                    this.canvas.width / 2,
                    this.canvas.height / 2
                )
                this.canvas.scale(1 + this.delta, 1 + this.delta)
                this.canvas.translate(
                    -this.canvas.width / 2,
                    -this.canvas.height / 2
                )
                //* resize de canvas au Zoom/Dezoom
                // this.canvas.width = window.innerWidth * this.delta * 10
                // this.canvas.height = window.innerHeight * this.delta * 10
            }
        })

        //* OBSTACLES
        // let wall = new Wall(this, 400, 400, 20, 200)
        // this.walls.push(wall)
        // let wall2 = new Wall(this, 800, 300, 400, 50)
        // this.walls.push(wall2)

        //* TOWERS
        let tower = new Tower(
            this,
            this.worldSize / 2 - 100,
            this.worldSize / 2 + 200,
            20,
            'bullet'
        )
        this.towers.push(tower)
        let tower2 = new Tower(
            this,
            this.worldSize / 2 - 200,
            this.worldSize / 2 - 200,
            20,
            'laser'
        )
        this.towers.push(tower2)
        let tower3 = new Tower(
            this,
            this.worldSize / 2 + 200,
            this.worldSize / 2 - 300,
            20,
            'bullet'
        )
        this.towers.push(tower3)
        let tower4 = new Tower(
            this,
            this.worldSize / 2 + 250,
            this.worldSize / 2 + 250,
            20,
            'laser'
        )
        this.towers.push(tower4)

        //* PLAYER ONE
        let playerImg = new Image()
        playerImg.src = playerSvg
        let player = new Player(this, 1, 'UnicornBuster', playerImg)
        this.players.push(player)

        //* ENEMIES POPULATION
        setInterval(() => {
            if (this.enemies.length < 3) {
                this.enemies.push(
                    new Enemy(
                        this,
                        Helper.randomRange(0, this.terrain.width),
                        Helper.randomRange(0, this.terrain.height)
                    )
                )
            }
        }, 500)

        // setInterval(() => {
        //   canvas.clearRect(0, 0, canvas.width, canvas.height);
        //   canvas.beginPath();
        //   player.draw();
        // }, 100);
    }

    update() {
        //* Centre la camera sur le joueur !
        this.canvas.save()
        this.canvas.translate(
            -this.players[0].position.x + this.canvas.width / 2,
            -this.players[0].position.y + this.canvas.height / 2
        )

        this.collisionDetector.check()

        this.terrain.updateTerrain()
        this.miniMap.updateMiniMap()

        this.core.update()

        for (var l = 0; l < this.towers.length; l++) {
            this.towers[l].update()
        }

        for (var k = 0; k < this.walls.length; k++) {
            this.walls[k].update()
        }

        for (var i = 0; i < this.players.length; i++) {
            this.players[i].update()
        }

        for (var j = 0; j < this.enemies.length; j++) {
            this.enemies[j].update()
            if (this.enemies[j].life <= 0) {
                this.enemies.splice(j, 1)
            }
        }

        this.canvas.restore()
    }
}

export default Game
