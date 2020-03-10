import './app.scss';
import './components/search.scss';
import { createElement, appendContent } from './lib/dom';
import { createTitle } from './components/title';
import { createSearchInput, createShowAllButton } from './components/search';
import { filterResults } from './lib/results';
import Logo from './assets/logo.svg';
import { createFavouriteList, addToFavourites } from './components/favourites';
import { createSearchResults } from './components/searchresults';

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
  const favouriteListContainer = createElement('div', {
    className: 'favouriteListContainerWrapper'
  });
  let favouriteList = createFavouriteList({
    items: JSON.parse(localStorage.getItem('favourites')) || []
  });
  const listContainerWrapper = createElement('div', {
    className: 'listContainerWrapper'
  });

  appendContent(favouriteListContainer, favouriteList);
  appendContent(wrapContainer, [favouriteListContainer, listContainerWrapper]);

  function updateFavouriteList(item) {
    addToFavourites(item);
    favouriteListContainer.removeChild(favouriteList);
    favouriteList = createFavouriteList({
      items: JSON.parse(localStorage.getItem('favourites')) || []
    });
    appendContent(favouriteListContainer, favouriteList);
    //appendContent(wrapContainer, favouriteListContainer);
  }
  appendContent(header, [logo, title]);
  appendContent(main, [searchInput, wrapContainer]);
  appendContent(searchInput, showAllButton);

  let searchResults = null;

  async function setSearchResults() {
    const loading = createElement('div', { innerText: 'Loading...' });
    appendContent(listContainerWrapper, loading);
    try {
      if (searchResults) {
        listContainerWrapper.removeChild(searchResults);
        searchResults = null;
      }

      const filteredCards = await filterResults(
        searchInput.firstElementChild.value
      );
      searchResults = createSearchResults({
        results: filteredCards,
        onSearchResultClick: updateFavouriteList
      });

      appendContent(listContainerWrapper, searchResults);
    } catch (error) {
      console.error(error);
      const errorMessage = createElement('div', {
        innerText: 'Error: ' + error.message
      });
      appendContent(main, errorMessage);
    } finally {
      listContainerWrapper.removeChild(loading);
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
