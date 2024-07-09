import { Application, Renderer } from 'pixi.js'
import Animal from './Animal'
import getRandomInt from './getRandomInt'

const MIN_ANIMALS_COUNT_TO_SPAWN: number = 6
const MAX_ANIMALS_COUNT_TO_SPAWN: number = 12

export class AnimalsSpawner {
	private app: Application<Renderer>
	private addAnimal: (newAnimal: Animal) => void

	constructor(
		app: Application<Renderer>,
		addAnimal: (newAnimal: Animal) => void,
	) {
		this.app = app

		this.addAnimal = addAnimal
	}

	init(): void {
		this.spawnAnimals()
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
			this.addAnimal(newAnimal)
		}
	}
}
