import { Application, Graphics, Renderer } from 'pixi.js'
import Entity from './Entity'

export default class Animal implements Entity {
	private app: Application<Renderer>

	private animalGraphics: Graphics | null = null

	private didReachDestination: boolean = false

	constructor(app: Application<Renderer>) {
		this.app = app
	}

	spawn(x: number, y: number): void {
		if (this.animalGraphics != null) {
			return
		}

		const animalGraphic = new Graphics().circle(0, 0, 20).fill(0xffffff)

		animalGraphic.position.set(x, y)

		this.app.stage.addChild(animalGraphic)
		animalGraphic.zIndex = 3000

		this.animalGraphics = animalGraphic
	}

	move(x: number, y: number) {
		if (this.animalGraphics == null) {
			return
		}

		this.animalGraphics.position.set(x, y)
	}

	getX(): number {
		if (this.animalGraphics == null) {
			return NaN
		}

		return this.animalGraphics.x
	}

	getY(): number {
		if (this.animalGraphics == null) {
			return NaN
		}

		return this.animalGraphics.y
	}

	getWidth(): number {
		if (this.animalGraphics == null) {
			return NaN
		}

		return this.animalGraphics.width
	}

	getHeight(): number {
		if (this.animalGraphics == null) {
			return NaN
		}

		return this.animalGraphics.height
	}

	getDidReachDestination(): boolean {
		return this.didReachDestination
	}

	setDidReachDestination(didReachDestination: boolean): void {
		this.didReachDestination = didReachDestination
	}
}
