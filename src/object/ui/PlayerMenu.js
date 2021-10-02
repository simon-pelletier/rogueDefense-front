class PlayerMenu {
    constructor(game) {
        this.game = game
        this.position = { x: 0, y: 0 }
        this.element = document.createElement('div')

        this.tool = null

        this.towerBullet = document.createElement('div')
        this.towerBullet.innerHTML = 'TOWER BULLET'
        this.towerBullet.addEventListener('click', () =>
            this.clickMenu('towerBullet')
        )

        this.towerLaser = document.createElement('div')
        this.towerLaser.innerHTML = 'TOWER LASER'
        this.towerLaser.addEventListener('click', () =>
            this.clickMenu('towerLaser')
        )

        this.element.style.height = '300px'
        this.element.style.width = '200px'
        this.element.style.top = '0px'
        this.element.style.right = '0px'
        this.element.style.zIndex = 10
        this.element.style.zIndex = 10
        this.element.style.position = 'absolute'
        this.element.style.backgroundColor = `rgba(250,250,250,0.5)`

        this.element.append(this.towerBullet)
        this.element.append(this.towerLaser)
        document.body.append(this.element)

        document.addEventListener('contextmenu', this.rightClick)
    }

    clickMenu(e) {
        this.tool = e
    }

    rightClick(e) {
        e.preventDefault()
        this.tool = null
    }

    update() {
        // this.game.canvas.beginPath()
        // this.game.canvas.fillStyle = `rgba(250,250,250,0.5)`
        // this.game.canvas.rect(this.position.x, this.position.y, 200, 400)
        // this.game.canvas.fill()
        // this.game.canvas.strokeStyle = 'yellow'
        // this.game.canvas.moveTo(
        //     this.element.position.x + this.element.size / 2,
        //     this.element.position.y + this.element.size / 2
        // )
        // this.game.canvas.lineTo(this.target.position.x + this.target.size / 2, this.target.position.y + this.target.size / 2)
        // this.game.canvas.stroke()
        // this.game.canvas.stroke()
    }
}

export default PlayerMenu
