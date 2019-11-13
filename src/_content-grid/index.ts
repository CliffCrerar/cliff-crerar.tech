// import { markdown } from 'markdown'

import './content.scss';
import content from './content.html';
import subject from './sub-content/page-subject.html';

import socialLinks from './social-links/index';
// import calendly from './calendly/calendly'

const contentPage = content
	.replace('{{page-subject}}', subject)
	.replace('{{page-quote}}','<div id="quote"></div>')
	.replace("{{socialLinks}}", socialLinks)
	// .replace('{{calendly}}', calendly);

	//callQuoteApi();

export default () => {
	const container = document.createElement('div');
	container.classList.add('content-container');
	container.innerHTML = contentPage;
	return container;
}