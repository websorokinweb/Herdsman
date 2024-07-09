import { Application, Renderer, Text } from 'pixi.js'
import HasScore from './HasScore'

export default class GameScore {
	private app: Application<Renderer>
	private scoreOwner: HasScore

	private scoreCounterText: Text | null = null

	constructor(app: Application<Renderer>, scoreOwner: HasScore) {
		this.app = app
		this.scoreOwner = scoreOwner
	}

	init(): void {
		const newScoreCounterText: Text = new Text({
			text: this.getScore().toString(),
			style: {
				fill: 0xffffff,
				fontSize: 24,
			},
		})

		newScoreCounterText.position.set(10, 10)

		newScoreCounterText.zIndex = 9999

		this.app.stage.addChild(newScoreCounterText)

		this.scoreCounterText = newScoreCounterText
	}

	getScore(): number {
		return this.scoreOwner.getScore()
	}

	setScore(score: number): void {
		this.scoreOwner.setScore(score)
		this.updateScore()
	}

	incrementScore(): void {
		this.setScore(this.getScore() + 1)
		this.updateScore()
	}

	private updateScore(): void {
		if (this.scoreCounterText === null) {
			return
		}

		this.scoreCounterText.text = this.getScore().toString()
	}
}
