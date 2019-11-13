// call quote https://quotes.rest/
import './quote.scss';

function callQuoteApi() {

	return new Promise((resolve) => {
		const apiCall = process.env.DEV
			? require('./devapi.json')
			: fetch('https://quotes.rest/qod').then(resp => resp.json());
		resolve(apiCall);
	})
		.then(quoteObject => populate(quoteObject));

	function populate(q: any) {
		const quoteContainer = document.getElementById('quote'),
			quote = q.contents.quotes[0],
			quoteCopyright = q.contents.copyright,
			quoteTitle = quote.title,
			quoteImg = quote.background,
			quoteText = quote.quote,
			quoteAuthor = quote.author,
			permalink = quote.permalink,
			quoteHtml = require('./quoteHtml.html')
				.replace(/\${quoteCopyright}/gi, quoteCopyright)
				.replace('${quoteTitle}', quoteTitle)
				.replace('${quoteImg}', quoteImg)
				.replace('${quoteText}', quoteText)
				.replace('${quoteAuthor}', quoteAuthor)
				.replace('${permalink}', permalink)
		quoteContainer.style.paddingRight = '20px';
		quoteContainer.innerHTML = quoteHtml;
	}
}

export default callQuoteApi;

