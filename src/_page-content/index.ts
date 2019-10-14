// import { markdown } from 'markdown'

import './content.scss';
import content from './content.html';
import subject from './sub-content/page-subject.html';
import callQuoteApi from '../quote/index';
import socialLinks from './social-links/index';
import calendly from './calendly/calendly'

// import about from './sub-content/about.md';

// const md = markdown.parse(about)[1][1];
// console.log('md: ', md);

// const populatemarkdown = false;

const contentPage = content
	.replace('{{page-subject}}', subject)
	.replace('{{page-quote}}','<div id="quote"></div>')
	.replace("{{socialLinks}}", socialLinks)
	.replace('{{calendly}}', calendly);
	console.log(content);

	callQuoteApi();

export default () => {
	const container = document.createElement('div');
	container.classList.add('content-container');
	container.innerHTML = contentPage;
	return container;
}