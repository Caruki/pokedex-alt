import './search.scss';
import { createElement, appendContent } from '../lib/dom';

export function createSearchInput(props) {
  const container = createElement('div', { className: 'searchContainer' });
  const element = createElement('input', {
    type: 'search',
    className: 'search',
    placeholder: 'Enter card name...',
    value: props.value
  });
  appendContent(container, element);
  return container;
}

export function createSearchResults(cardList) {
  const container = createElement('div', { className: 'listContainer' });

  cardList.forEach(cardItem => {
    const element = createElement('div', {
      innerText: cardItem,
      className: 'resultItem'
    });

    appendContent(container, element);
  });
  return container;
}
