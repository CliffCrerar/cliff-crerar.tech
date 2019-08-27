import './nav.scss'
const nav = document.createElement('nav');

nav.classList.add('page-options');
nav.innerHTML = require('./nav.html');

export default nav;


