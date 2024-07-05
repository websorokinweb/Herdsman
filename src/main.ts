import { Application, Graphics, Rectangle } from 'pixi.js'
;(async () => {
	const app = new Application()
	await app.init({
		background: '#3B5D17',
		resizeTo: window,
	})

	globalThis.__PIXI_APP__ = app

	document.body.appendChild(app.canvas)

  addStyles()

  const appWidth = app.screen.width
  const appHeight = app.screen.height
	

	function addMainHero() {
		const mainHero = new Graphics().circle(appWidth / 2, appHeight / 2, 50).fill(0xff0000)

		app.stage.addChild(mainHero)
	}

	addMainHero()
})()


function addStyles(): void{
  const link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = 'src/style.css'
	document.head.appendChild(link)
}