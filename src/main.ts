import { Application } from 'pixi.js'
import addStyles from './addStyles'

import GameHandler from './GameHandler'
;(async () => {
	const app = new Application()
	await app.init({
		resizeTo: window,
	})

	globalThis.__PIXI_APP__ = app

	document.body.appendChild(app.canvas)

	addStyles()

	const gameHandler: GameHandler = new GameHandler(app)
	gameHandler.init()
})()
