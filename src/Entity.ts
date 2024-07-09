export interface Entity {
	getX(): number
	getY(): number
	move(x: number, y: number): void
	spawn(x: number, y: number): void
	getWidth(): number
	getHeight(): number
}
