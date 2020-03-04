const cardList = ['Nissa', 'Ajani', 'Archon', 'Eidolon'];

export function filterResults(searchValue) {
  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredResults = cardList.filter(item => {
    if (searchValue.length > 0) {
      return item.toLowerCase().includes(lowerCaseSearchValue);
    }
  });
  return filteredResults;
}
