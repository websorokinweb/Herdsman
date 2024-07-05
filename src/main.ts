import { Application } from 'pixi.js'
;(async () => {
	const app = new Application()
	await app.init({
		background: '#3B5D17',
    resizeTo: window
	})

	globalThis.__PIXI_APP__ = app

	document.body.appendChild(app.canvas)

	const link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'src/style.css'
	document.head.appendChild(link)
})()
