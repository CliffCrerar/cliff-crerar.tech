import './style.scss';
import html from './calendly.html';

const
	img = require('../../_assets/calendly3.png'),
	link = 'https://calendly.com/cliff-crerar/session-with-dev',
	caption = 'Make an appointment',
	calendlyBox = document.createElement('div');
function calendly(): string {
	return html
		.replace(/{{link}}/, link)
		.replace(/{{img}}/, img)
		.replace(/{{caption}}/, caption)
		.replace(/{{clickFunction}}/, clickCalendly);
}
function clickCalendly(): any {
	process.env.DEV && console.log('click');
	return 'string'
}
process.env.DEV && console.log(calendly());
calendlyBox.innerHTML = calendly();


// export default calendlyBox.innerHTML;
export default calendlyBox;


/**
 * <!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/cliff-crerar/session-with-dev" style="min-width:320px;height:630px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
<!-- Calendly inline widget end -->
 */