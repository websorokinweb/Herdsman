import { Application, FederatedPointerEvent, Graphics, Text } from 'pixi.js'
import { Animal } from './Animal'
import addStyles from './addStyles'
import { Player } from './Player'
import { DestinationField } from './DestinationField'
import { GameField } from './GameField'
import getRandomInt from './getRandomInt'
import { EntityHandler } from './EntityHandler'
;(async () => {
	const app = new Application()
	await app.init({
		resizeTo: window,
	})

	globalThis.__PIXI_APP__ = app

	document.body.appendChild(app.canvas)

	addStyles()

	const appWidth = app.screen.width
	const appHeight = app.screen.height

	app.stage.sortableChildren = true

	const gameField: GameField = new GameField(app, onGameFieldPointerDown)
	const mainHero: Player = new Player(app)
	mainHero.spawn()
	const destinationField: DestinationField = new DestinationField(app)

	let mainHeroScoreCounter: Text | null = null
	const animals: Animal[] = []

	function onGameFieldPointerDown(pointerDownEvent: FederatedPointerEvent) {
		mainHero.move(pointerDownEvent.x, pointerDownEvent.y)
	}

	function addMainHeroScoreCounter(): Text {
		const mainHeroScoreCounter: Text = new Text({
			text: '0',
			style: {
				fill: 0xffffff,
				fontSize: 24,
			},
		})

		mainHeroScoreCounter.position.set(10, 10)

		mainHeroScoreCounter.zIndex = 9999

		app.stage.addChild(mainHeroScoreCounter)

		return mainHeroScoreCounter
	}

	mainHeroScoreCounter = addMainHeroScoreCounter()

	function spawnAnimals() {
		const animalsCount = getRandomInt(6, 12)
		for (let i = 0; i < animalsCount; i++) {
			const x = Math.floor(Math.random() * appWidth)
			const y = Math.floor(Math.random() * appHeight)

			const newAnimal = new Animal(app)
			newAnimal.spawn(x, y)
			animals.push(newAnimal)
		}
	}

	spawnAnimals()

	function moveAnimalToPlayer(mainHero: Player, animal: Animal): void {
		const xDistance = mainHero.getX() - animal.getX()
		const yDistance = mainHero.getY() - animal.getY()
		const xAbsoluteDistance = Math.abs(xDistance)
		const yAbsoluteDistance = Math.abs(yDistance)

		if (
			xAbsoluteDistance < mainHero.getWidth() &&
			yAbsoluteDistance < mainHero.getHeight()
		) {
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

	app.ticker.add((ticker) => {
		if (mainHero == null || mainHero == undefined) {
			return
		}

		if (animals.length == 0) {
			return
		}

		for (const animal of animals) {
			const distanceToMainHero: number =
				EntityHandler.getDistanceBetweenEntities(mainHero, animal)

			if (distanceToMainHero < 70) {
				mainHero.addAnimalToGroup(animal)
			}

			if (distanceToMainHero > 600) {
				mainHero.removeAnimalFromGroup(animal)
			}

			if (mainHero.isAnimalInGroup(animal)) {
				moveAnimalToPlayer(mainHero, animal)
			}

			if (
				!animal.getDidReachDestination() &&
				destinationField.isAnimalOnTheTerritory(animal)
			) {
				animal.setDidReachDestination(true)
				mainHero.incrementScore()
				mainHeroScoreCounter.text = mainHero.getScore()
			}
		}
	})
})()
