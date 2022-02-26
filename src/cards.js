function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cardNames = [
  "Raiden",
  "Eden",
  "Ghost",
  "Nightrunner",
  "Archangel",
  "Scorch",
  "Tempest",
  "Phantom",
  "Knight",
  "Viper"
];
let cardType = ["Depletor", "Generator"];

export function getCard() {
  let card = Object();
  card.name = cardNames[randomInteger(0, cardNames.length)];
  card.power = randomInteger(0, 12);

  if (card.power >= 0 && card.power <= 3) {
    card.rarity = "Common";
  }
  if (card.power >= 4 && card.power <= 6) {
    card.rarity = "Uncommon";
  }
  if (card.power >= 7 && card.power <= 9) {
    card.rarity = "Rare";
  }
  if (card.power >= 10 && card.power <= 12) {
    card.rarity = "Ultra-Rare";
  }

  card.type = cardType[randomInteger(0, 1)];

  if (card.type === "Depletor") {
    card.power = card.power * -1;
  }
  return card;
}
