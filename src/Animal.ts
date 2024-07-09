import { Application, Graphics, Renderer } from "pixi.js";
import { Entity } from "./Entity";

export class Animal implements Entity {
  private app: Application<Renderer>;

  private animalGraphics: Graphics;

  private didReachDestination: boolean;
  
  constructor(app: Application<Renderer>, x: number, y: number) { 
    this.app = app

    this.animalGraphics = this.spawn(x, y)

    this.didReachDestination = false
  }

  spawn(x: number, y: number): Graphics{
    const animalGraphic = new Graphics().circle(0, 0, 20).fill(0xffffff)

		animalGraphic.position.set(x, y)

    this.app.stage.addChild(animalGraphic)
    animalGraphic.zIndex = 3000

    return animalGraphic
  }

  move(x: number, y: number) {
    this.animalGraphics.position.set(x, y)
  }

  getX(): number {
    return this.animalGraphics.x
  }

  getY(): number {
    return this.animalGraphics.y
  }

  getDidReachDestination(): boolean {
    return this.didReachDestination
  }

  setDidReachDestination(didReachDestination: boolean): void {
    this.didReachDestination = didReachDestination
  }
}