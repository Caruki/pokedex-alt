export function filterResults(searchValue, resultList = []) {
  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredResults = resultList.filter(item => {
    if (searchValue.length > 0) {
      return item.toLowerCase().includes(lowerCaseSearchValue);
    }
  });
  return filteredResults;
}
