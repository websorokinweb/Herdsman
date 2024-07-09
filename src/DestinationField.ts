import { Application, Graphics, Renderer } from 'pixi.js'
import Entity from './Entity'

export default class DestinationField {
	private app: Application<Renderer>

	private destinationFieldGraphics: Graphics | null = null

	constructor(app: Application<Renderer>) {
		this.app = app
	}

	init(): void {
		const newDestinationField: Graphics = new Graphics()
			.rect(0, 0, 300, 500)
			.fill(0xf0e68c)

		newDestinationField.position.set(
			this.app.screen.width - 300,
			this.app.screen.height / 2 - newDestinationField.height / 2,
		)

		this.app.stage.addChild(newDestinationField)
		newDestinationField.zIndex = 1000

		this.destinationFieldGraphics = newDestinationField
	}

	isEntityOnTheTerritory(entity: Entity): boolean {
		if (this.destinationFieldGraphics == null) {
			return false
		}

		const entityX = entity.getX()
		const entityY = entity.getY()

		const destinationFieldX = this.destinationFieldGraphics.x
		const destinationFieldY = this.destinationFieldGraphics.y

		const destinationFieldWidth = this.destinationFieldGraphics.width
		const destinationFieldHeight = this.destinationFieldGraphics.height

		if (
			entityX >= destinationFieldX &&
			entityX <= destinationFieldX + destinationFieldWidth &&
			entityY >= destinationFieldY &&
			entityY <= destinationFieldY + destinationFieldHeight
		) {
			return true
		}

		return false
	}
}
