import './app.scss';
import './components/search.scss';
import { createElement, appendContent } from './lib/dom';
import { createTitle } from './components/title';
import {
  createSearchInput,
  createSearchResults,
  createShowAllButton
} from './components/search';
import { filterResults, cardList } from './lib/results';
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
  let cards = null;

  function setSearchResults() {
    cards = createSearchResults({
      results: filterResults(searchInput.firstElementChild.value),
      onSearchResultClick: updateFavouriteList
    });
    appendContent(main, cards);
  }
  setSearchResults();

  appendContent(header, [logo, title]);
  appendContent(main, [searchInput, favouriteListContainer, cards]);
  appendContent(searchInput, showButton);

  searchInput.firstElementChild.addEventListener('input', event => {
    main.removeChild(cards);
    setSearchResults();

    const searchValue = event.target.value;
    sessionStorage.setItem('searchValue', searchValue);
  });

  showButton.addEventListener('click', () => {
    main.removeChild(cards);
    searchInput.firstElementChild.value = '';
    cards = createSearchResults({
      results: cardList
    });
    appendContent(main, cards);
  });

  return [header, main];
}
