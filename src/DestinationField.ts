import { Application, Graphics, Renderer } from "pixi.js";

export class DestinationField{
  private app: Application<Renderer>;

  private destinationFieldGraphics: Graphics;

  constructor(app: Application<Renderer>) {
    this.app = app

    this.destinationFieldGraphics = this.create()
  }

  private create(): Graphics{
    const newDestinationField: Graphics = new Graphics()
			.rect(0, 0, 300, 500)
			.fill(0xf0e68c)

    newDestinationField.position.set(
			this.app.screen.width - 300,
			this.app.screen.height / 2 - newDestinationField.height / 2,
		)

		this.app.stage.addChild(newDestinationField)
    newDestinationField.zIndex = 1000

		return newDestinationField
  }
}