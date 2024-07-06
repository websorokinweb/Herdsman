import { Application, Graphics, Text } from 'pixi.js'
;import { Animal } from './Animal';
(async () => {
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
	let mainHero: Graphics | null = null
	let destinationField: Graphics | null = null

  let mainHeroScoreCounter: Text | null = null
  const animals: Graphics[] = []

	function addGameField(): Graphics {
		const gameField: Graphics = new Graphics()
			.rect(0, 0, appWidth, appHeight)
			.fill('#3B5D17')

		app.stage.addChild(gameField)

		gameField.on('pointerdown', (pointerDownEvent) => {
			console.log({ pointerDownEvent })
			moveMainHero(pointerDownEvent.x, pointerDownEvent.y)
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
        fill: 0xFFFFFF,
        fontSize: 24
      }
    })

    mainHeroScoreCounter.position.set(10, 10)

    mainHeroScoreCounter.zIndex = 9999

    app.stage.addChild(mainHeroScoreCounter)

    return mainHeroScoreCounter
  }

  mainHeroScoreCounter = addMainHeroScoreCounter()

  function addDestinationField(): Graphics {
    const destinationField: Graphics = new Graphics().rect(0, 0, 300, 500).fill(0xF0E68C)

    destinationField.position.set(appWidth - 300, (appHeight / 2) - destinationField.height / 2)

    app.stage.addChild(destinationField)

    return destinationField
  }

  destinationField = addDestinationField()

	function addMainHero(): Graphics {
		const mainHero: Graphics = new Graphics().circle(0, 0, 25).fill(0xff0000)

		mainHero?.position.set(appWidth / 2, appHeight / 2)

		app.stage.addChild(mainHero)

		return mainHero
	}

	function moveMainHero(x: number, y: number) {
		mainHero?.position.set(x, y)
	}

	mainHero = addMainHero()

  function spawnAnimals(){
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * appWidth)
      const y = Math.floor(Math.random() * appHeight)

      new Animal(app, x, y)
    }
  }

  spawnAnimals()
})()

function addStyles(): void {
	const link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'src/style.css'
	document.head.appendChild(link)
}
