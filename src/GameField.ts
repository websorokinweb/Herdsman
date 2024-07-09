import { Application, FederatedPointerEvent, Graphics, Renderer } from "pixi.js";

export default class GameField {
  private app: Application<Renderer>;

  private gameFieldGraphics: Graphics;

  constructor(app: Application<Renderer>, onGameFieldPointerDown: (pointerDownEvent: FederatedPointerEvent) => void){
    this.app = app

    this.gameFieldGraphics = this.create(onGameFieldPointerDown)
  }

  private create(onGameFieldPointerDown: (pointerDownEvent: FederatedPointerEvent) => void): Graphics{
    const newGameField: Graphics = new Graphics()
			.rect(0, 0, this.app.screen.width, this.app.screen.height)
			.fill('#3B5D17')

		this.app.stage.addChild(newGameField)

		newGameField.on('pointerdown', (pointerDownEvent) => {
			onGameFieldPointerDown(pointerDownEvent)
		})
		newGameField.eventMode = 'static'

		return newGameField
  }
}