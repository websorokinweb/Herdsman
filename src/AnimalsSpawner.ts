import { Application, Renderer } from 'pixi.js'
import Animal from './Animal'
import getRandomInt from './getRandomInt'

const MIN_ANIMALS_COUNT_TO_SPAWN: number = 6
const MAX_ANIMALS_COUNT_TO_SPAWN: number = 12

const MIN_SECONDS_TO_SPAWN: number = 30
const MAX_SECONDS_TO_SPAWN: number = 60

export class AnimalsSpawner {
	private app: Application<Renderer>
	private animals: Animal[] = []

	constructor(app: Application<Renderer>, animals: Animal[]) {
		this.app = app
		this.animals = animals
	}

	init(): void {
		this.spawnAnimals()

		let elapsedSeconds = 0
		let secondsTillNextSpawn = getRandomInt(
			MIN_SECONDS_TO_SPAWN,
			MAX_SECONDS_TO_SPAWN,
		)
		this.app.ticker.add((ticker) => {
			elapsedSeconds += ticker.elapsedMS / 1000
			if (elapsedSeconds >= secondsTillNextSpawn) {
				this.spawnAnimals()
				elapsedSeconds = 0
				secondsTillNextSpawn = getRandomInt(
					MIN_SECONDS_TO_SPAWN,
					MAX_SECONDS_TO_SPAWN,
				)
			}
		})
	}

	spawnAnimals(): void {
		const animalsCount = getRandomInt(
			MIN_ANIMALS_COUNT_TO_SPAWN,
			MAX_ANIMALS_COUNT_TO_SPAWN,
		)
		for (let i = 0; i < animalsCount; i++) {
			const x = Math.floor(Math.random() * this.app.screen.width)
			const y = Math.floor(Math.random() * this.app.screen.height)

			const newAnimal = new Animal(this.app)
			newAnimal.spawn(x, y)
			this.animals.push(newAnimal)
		}
	}
}
