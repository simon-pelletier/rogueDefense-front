class MiniMap {
    constructor(game) {
        this.game = game
        this.gameSize = game.getWorldSize()
        this.size = 200

        this.miniMap = document.createElement('canvas')
        this.miniMap.width = this.size
        this.miniMap.height = this.size
        this.miniMap.style.position = 'absolute'
        this.miniMap.style.top = '0px'
        this.miniMap.style.left = '0px'

        this.canvasCtx = this.miniMap.getContext('2d')
        this.canvasCtx.imageSmoothingEnabled = true
        document.body.append(this.miniMap)

        this.elements = [
            {
                name: 'players',
                dataset: this.game.players,
                size: 10
            },
            {
                name: 'towers',
                dataset: this.game.towers,
                size: 5
            },
            {
                name: 'enemies',
                dataset: this.game.enemies,
                size: 5
            },
            {
                name: 'core',
                dataset: [this.game.core],
                size: 10
            },
        ]
    }

    updateMiniMap() {
        this.canvasCtx.clearRect(0, 0, this.size, this.size)
        this.canvasCtx.width = this.size
        this.canvasCtx.height = this.size
        this.canvasCtx.fillStyle = `rgba(250,250,250,0.5)`
        this.canvasCtx.fillRect(0, 0, this.size, this.size)

        for (const element of this.elements) {
            if (element.dataset.length) {
                element.dataset.map((elt) => {
                    this.canvasCtx.beginPath()
                    this.canvasCtx.fillStyle = elt.colorFill
                    this.canvasCtx.rect(
                        (elt.getPosition().x / this.game.getWorldSize()) *
                            this.size,
                        (elt.getPosition().y / this.game.getWorldSize()) *
                            this.size,
                        element.size,
                        element.size
                    )
                    this.canvasCtx.fill()
                    this.canvasCtx.closePath()
                })
            }
        }
    }
}

export default MiniMap
