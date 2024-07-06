import { Application, Graphics, Renderer } from "pixi.js";

export class Animal {
  private app: Application<Renderer>;

  private animalGraphic: Graphics;
  
  constructor(app: Application<Renderer>, x: number, y: number) { 
    this.app = app

    this.animalGraphic = this.spawn(x, y)
  }

  private spawn(x: number, y: number): Graphics{
    const animalGraphic = new Graphics().circle(0, 0, 20).fill(0xffffff)

		animalGraphic.position.set(x, y)

    this.app.stage.addChild(animalGraphic)
    animalGraphic.zIndex = 3000

    return animalGraphic
  }

  move(x: number, y: number) {
    this.animalGraphic.position.set(x, y)
  }

  getX(): number {
    return this.animalGraphic.x
  }

  getY(): number {
    return this.animalGraphic.y
  }
}