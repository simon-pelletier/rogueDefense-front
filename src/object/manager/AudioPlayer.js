class AudioPlayer {
    constructor(game) {
        this.game = game
    }

    play(element) {
        if (this.game.soundMode) {
            let sound = new Audio(element)
            sound.play()
        }
    }
}

export default AudioPlayer
