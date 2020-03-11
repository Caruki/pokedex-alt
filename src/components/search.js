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

export function createShowAllButton() {
  const element = createElement('button', {
    type: 'button',
    innerHTML: 'Show All',
    className: 'showAllButton'
  });
  return element;
}
