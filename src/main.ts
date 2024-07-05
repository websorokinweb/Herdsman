import { Application, Graphics } from 'pixi.js'
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

	let gameField: Graphics | null = null
	let mainHero: Graphics | null = null

	function addGameField(): Graphics {
		const gameField = new Graphics()
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

	gameField = addGameField()

	function addMainHero(): Graphics {
		const mainHero = new Graphics().circle(0, 0, 50).fill(0xff0000)

		mainHero?.position.set(appWidth / 2, appHeight / 2)

		app.stage.addChild(mainHero)

		mainHero.on('pointerdown', (pointerDownEvent) => {
			console.log({ pointerDownEvent })
		})
		mainHero.eventMode = 'static'

		return mainHero
	}

	function moveMainHero(x: number, y: number) {
		mainHero?.position.set(x, y)
	}

	mainHero = addMainHero()
})()

function addStyles(): void {
	const link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'src/style.css'
	document.head.appendChild(link)
}
