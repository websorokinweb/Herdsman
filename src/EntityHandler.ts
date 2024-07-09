import Entity from './Entity'

export default class EntityHandler {
	static getDistanceBetweenEntities(entity1: Entity, entity2: Entity): number {
		return Math.sqrt(
			Math.pow(entity1.getX() - entity2.getX(), 2) +
				Math.pow(entity1.getY() - entity2.getY(), 2),
		)
	}
}
