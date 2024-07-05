import { Application } from 'pixi.js'

;(async () => {
	const app = new Application()
	await app.init({
		width: 640,
		height: 360,
	})

	globalThis.__PIXI_APP__ = app

	document.body.appendChild(app.canvas)
})()
