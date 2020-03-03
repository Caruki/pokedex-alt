import './app.scss';
import './components/search.scss';
import { createElement } from './lib/dom';
import { title } from './components/title';
import { search } from './components/search';

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', { className: 'main' });
  const titleElement = title('MagicDex', { className: 'title' });
  const searchElement = search();

  header.appendChild(titleElement);
  main.appendChild(searchElement);

  const searchValue = createElement('div', { className: 'searchOutput' });
  main.appendChild(searchValue);

  searchElement.addEventListener('search', () => {
    searchValue.innerText = searchElement.value;
  });

  return [header, main];
}
