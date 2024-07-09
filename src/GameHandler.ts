import { Application, FederatedPointerEvent, Renderer, Text } from 'pixi.js'
import { GameField } from './GameField'
import { Player } from './Player'
import { DestinationField } from './DestinationField'
import getRandomInt from './getRandomInt'
import { Animal } from './Animal'
import { EntityHandler } from './EntityHandler'

export default class GameHandler {
	private app: Application<Renderer>

	private mainHero: Player | null = null
	private destinationField: DestinationField | null = null
	private animals: Animal[] = []

	constructor(app: Application<Renderer>) {
		this.app = app
	}

	getAppWidth(): number {
		return this.app.screen.width
	}

	getAppHeight(): number {
		return this.app.screen.height
	}

	init(): void {
		this.app.stage.sortableChildren = true

		this.mainHero = new Player(this.app)

		const onGameFieldPointerDown = (
			pointerDownEvent: FederatedPointerEvent,
		) => {
			this.mainHero?.move(pointerDownEvent.x, pointerDownEvent.y)
		}

		new GameField(this.app, onGameFieldPointerDown)

		this.mainHero.spawn()

		this.destinationField = new DestinationField(this.app)

		this.spawnAnimals()

		let mainHeroScoreCounter: Text | null = null

		const addMainHeroScoreCounter = (): Text => {
			const mainHeroScoreCounter: Text = new Text({
				text: '0',
				style: {
					fill: 0xffffff,
					fontSize: 24,
				},
			})

			mainHeroScoreCounter.position.set(10, 10)

			mainHeroScoreCounter.zIndex = 9999

			this.app.stage.addChild(mainHeroScoreCounter)

			return mainHeroScoreCounter
		}

		mainHeroScoreCounter = addMainHeroScoreCounter()

		this.app.ticker.add(() => {
			if (this.mainHero === null || this.destinationField === null) {
				return
			}

			if (this.animals.length == 0) {
				return
			}

			for (const animal of this.animals) {
				const distanceToMainHero: number =
					EntityHandler.getDistanceBetweenEntities(this.mainHero, animal)

				if (distanceToMainHero < 70) {
					this.mainHero.addAnimalToGroup(animal)
				}

				if (distanceToMainHero > 600) {
					this.mainHero.removeAnimalFromGroup(animal)
				}

				if (this.mainHero.isAnimalInGroup(animal)) {
					this.moveAnimalToPlayer(this.mainHero, animal)
				}

				if (
					!animal.getDidReachDestination() &&
					this.destinationField.isAnimalOnTheTerritory(animal)
				) {
					animal.setDidReachDestination(true)
					this.mainHero.incrementScore()
					mainHeroScoreCounter.text = this.mainHero.getScore()
				}
			}
		})
	}

	private spawnAnimals(): void {
		const animalsCount = getRandomInt(6, 12)
		for (let i = 0; i < animalsCount; i++) {
			const x = Math.floor(Math.random() * this.getAppWidth())
			const y = Math.floor(Math.random() * this.getAppHeight())

			const newAnimal = new Animal(this.app)
			newAnimal.spawn(x, y)
			this.animals.push(newAnimal)
		}
	}

	moveAnimalToPlayer(mainHero: Player, animal: Animal): void {
		const xDistance = mainHero.getX() - animal.getX()
		const yDistance = mainHero.getY() - animal.getY()
		const xAbsoluteDistance = Math.abs(xDistance)
		const yAbsoluteDistance = Math.abs(yDistance)

		const isAnimalTooCloseToHero: boolean =
			xAbsoluteDistance < mainHero.getWidth() &&
			yAbsoluteDistance < mainHero.getHeight()

		if (isAnimalTooCloseToHero) {
			return
		}

		let xDirection = 0
		let yDirection = 0

		if (xDistance != 0) {
			if (xDistance > 0) {
				xDirection = 1
			} else {
				xDirection = -1
			}
		}

		if (yDistance != 0) {
			if (yDistance > 0) {
				yDirection = 1
			} else {
				yDirection = -1
			}
		}

		animal.move(animal.getX() + xDirection, animal.getY() + yDirection)
	}
}
