import './app.scss';
import './components/search.scss';
import { createElement, appendContent } from './lib/dom';
import { createTitle } from './components/title';
import {
  createSearchInput,
  createSearchResults,
  createShowAllButton
} from './components/search';
import { filterResults } from './lib/results';
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
  const showAllButton = createShowAllButton();
  const wrapContainer = createElement('div', { className: 'wrapper' });
  const favouriteListContainer = createElement('div');
  let favouriteList = createFavouriteList({
    items: JSON.parse(localStorage.getItem('favourites')) || []
  });
  appendContent(wrapContainer, [favouriteListContainer, favouriteList]);

  function updateFavouriteList(item) {
    addToFavourites(item);
    favouriteListContainer.removeChild(favouriteList);
    favouriteList = createFavouriteList({
      items: JSON.parse(localStorage.getItem('favourites')) || []
    });
    appendContent(favouriteListContainer, favouriteList);
    appendContent(wrapContainer, favouriteListContainer);
  }
  appendContent(header, [logo, title]);
  appendContent(main, [searchInput, wrapContainer]);
  appendContent(searchInput, showAllButton);

  let searchResults = null;

  async function setSearchResults() {
    const loading = createElement('div', { innerText: 'Loading...' });
    appendContent(main, loading);
    try {
      console.log(searchResults);
      if (searchResults) {
        main.removeChild(searchResults);
        searchResults = null;
      }

      const filteredCards = await filterResults(
        searchInput.firstElementChild.value
      );
      searchResults = createSearchResults({
        results: filteredCards,
        onSearchResultClick: updateFavouriteList
      });

      appendContent(wrapContainer, searchResults);
    } catch (error) {
      console.error(error);
      const errorMessage = createElement('div', {
        innerText: 'Error: ' + error.message
      });
      appendContent(main, errorMessage);
    } finally {
      main.removeChild(loading);
    }
  }
  setSearchResults();

  searchInput.firstElementChild.addEventListener('input', event => {
    setSearchResults();

    const searchValue = event.target.value;
    sessionStorage.setItem('searchValue', searchValue);
  });

  //buttons
  showAllButton.addEventListener('click', async () => {
    searchInput.firstElementChild.value = '';
    setSearchResults();
  });
  return [header, main];
}
