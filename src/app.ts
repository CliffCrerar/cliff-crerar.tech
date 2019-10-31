
/// <reference path="html.d.ts" />
/// <reference path="svg.d.ts" />

import './__google-analytics/index.js'
import './nodeMods'
import './loader';
import './style.scss';
import './variables.scss';
import './showdev/index';
import './loader';

import {win} from './window';
import mobileComponents  from './__modbileSite/index';
import nav from './nav/index'
import splitview from "./splitview/index";
import videobg from './videobg/index';
import content from './_page-content/index';
import policies from './footer/index';
import callQuoteApi from './quote/index';

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

function desktop(){
    bgMatter.style.position = 'absolute';
    bgMatter.style.minHeight = '100vh';
    bgMatter.style.width = '100vw';
    bgMatter.appendChild(videobg());
    bgMatter.appendChild(splitview());
    header.appendChild(nav);
    main.prepend(content());
    footer.innerHTML = policies();
    callQuoteApi();
}

function mobile(main:HTMLElement){
    return mobileComponents(main);
}

console.log('win.isMobile: ', win.isMobile);
if(win.isMobile){
    
    console.log('load mobile');
    mobile(main)
} else {
    console.log('load Desktop');
    desktop();
}


console.log();
