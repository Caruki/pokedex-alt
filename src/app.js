import './app.scss';
import './components/search.scss';
import { createElement } from './lib/dom';
import { createTitle } from './components/title';
import { createSearchInput } from './components/search';
import { createSearchResults } from './components/search';

const cardList = ['Nissa', 'Ajani', 'Archon', 'Eidolon'];

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', { className: 'main' });
  const title = createTitle('MagicDex', { className: 'title' });
  const search = createSearchInput();

  header.appendChild(title);
  main.appendChild(search);

  const searchResults = createElement('div', {});
  main.appendChild(searchResults);

  search.addEventListener('search', event => {
    searchResults.innerHTML = '';
    const searchValue = event.target.value;

    const filteredCards = cardList.filter(card => {
      return card.startsWith(searchValue);
    });
    const cardItem = createSearchResults(filteredCards);
    searchResults.appendChild(cardItem);
  });

  return [header, main];
}
