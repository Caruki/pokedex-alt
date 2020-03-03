import './title.scss';
import { createElement } from '../lib/dom';

export function title(value) {
  const element = createElement('h1', {
    innerText: value,
    className: 'title'
  });
  return element;
}
