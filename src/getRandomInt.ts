export default function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max + 1);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}