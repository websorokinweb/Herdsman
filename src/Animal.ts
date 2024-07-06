import { Application, Graphics, Renderer } from "pixi.js";

export class Animal {
  private app: Application<Renderer>;

  private animalGraphic: Graphics | null = null;
  
  constructor(app: Application<Renderer>, x: number, y: number) { 
    this.app = app

    this.spawn(x, y)
  }

  private spawn(x: number, y: number): void{
    const animalGraphic = new Graphics().circle(0, 0, 20).fill(0xffffff)

		animalGraphic.position.set(x, y)

    this.app.stage.addChild(animalGraphic)

    this.animalGraphic = animalGraphic
  }
}