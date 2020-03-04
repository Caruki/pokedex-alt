import './app.scss';
import './components/search.scss';
import { createElement, appendContent } from './lib/dom';
import { createTitle } from './components/title';
import { createSearchInput, createSearchResults } from './components/search';
import { filterResults } from './lib/results';
import Logo from './assets/logo.svg';

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', { className: 'main' });
  const title = createTitle('MagicDex', { className: 'title' });
  const searchInput = createSearchInput({
    value: sessionStorage.getItem('searchValue')
  });
  const logo = createElement('img', { src: Logo, className: 'logo' });

  let magicCards = null;

  function setSearchResults() {
    magicCards = createSearchResults(
      filterResults(searchInput.firstElementChild.value)
    );
    appendContent(main, magicCards);
  }
  setSearchResults();

  appendContent(header, [logo, title]);
  appendContent(main, [searchInput, magicCards]);

  searchInput.firstElementChild.addEventListener('input', event => {
    main.removeChild(magicCards);
    setSearchResults();

    const searchValue = event.target.value;
    sessionStorage.setItem('searchValue', searchValue);
  });

  return [header, main];
}
