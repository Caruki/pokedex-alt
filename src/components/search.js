import './search.scss';
import { createElement, appendContent } from '../lib/dom';

export function createSearchInput(props) {
  const element = createElement('input', {
    type: 'search',
    className: 'search',
    placeholder: 'Enter card name...',
    value: props.value
  });
  return element;
}

export function createShowAllButton() {
  const element = createElement('button', {
    type: 'button',
    innerHTML: 'Show All'
    //className: 'showAllButton'
  });
  return element;
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
