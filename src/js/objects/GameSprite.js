const SPEED = 50

export default class GameSprite extends Phaser.Plugin.Isometric.IsoSprite {
  constructor (game, x, y, z, key, frame, group) {
    group = group || game.world

    super(game, x, y, z, key, frame)

    this.anchor.set(0.5)

    this.animation = null

    group.add(this)
  }

  stop () {
    this.body.velocity.x = 0
    this.body.velocity.y = 0
    this.body.velocity.z = 0
  }

  move (direction) {
    this.stop()

    switch (direction) {
      case DIRECTION.UP:
        this.body.velocity.y = -SPEED
      break

      case DIRECTION.RIGHT:
        this.body.velocity.x = SPEED
      break

      case DIRECTION.DOWN:
        this.body.velocity.y = SPEED
      break

      case DIRECTION.LEFT:
        this.body.velocity.x = -SPEED
    }
  }
}
