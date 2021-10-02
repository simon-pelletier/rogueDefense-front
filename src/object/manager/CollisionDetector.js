import ColliderStroke from './ColliderStroke'

class CollisionDetector {
    constructor(game) {
        this.game = game
        this.colliderStroke = new ColliderStroke(game)
    }

    checkEnemy(enemy) {
        let elementCollider = {
            x: enemy.position.x,
            y: enemy.position.y,
            xMax: enemy.position.x + enemy.size,
            yMax: enemy.position.y + enemy.size,
        }

        this.colliderStroke.stroke(elementCollider)

        let coreCollider = {
            x: this.game.core.position.x,
            y: this.game.core.position.y,
            xMax: this.game.core.position.x + this.game.core.size,
            yMax: this.game.core.position.y + this.game.core.size,
        }

        if (
            elementCollider.x < coreCollider.xMax &&
            elementCollider.xMax > coreCollider.x &&
            elementCollider.y < coreCollider.yMax &&
            elementCollider.yMax > coreCollider.y
        ) {
            this.game.core.reduceLife(enemy.force)
        }

        if (this.game.players.length > 0) {
            for (const player of this.game.players) {
                let targetCollider = {
                    x: player.position.x,
                    y: player.position.y,
                    xMax: player.position.x + player.size,
                    yMax: player.position.y + player.size,
                }

                if (
                    elementCollider.x < targetCollider.xMax &&
                    elementCollider.xMax > targetCollider.x &&
                    elementCollider.y < targetCollider.yMax &&
                    elementCollider.yMax > targetCollider.y
                ) {
                    player.reduceLife(enemy.force)
                }
            }
        }

        if (this.game.walls.length > 0) {
            for (const wall of this.game.walls) {
                let targetCollider = {
                    x: wall.shape.x,
                    y: wall.shape.y,
                    xMax: wall.shape.x + wall.shape.width,
                    yMax: wall.shape.y + wall.shape.height,
                }

                if (
                    elementCollider.x < targetCollider.xMax &&
                    elementCollider.xMax > targetCollider.x &&
                    elementCollider.y < targetCollider.yMax &&
                    elementCollider.yMax > targetCollider.y
                ) {
                    enemy.position.x = enemy.lastPosition.x
                    enemy.position.y = enemy.lastPosition.y
                }
            }
        }

        // if (this.game.enemies.length > 1) {
        //     for (const otherEnemy of this.game.enemies) {
        //         if (otherEnemy.id !== enemy.id) {
        //             let targetCollider = {
        //                 x: otherEnemy.position.x,
        //                 y: otherEnemy.position.y,
        //                 xMax: otherEnemy.position.x + otherEnemy.size,
        //                 yMax: otherEnemy.position.y + otherEnemy.size,
        //             }

        //             if (
        //                 elementCollider.x < targetCollider.xMax &&
        //                 elementCollider.xMax > targetCollider.x &&
        //                 elementCollider.y < targetCollider.yMax &&
        //                 elementCollider.yMax > targetCollider.y
        //             ) {
        //                 enemy.position.x = enemy.lastPosition.x
        //                 enemy.position.y = enemy.lastPosition.y
        //                 // otherEnemy.reduceLife(enemy.force)
        //             }
        //         }
        //     }
        // }
    }

    checkPlayerBounds(player) {
        //* VS MAP BOUNDS
        if (player.position.x >= this.game.terrain.width - player.size) {
            player.position.x = this.game.terrain.width - player.size
        } else if (player.position.x <= 0) {
            player.position.x = 0
        }

        if (player.position.y > this.game.terrain.height - player.size) {
            player.position.y = this.game.terrain.height - player.size
        } else if (player.position.y <= 0) {
            player.position.y = 0
        }

        let elementCollider = {
            x: player.position.x,
            y: player.position.y,
            xMax: player.position.x + player.size,
            yMax: player.position.y + player.size,
        }

        this.colliderStroke.stroke(elementCollider)

        //* VS WALLS
        if (this.game.walls.length > 0) {
            for (const wall of this.game.walls) {
                let targetCollider = {
                    x: wall.shape.x,
                    y: wall.shape.y,
                    xMax: wall.shape.x + wall.shape.width,
                    yMax: wall.shape.y + wall.shape.height,
                }

                this.colliderStroke.stroke(targetCollider)

                // if (elementCollider.x <= targetCollider.xMax && elementCollider.xMax >= targetCollider.x) {
                //     // player.position.x = player.lastPosition.x
                //     player.velocity.x = 0
                // }

                if (
                    elementCollider.x < targetCollider.xMax &&
                    elementCollider.xMax > targetCollider.x &&
                    elementCollider.y < targetCollider.yMax &&
                    elementCollider.yMax > targetCollider.y
                ) {
                    player.velocity.x = -player.lastVelocity.x
                    player.velocity.y = -player.lastVelocity.y
                    // player.friction = 0
                    // player.position.x = player.lastPosition.x
                    // player.position.y = player.lastPosition.y
                }
            }
        }
    }

