function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const card = [
  {
    name: "",
    rarity: "",
    type: "",
    power: ""
  }
];

let cardNames = ["Engineer", "Survivor", "Sharpshooter", "Ghost", "Runner"];

let card1 = new Object();
card1.name = cardNames[randomInteger(0, 5)];
card1.power = randomInteger(0, 12);

if (card1.power >= 0 && card1.power <= 3) {
  card1.rarity = "Common";
}
if (card1.power >= 4 && card1.power <= 6) {
  card1.rarity = "Uncommon";
}
if (card1.power >= 7 && card1.power <= 9) {
  card1.rarity = "Rare";
}
if (card1.power >= 10 && card1.power <= 12) {
  card1.rarity = "Ultra-Rare";
}

if(card1.)
console.log(card1);
