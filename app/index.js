import './styles/index.scss';

import store from "./js/redux/store";

import txt from './assets/jsonExample.json'; // for custom loader example

import "@babel/polyfill";

import App from './js/components/App';

const app = new App(store);
app.init();



