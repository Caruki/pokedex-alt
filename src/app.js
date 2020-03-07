import './app.scss';
import './components/search.scss';
import { createElement, appendContent } from './lib/dom';
import { createTitle } from './components/title';
import {
  createSearchInput,
  createSearchResults,
  createShowAllButton
} from './components/search';
import { filterResults, getMagicCards } from './lib/results';
import Logo from './assets/logo.svg';
import { createFavouriteList, addToFavourites } from './components/favourites';

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', { className: 'main' });
  const title = createTitle('MagicDex');
  const searchInput = createSearchInput({
    value: sessionStorage.getItem('searchValue')
  });
  const logo = createElement('img', { src: Logo, className: 'logo' });
  const showButton = createShowAllButton();
  const favouriteListContainer = createElement('div');
  let favouriteList = createFavouriteList({
    items: JSON.parse(localStorage.getItem('favourites')) || []
  });
  appendContent(favouriteListContainer, favouriteList);

  function updateFavouriteList(item) {
    addToFavourites(item);
    favouriteListContainer.removeChild(favouriteList);
    favouriteList = createFavouriteList({
      items: JSON.parse(localStorage.getItem('favourites')) || []
    });
    appendContent(favouriteListContainer, favouriteList);
  }
  let searchResults = null;

  async function setSearchResults() {
    const filteredCards = await filterResults(
      searchInput.firstElementChild.value
    );
    searchResults = createSearchResults({
      results: filteredCards,
      onSearchResultClick: updateFavouriteList
    });
    console.log('searchResults: ', typeof searchResults);
    appendContent(main, searchResults);
  }
  setSearchResults();

  appendContent(header, [logo, title]);
  appendContent(main, [searchInput, favouriteListContainer]);
  appendContent(searchInput, showButton);

  searchInput.firstElementChild.addEventListener('input', event => {
    console.log('Search Results:', typeof searchResults);

    main.removeChild(searchResults);
    setSearchResults();

    const searchValue = event.target.value;
    sessionStorage.setItem('searchValue', searchValue);
  });

  showButton.addEventListener('click', async () => {
    if (searchResults) {
      main.removeChild(searchResults);
    }
    searchInput.firstElementChild.value = '';
    searchResults = createSearchResults({
      results: await getMagicCards(),
      onSearchResultClick: updateFavouriteList
    });
    appendContent(main, searchResults);
  });

  return [header, main];
}
