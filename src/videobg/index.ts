import './videobg.scss'
import videoHtmlDev from './videobg_dev.html'
import videoHtmlProd from './videobg_prod.html'

console.log('process.env: ', process.env);

export default () => {
	const el = document.createElement('div');
	el.classList.add('video-background');
	el.innerHTML = videoHtmlProd;
	return el;
}