export default interface HasScore {
  getScore(): number
  incrementScore(amount: number): void
  setScore(score: number): void
}