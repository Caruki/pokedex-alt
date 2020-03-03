import './search.scss';
import { createElement } from '../lib/dom';

export function search() {
  const element = createElement('input', {
    type: 'search',
    className: 'search',
    placeholder: 'Enter card name...'
  });
  return element;
}
