import './index.scss';
import { app } from './app';
import { appendContent } from './lib/dom';

const elements = app();

//Alternative: elements.forEach(document.body.appendChild);

appendContent(document.body, elements);
