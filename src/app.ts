
/// <reference path="html.d.ts" />
/// <reference path="svg.d.ts" />
import './loader';
import './style.scss';
import './variables.scss';
import nav from './nav/index'
import splitview from "./splitview/index";
import videobg from './videobg/index';
import content from './_page-content/index';
import policies from './footer/index';
import './showdev/index';
import './loader';

const {header,main,footer,bgMatter} = (() =>{
    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');
    const bgMatter = document.createElement('div');
    document.body.appendChild(bgMatter);
    document.body.appendChild(header);
    document.body.appendChild(main);
    document.body.appendChild(footer);
    return {header,main,footer,bgMatter}
})();

bgMatter.style.position = 'absolute';
bgMatter.style.minHeight = '100vh';
bgMatter.style.width = '100vw';
bgMatter.appendChild(videobg());
bgMatter.appendChild(splitview());
header.appendChild(nav);
main.appendChild(content());
footer.innerHTML = policies();