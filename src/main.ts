import { Application, Graphics, Text } from 'pixi.js'
import { Animal } from './Animal'
import addStyles from './addStyles'
import { Player } from './Player'
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

	let gameField: Graphics | null = null
	let mainHero: Player = new Player(app)
	let destinationField: Graphics | null = null

	let mainHeroScoreCounter: Text | null = null
	const animals: Animal[] = []

	function addGameField(): Graphics {
		const gameField: Graphics = new Graphics()
			.rect(0, 0, appWidth, appHeight)
			.fill('#3B5D17')

		app.stage.addChild(gameField)

		gameField.on('pointerdown', (pointerDownEvent) => {
			console.log({ pointerDownEvent })
			mainHero.move(pointerDownEvent.x, pointerDownEvent.y)
		})
		gameField.eventMode = 'static'

		return gameField
	}

	// console.log(app.ticker.deltaTime)
	// console.log(app.ticker.minFPS)
	// console.log(app.ticker.maxFPS)
	// console.log(app.ticker.FPS)

	gameField = addGameField()

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

	function addDestinationField(): Graphics {
		const destinationField: Graphics = new Graphics()
			.rect(0, 0, 300, 500)
			.fill(0xf0e68c)

		destinationField.position.set(
			appWidth - 300,
			appHeight / 2 - destinationField.height / 2,
		)

		app.stage.addChild(destinationField)

		return destinationField
	}

	destinationField = addDestinationField()

	function spawnAnimals() {
		for (let i = 0; i < 10; i++) {
			const x = Math.floor(Math.random() * appWidth)
			const y = Math.floor(Math.random() * appHeight)

			const newAnimal = new Animal(app, x, y)
			animals.push(newAnimal)
		}
	}

	spawnAnimals()

  function moveAnimalToPlayer(mainHero: Player, animal: Animal) {
    const xDistance = mainHero.getX() - animal.getX()
    const yDistance = mainHero.getY() - animal.getY()

    let xDirection = 0
    let yDirection = 0

    if(xDistance != 0){
      if(xDistance > 0){
        xDirection = 1
      } else {
        xDirection = -1
      }
    }

    if(yDistance != 0){
      if(yDistance > 0){
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
			const distance = Math.sqrt(
				Math.pow(mainHero.getX() - animal.getX(), 2) +
					Math.pow(mainHero.getY() - animal.getY(), 2),
			)

			if (distance < 70) {
        mainHero.addAnimalToGroup(animal)
      }
      
      if(distance > 600){
        mainHero.removeAnimalFromGroup(animal)
      }

      if(mainHero.isAnimalInGroup(animal)){
        moveAnimalToPlayer(mainHero, animal)
      }
		}

	})
})()
