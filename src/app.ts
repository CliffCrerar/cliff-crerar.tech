
import './style.scss';
import './variables.scss';
import nav from './nav'
import splitview from "./splitview";
import videobg from './videobg';
import content from './_page-content';
import policies from './footer';
import './showdev';

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
console.log('content: ', content);


// document.body.appendChild(videobg());
// document.body.appendChild(splitview());
// app.appendChild(content());




// !process.env.DEV && googleScr();
// function googleScr() {
//     var gscr = document.querySelector('#googleScr');
//     gscr.setAttribute('type', 'text/javascript');
//     console.log('gscr: ', gscr);
//     const src = `
//     window.dataLayer = window.dataLayer || [];
//     function gtag() {
//         dataLayer.push(arguments);
//     }
//     gtag('js', new Date());
//     gtag('config', 'UA-143913069-1');`
//     gscr.text = src;
// }