import { Application, FederatedPointerEvent, Renderer } from 'pixi.js'
import GameField from './GameField'
import Player from './Player'
import DestinationField from './DestinationField'
import getRandomInt from './getRandomInt'
import Animal from './Animal'
import EntityHandler from './EntityHandler'
import GameScore from './GameScore'
import { AnimalsSpawner } from './AnimalsSpawner'

const ANIMAL_CAN_JOIN_GROUP_DISTANCE: number = 70
const ANIMAL_TOO_FAR_FROM_MAIN_HERO_DISTANCE: number = 500

export default class GameHandler {
	private app: Application<Renderer>

	private mainHero: Player | null = null
	private destinationField: DestinationField | null = null
	private animals: Animal[] = []
	private gameScore: GameScore | null = null

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

		this.gameScore = new GameScore(this.app, this.mainHero)
		this.gameScore.init()

		const onGameFieldPointerDown = (
			pointerDownEvent: FederatedPointerEvent,
		) => {
			this.mainHero?.move(pointerDownEvent.x, pointerDownEvent.y)
		}

		new GameField(this.app, onGameFieldPointerDown)

		const addAnimal: (newAnimal: Animal) => void = (newAnimal: Animal) => {
			this.animals.push(newAnimal)
		}
		const animalSpawner = new AnimalsSpawner(this.app, addAnimal)
		animalSpawner.init()

		this.mainHero.spawn()

		this.destinationField = new DestinationField(this.app)

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

				const canAnimalJoinGroup: boolean =
					distanceToMainHero < ANIMAL_CAN_JOIN_GROUP_DISTANCE
				if (canAnimalJoinGroup) {
					this.mainHero.addAnimalToGroup(animal)
				}

				const isAnimalTooFarFromMainHero: boolean =
					distanceToMainHero > ANIMAL_TOO_FAR_FROM_MAIN_HERO_DISTANCE
				if (isAnimalTooFarFromMainHero) {
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
					this.gameScore?.incrementScore()
				}
			}
		})
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
