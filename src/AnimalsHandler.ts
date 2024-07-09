import { Application, Renderer } from 'pixi.js'
import Animal from './Animal'
import Player from './Player'
import EntityHandler from './EntityHandler'
import GameScore from './GameScore'
import DestinationField from './DestinationField'

const ANIMAL_CAN_JOIN_GROUP_DISTANCE: number = 70
const ANIMAL_TOO_FAR_FROM_MAIN_HERO_DISTANCE: number = 500

export default class AnimalsHandler {
	private app: Application<Renderer>

	private animals: Animal[] = []
	private mainHero: Player
	private gameScore: GameScore
	private destinationField: DestinationField

	constructor(
		app: Application<Renderer>,
		animals: Animal[],
		mainHero: Player,
		gameScore: GameScore,
		destinationField: DestinationField,
	) {
		this.app = app
		this.animals = animals
		this.mainHero = mainHero
		this.gameScore = gameScore
		this.destinationField = destinationField
	}

	handleAnimalGroups(): void {
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
		}
	}

	handleGameScore(): void {
		for (const animal of this.animals) {
			if (
				!animal.getDidReachDestination() &&
				this.destinationField.isEntityOnTheTerritory(animal)
			) {
				animal.setDidReachDestination(true)
				this.gameScore.incrementScore()
			}
		}
	}
}
