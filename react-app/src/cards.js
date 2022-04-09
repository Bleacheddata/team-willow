function randomInteger(max) {
  return Math.floor(Math.random() * max);
}

let cardNames = [
  {
    name: "Raiden",
    image:
      "https://i.pinimg.com/originals/71/ff/e2/71ffe2e22795d6ca9b80da4e9fd154c8.jpg"
  },
  {
    name: "Phoenix",
    image:
      "https://i.pinimg.com/originals/4e/43/09/4e4309728598bfc1b06d6681e38502ff.jpg"
  },
  {
    name: "Ghost",
    image:
      "https://i.pinimg.com/originals/6b/f4/da/6bf4da99007d304f76d46ff8e7f7ad46.jpg"
  },
  {
    name: "Nightrunner",
    image:
      "https://i.pinimg.com/736x/18/ed/74/18ed74b95a0c3856087ff62b9de76175--cyberpunk-character-shooter-games.jpg"
  },
  {
    name: "Archangel",
    image:
      "https://i.pinimg.com/originals/7f/17/4d/7f174d7f31ac58a40ef4447bf78af93b.jpg"
  },
  {
    name: "Scorch",
    image:
      "https://i.pinimg.com/originals/4f/9c/ef/4f9cef22478edd093eb6a74182758c6c.jpg"
  },
  {
    name: "Tempest",
    image:
      "https://i.pinimg.com/originals/c6/a8/9d/c6a89d990f0055ec4035db19c0df0668.jpg"
  },
  {
    name: "Phantom",
    image:
      "https://i.pinimg.com/originals/52/e4/88/52e48892c471b8575b71b2ec81d21538.jpg"
  },
  {
    name: "Viper",
    image:
      "https://i.pinimg.com/736x/cd/3e/2b/cd3e2bffa7f01d4b9ab8fc4a016bef93.jpg"
  },
  {
    name: "Nomad",
    image:
      "https://i.pinimg.com/originals/50/fa/c7/50fac7e383458e9360faa499f27819d1.jpg"
  }
];
let cardType = ["Depletor", "Generator"];

export function getCard() {
  let card = cardNames[randomInteger(cardNames.length)];
  card.power = randomInteger(12);

  if (card.power >= 0 && card.power <= 3) {
    card.rarity = "Common";
    card.border = "white";
  }
  if (card.power >= 4 && card.power <= 6) {
    card.rarity = "Uncommon";
    card.border = "lightgreen";
  }
  if (card.power >= 7 && card.power <= 9) {
    card.rarity = "Rare";
    card.border = "lightskyblue";
  }
  if (card.power >= 10 && card.power <= 12) {
    card.rarity = "Ultra-Rare";
    card.border = "gold";
  }

  card.type = cardType[randomInteger(cardType.length)];

  if (card.type === "Depletor") {
    card.power = card.power * -1;
  }
  console.log(card);
  return card;
}