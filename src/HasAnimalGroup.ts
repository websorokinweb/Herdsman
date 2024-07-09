import Animal from './Animal'

export default interface HasAnimalGroup {
	addAnimalToGroup(animal: Animal): void
	removeAnimalFromGroup(animal: Animal): void
	isAnimalInGroup(animal: Animal): boolean
}
