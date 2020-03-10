// zu kompliziert
// function loadCards(time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const allCards = getMagicCards();
//       if (time > 3000) {
//         reject(new Error('Sorry the request takes a long time :('));
//       } else {
//         resolve(allCards);
//       }
//     }, time);
//   });
// }

function waitFor(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export async function getMagicCards() {
  await waitFor(4000);
  //throw new Error('New results found');
  const response = await fetch(
    'https://api.scryfall.com/cards/search?order=set&q=e%3Athb&unique=prints'
  );
  const results = await response.json();
  const magicCards = results.data;
  const magicCardNames = magicCards.map(magicCard => {
    return magicCard.name;
  });
  return magicCardNames;
}

export async function filterResults(searchValue) {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const allCards = await getMagicCards();

  const filteredResults = allCards.filter(item => {
    if (searchValue.length > 0) {
      return item.toLowerCase().includes(lowerCaseSearchValue);
    } else {
      return allCards;
    }
  });
  return filteredResults;
}
