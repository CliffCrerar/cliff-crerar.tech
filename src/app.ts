
import './style.scss';
import splitview from "./splitview";
import videobg from './videobg';
import content from './_page-content';
import './api';
import './showdev';

const app = document.createElement('main');

app.appendChild(videobg())
app.appendChild(splitview());
app.appendChild(content());

document.body.appendChild(app);
!process.env.DEV && googleScr();
function googleScr(){
    var gscr = document.querySelector('#googleScr');
    gscr.setAttribute('type','text/javascript');
    console.log('gscr: ', gscr);
    const src = `
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-143913069-1');`
    gscr.text = src;
}