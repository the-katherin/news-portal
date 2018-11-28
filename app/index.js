import './styles/index.scss';

import txt from './assets/jsonExample.json'; // for custom loader example
console.log(txt);

import "@babel/polyfill";

import App from './js/components/App';

const app = new App();
app.init();



