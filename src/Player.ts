import { Application, Graphics, Renderer } from 'pixi.js'
import Animal from './Animal'
import Entity from './Entity'
import HasScore from './HasScore'

export default class Player implements Entity, HasScore {
	private app: Application<Renderer>

	private playerGraphics: Graphics | null = null

	private animalsGroup: Animal[] = []

	private score: number = 0

	constructor(app: Application<Renderer>) {
		this.app = app
	}

	spawn(): void {
		if (this.playerGraphics != null) {
			return
		}

		const newPlayer: Graphics = new Graphics().circle(0, 0, 25).fill(0xff0000)

		newPlayer.position.set(
			this.app.screen.width / 2,
			this.app.screen.height / 2,
		)

		this.app.stage.addChild(newPlayer)
		newPlayer.zIndex = 2000

		this.playerGraphics = newPlayer
	}

	move(x: number, y: number) {
		if (this.playerGraphics == null) {
			return
		}

		this.playerGraphics.position.set(x, y)
	}

	getX(): number {
		if (this.playerGraphics == null) {
			return NaN
		}

		return this.playerGraphics.x
	}

	getY(): number {
		if (this.playerGraphics == null) {
			return NaN
		}

		return this.playerGraphics.y
	}

	getWidth(): number {
		if (this.playerGraphics == null) {
			return NaN
		}

		return this.playerGraphics.width
	}

	getHeight(): number {
		if (this.playerGraphics == null) {
			return NaN
		}

		return this.playerGraphics.height
	}

	getScore(): number {
		return this.score
	}

	incrementScore(): void {
		this.score += 1
	}

	setScore(score: number): void {
		this.score = score
	}

	addAnimalToGroup(animal: Animal): void {
		if (this.isAnimalInGroup(animal)) {
			return
		}

		if (this.animalsGroup.length >= 5) {
			return
		}

		this.animalsGroup.push(animal)
	}

	removeAnimalFromGroup(animal: Animal): void {
		this.animalsGroup = this.animalsGroup.filter(
			(animalInGroup) => animalInGroup != animal,
		)
	}

	isAnimalInGroup(animal: Animal): boolean {
		return this.animalsGroup.includes(animal)
	}
}
