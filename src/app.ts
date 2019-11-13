
/// <reference path="html.d.ts" />
/// <reference path="svg.d.ts" />

import './__google-analytics/index.js'
import './nodeMods'
import './loader';
import './style.scss';
import './variables.scss';
import './showdev/index';
import './loader';

import { win } from './window';
import mobileComponents from './__modbileSite/index';
import nav from './nav/index'
import splitview from "./splitview/index";
import videobg from './videobg/index';
import content from './_content-grid/index';
import policies from './footer/index';
import callQuoteApi from './quote/index';

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
