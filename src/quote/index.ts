// call quote https://quotes.rest/
import './quote.scss';

function callQuoteApi(){
    
    return new Promise((resolve, reject)=>{
        const apiCall = process.env.DEV 
        ?  require('./devapi.json') 
        : fetch('https://quotes.rest/qod').then(resp=>resp.json());
        resolve(apiCall);
    })
    .then(quoteObject=>populate(quoteObject));
    
    function populate(q:any){
        const quoteContainer = document.getElementById('quote')
        var quote = q.contents.quotes[0];
        var quoteCopyright = q.contents.copyright;
        var quoteTitle = quote.title;
        var quoteImg = quote.background;
        var quoteText =quote.quote;
        var quoteAuthor = quote.author;
        var permalink = quote.permalink
        const quoteHtml = require('./quoteHtml.html')
        .replace(/\${quoteCopyright}/gi,quoteCopyright)
        .replace('${quoteTitle}',quoteTitle)
        .replace('${quoteImg}',quoteImg)
        .replace('${quoteText}',quoteText)
        .replace('${quoteAuthor}',quoteAuthor)
        .replace('${permalink}',permalink)
        quoteContainer.style.paddingRight = '20px';
        quoteContainer.innerHTML = quoteHtml;
    } 
}

export default callQuoteApi;

