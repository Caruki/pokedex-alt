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
  const searchInput = createSearchInput();

  header.appendChild(title);
  main.appendChild(searchInput);

  let magicCards = createSearchResults(cardList);
  main.appendChild(magicCards);

  searchInput.addEventListener('search', event => {
    main.removeChild(magicCards);
    const searchValue = event.target.value;
    const filteredCards = cardList.filter(card => {
      return card.startsWith(searchValue);
    });
    magicCards = createSearchResults(filteredCards);
    main.appendChild(magicCards);
  });

  return [header, main];
}
