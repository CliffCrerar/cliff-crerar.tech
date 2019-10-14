
import './loader.scss'
const
    imgStringEl: string = '<img src="https://cdn.dribbble.com/users/563824/screenshots/3114148/good-1.gif">',
    loaderHtml: string = `<div id="loader-inner" class="loader-html">${imgStringEl}</div>`,
    inner: HTMLElement = document.getElementById('page-loader');
if (process.env.NODE_ENV !== 'development') {
    (() => { inner.innerHTML = loaderHtml; setTimeout(() => { inner.classList.add('fadeOut') }, 2000); })()
} else {
    inner.remove();
}