    checkBullets() {
        if (this.game.bullets.length > 0) {
            for (const bullet of this.game.bullets) {
                let elementCollider = {
                    x: bullet.position.x,
                    y: bullet.position.y,
                    xMax: bullet.position.x + bullet.size,
                    yMax: bullet.position.y + bullet.size,
                }

                //* VS CORE
                // let coreCollider = {
                //     x: this.game.core.position.x,
                //     y: this.game.core.position.y,
                //     xMax: this.game.core.position.x + this.game.core.size,
                //     yMax: this.game.core.position.y + this.game.core.size,
                // }

                // if (
                //     elementCollider.x < coreCollider.xMax &&
                //     elementCollider.xMax > coreCollider.x &&
                //     elementCollider.y < coreCollider.yMax &&
                //     elementCollider.yMax > coreCollider.y &&
                //     this.game.core.life > 0
                // ) {
                //     this.game.core.reduceLife(bullet.force)
                //     bullet.impact()
                // }

                //* VS PLAYER
                // if (this.game.players.length > 0) {
                //     for (const player of this.game.players) {
                //         let playerCollider = {
                //             x: player.position.x - player.size,
                //             y: player.position.y - player.size,
                //             xMax: player.position.x + player.size,
                //             yMax: player.position.y + player.size,
                //         }
                //         if (
                //             elementCollider.x < playerCollider.xMax &&
                //             elementCollider.xMax > playerCollider.x &&
                //             elementCollider.y < playerCollider.yMax &&
                //             elementCollider.yMax > playerCollider.y &&
                //             //* préserve le tireur un temps
                //             bullet.lifeTime < bullet.startLifeTime - 20
                //         ) {
                //             //* préserve les joueurs de coups alliés / 4
                //             player.reduceLife(bullet.force / 4)
                //             bullet.blood()
                //             // bullet.removeBullet()
                //         }
                //     }
                // }

                //* VS ENEMIES
                if (this.game.enemies.length > 0) {
                    for (const enemy of this.game.enemies) {
                        let enemyCollider = {
                            x: enemy.position.x - enemy.size,
                            y: enemy.position.y - enemy.size,
                            xMax: enemy.position.x + enemy.size,
                            yMax: enemy.position.y + enemy.size,
                        }
                        if (
                            elementCollider.x < enemyCollider.xMax &&
                            elementCollider.xMax > enemyCollider.x &&
                            elementCollider.y < enemyCollider.yMax &&
                            elementCollider.yMax > enemyCollider.y
                        ) {
                            enemy.reduceLife(bullet.force)
                            bullet.blood()
                            // bullet.removeBullet()
                        }
                    }
                }

                //* VS WALLS
                if (this.game.walls.length > 0) {
                    for (const wall of this.game.walls) {
                        let targetCollider = {
                            x: wall.shape.x,
                            y: wall.shape.y,
                            xMax: wall.shape.x + wall.shape.width,
                            yMax: wall.shape.y + wall.shape.height,
                        }
                        if (
                            elementCollider.x < targetCollider.xMax &&
                            elementCollider.xMax > targetCollider.x &&
                            elementCollider.y < targetCollider.yMax &&
                            elementCollider.yMax > targetCollider.y
                        ) {
                            bullet.impact()
                            // bullet.removeBullet()
                        }
                    }
                }
            }
        }
    }

    check() {
        this.checkBullets()
    }
}

export default CollisionDetector
