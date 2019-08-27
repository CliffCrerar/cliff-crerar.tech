// call quote https://quotes.rest/

function callQuoteApi(){
    
    return new Promise((resolve, reject)=>{
        const apiCall = process.env.DEV ?  require('./devapi.json') : fetch('https://quotes.rest/qod').then(resp=>resp.json());
        resolve(apiCall);
    })
    .then(quoteObject=>populate(quoteObject));
    
    function populate(q){
        const quoteContainer = document.getElementById('quote')
        var quote = q.contents.quotes[0];
        var quoteCopyright = q.contents.copyright;
        var quoteTitle = quote.title;
        var quoteImg = quote.background;
        var quoteText =quote.quote;
        var quoteAuthor = quote.author;
        const quoteHtml = require('./quoteHtml.html')
        .replace('${quoteCopyright}',quoteCopyright)
        .replace('${quoteTitle}',quoteTitle)
        .replace('${quoteImg}',quoteImg)
        .replace('${quoteText}',quoteText)
        .replace('${quoteAuthor}',quoteAuthor)
        // quoteContainer.style.paddingRight = '20px';
        quoteContainer.innerHTML = quoteHtml;
    } 
}

export default callQuoteApi;

