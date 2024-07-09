import { Application, FederatedPointerEvent, Renderer } from 'pixi.js'
import GameField from './GameField'
import Player from './Player'
import DestinationField from './DestinationField'
import Animal from './Animal'
import GameScore from './GameScore'
import { AnimalsSpawner } from './AnimalsSpawner'
import AnimalsHandler from './AnimalsHandler'

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

		const onGameFieldPointerDown = (
			pointerDownEvent: FederatedPointerEvent,
		) => {
			this.mainHero?.move(pointerDownEvent.x, pointerDownEvent.y)
		}
		new GameField(this.app, onGameFieldPointerDown)

		this.mainHero = new Player(this.app)
		this.mainHero.spawn()

		this.gameScore = new GameScore(this.app, this.mainHero)
		this.gameScore.init()

		const animalSpawner = new AnimalsSpawner(this.app, this.animals)
		animalSpawner.init()

		this.destinationField = new DestinationField(this.app)
		this.destinationField.init()

		const animalsHandler: AnimalsHandler = new AnimalsHandler(
			this.app,
			this.animals,
			this.mainHero,
			this.gameScore,
			this.destinationField,
		)

		this.app.ticker.add(() => {
			if (this.mainHero === null || this.destinationField === null) {
				return
			}

			if (this.animals.length == 0) {
				return
			}

			animalsHandler.handleAnimalGroups()
			animalsHandler.handleGameScore()

			this.mainHero.handleAnimalGroup()
		})
	}
}
