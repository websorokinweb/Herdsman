import { Application, Graphics, Renderer } from "pixi.js";
import { Animal } from "./Animal";

export class Player {
  private app: Application<Renderer>;

  private playerGraphics: Graphics;

  private animalsGroup: Animal[];

  protected score: number;

  constructor(app: Application<Renderer>) {
    this.app = app

    this.playerGraphics = this.spawn()

    this.score = 0

    this.animalsGroup = []
  }

  incrementScore(): void {
    this.score += 1
  }

  private spawn(): Graphics{
    const newPlayer: Graphics = new Graphics().circle(0, 0, 25).fill(0xff0000)

		newPlayer.position.set(this.app.screen.width / 2, this.app.screen.height / 2)

		this.app.stage.addChild(newPlayer)
    newPlayer.zIndex = 2000

		return newPlayer
  }

  move(x: number, y: number) {
    this.playerGraphics.position.set(x, y)
  }

  getX(): number {
    return this.playerGraphics.x
  }

  getY(): number {
    return this.playerGraphics.y
  }

  addAnimalToGroup(animal: Animal): void {
    if(this.isAnimalInGroup(animal)) {
      return
    }

    if(this.animalsGroup.length >= 5) {
      return
    }

    this.animalsGroup.push(animal)
  }

  removeAnimalFromGroup(animal: Animal): void {
    this.animalsGroup = this.animalsGroup.filter((animalInGroup) => animalInGroup != animal)
  }

  isAnimalInGroup(animal: Animal): boolean {
    return this.animalsGroup.includes(animal)
  }
}