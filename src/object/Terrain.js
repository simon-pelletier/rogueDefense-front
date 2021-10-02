import Tile from './Tile'
import Helper from '../helper'

class Terrain {
    constructor(game, size) {
        this.game = game

        this.width = size
        this.height = size

        this.tileSize = 50

        this.tiles = []

        this.grassColors = [
            `#4B663E`,
            `#3C5232`,
            `#304228`,
            `#263520`,
        ]

        this.generateTerrain()
    }

    generateTerrain() {
        for (var i = 0; i < this.width; i += this.tileSize) {
            for (var j = 0; j < this.height; j += this.tileSize) {
                this.tiles.push(
                    new Tile(
                        this.game,
                        i,
                        j,
                        this.tileSize,
                        this.grassColors[
                            parseInt(Helper.randomRange(0, this.grassColors.length))
                        ]
                    )
                )
            }
        }
    }

    updateTerrain() {
        //* FOND DE TERRAIN
        this.game.canvas.beginPath()
        this.game.canvas.fillStyle = 'darkslateblue'
        this.game.canvas.rect(0, 0, this.width, this.height)
        this.game.canvas.fill()

        //* TILES
        for (const tile of this.tiles) {
            tile.update()
        }

        //* GRILLE
        //! optimisation à faire !
        // this.game.canvas.strokeStyle = 'grey'
        // this.game.canvas.lineWidth = 1
        // for (var i = 0; i < this.width; i += this.tileSize) {
        //     this.game.canvas.beginPath()
        //     this.game.canvas.moveTo(i, 0)
        //     this.game.canvas.lineTo(i, this.height)
        //     this.game.canvas.stroke()
        //     this.game.canvas.closePath()
        // }
        // for (var j = 0; j < this.height; j += this.tileSize) {
        //     this.game.canvas.beginPath()
        //     this.game.canvas.moveTo(0, j)
        //     this.game.canvas.lineTo(this.width, j)
        //     this.game.canvas.stroke()
        //     this.game.canvas.closePath()
        // }
    }
}

export default Terrain
