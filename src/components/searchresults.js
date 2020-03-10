import './searchresults.scss';
import { createElement, appendContent } from '../lib/dom';

export function createSearchResults(props) {
  const container = createElement('div', { className: 'listContainer' });
  if (props.results.length === 0) {
    const notFound = createElement('div', {
      innerText: 'No Result matching found'
    });
    appendContent(container, notFound);
  } else {
    props.results.forEach(item => {
      const element = createElement('div', {
        innerText: item,
        className: 'resultItem'
      });
      element.addEventListener('click', () => {
        props.onSearchResultClick(item);
      });

      appendContent(container, element);
    });
  }
  return container;
}
