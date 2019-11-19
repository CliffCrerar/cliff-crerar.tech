
/// <reference path="modules/html.d.ts" />
/// <reference path="modules/svg.d.ts" />

import './components/__google-analytics/index.js';
import './components/__schema';
import './utils/nodeMods'
import './components/loader';
import './style.scss';
import './variables.scss';
import './components/showdev/index';

import { win } from './modules/window';
import mobileComponents from './components/__modbileSite/index';
import nav from './components/nav/index'
import splitview from "./components/splitview/index";
import videobg from './components/videobg/index';
import content from './components/_content-grid/index';
import policies from './components/footer/index';
import callQuoteApi from './components/quote/index';

const $ = document,
	appendBody = (el: HTMLElement): HTMLElement => $.body.appendChild(el),
	create = (elType: string): HTMLElement => $.createElement(elType),

	{ header, main, footer, bgMatter } = (() => {
		const
			header = create('header'),
			main = create('main'),
			footer = create('footer'),
			bgMatter = create('div');
		appendBody(bgMatter);
		appendBody(header);
		appendBody(main);
		appendBody(footer);
		return { header, main, footer, bgMatter }
	})();

function desktop(): void {
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

function mobile(main: HTMLElement) {
	return mobileComponents(main);
}

// console.log('win.isMobile: ', win.isMobile);
if (win.isMobile) {
	process.env.DEV && console.log('load mobile');
	mobile(main)
} else {
	process.env.DEV && console.log('load Desktop');
	desktop();
}


console.log();
