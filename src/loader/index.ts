// const listenersAdd = ['canplay','play']
// const videoObj = document.getElementsByClassName('video-iframe')
// console.log('videoObj: ', videoObj);
// listenersAdd.forEach(ev=>document.addEventListener(ev,(e)=>handleEvent(e));
// function handleEvent(ev){
//     console.log('ev: ', ev);
// }
// document.addEventListener('play',()=>console.log('play'))
import './loader.scss'
// var loader = require('https://cdn-cloudflare.ga/my-portal-assets/good-1.gif');
var loaderHtml = `
    <div id="loader-inner" class="loader-html">
        <img src="https://cdn.dribbble.com/users/563824/screenshots/3114148/good-1.gif">
    </div>
`
var body = document.getElementById('page-loader');

var inner = document.getElementById('page-loader');

setTimeout(()=>{inner.remove()},
20000)
