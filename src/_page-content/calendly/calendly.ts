export default `
    <style>
        p{
            float: center;
        }
        a:hover p,a:hover img{
            transform: scale(1.2);
        }
        .calendly-button{
            background: transparent !important;
            border: 0px transparent !important;
        }
    </style>
    <div class="calendly-box">
    <button class="calendly-button">
        <a href="https://calendly.com/cliff-crerar/session-with-dev" target="blank">
            <img 
            style="height: 100px; width: 100px" 
            src="${require('../../_assets/calendly-1.png')}" 
            alt="calendly">
            <p style="font-size: 1.5em">Make an appointment</p>
        </a>
    </button>
    </div>
`

/**
 * <!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/cliff-crerar/session-with-dev" style="min-width:320px;height:630px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
<!-- Calendly inline widget end -->
 */