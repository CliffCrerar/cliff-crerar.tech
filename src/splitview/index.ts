import './split.scss';
import splitHtml from './split.html';

export default () => {
	const el = document.createElement('div');
	el.classList.add('skewdiv');
	el.innerHTML = splitHtml;
	return el;
};