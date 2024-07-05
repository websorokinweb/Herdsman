import { Application } from 'pixi.js'
;(async () => {
	const app = new Application()
	await app.init({
		width: 600,
		height: 600,
	})

	globalThis.__PIXI_APP__ = app

	document.body.appendChild(app.canvas)

	const link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'src/style.css'
	document.head.appendChild(link)

	window.addEventListener('resize', onResize)

	function onResize() {
		app.renderer.resize(window.innerWidth, window.innerHeight)
	}

	onResize()
})()
