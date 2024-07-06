import { Application, Graphics, Renderer } from "pixi.js";

export class Player {
  private app: Application<Renderer>;

  private playerGraphics: Graphics;

  constructor(app: Application<Renderer>) {
    this.app = app

    this.playerGraphics = this.spawn()
  }

  private spawn(): Graphics{
    const newPlayer: Graphics = new Graphics().circle(0, 0, 25).fill(0xff0000)

		newPlayer?.position.set(this.app.screen.width / 2, this.app.screen.height / 2)

		this.app.stage.addChild(newPlayer)
    newPlayer.zIndex = 2000

		return newPlayer
  }

  move(x: number, y: number) {
    this.playerGraphics.position.set(x, y)
  }

  getX(): number {
    return this.playerGraphics.x
  }

  getY(): number {
    return this.playerGraphics.y
  }
}