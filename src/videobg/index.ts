import './videobg.scss'
import videoHtml from './videobg.html'

export default () => {
	const el = document.createElement('div');
	el.classList.add('video-background');
	el.innerHTML = videoHtml;
	return el;
}