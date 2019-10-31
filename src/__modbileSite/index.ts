
import { infoIcon } from './components/infoIcon.ts'
export default (main: HTMLElement) => {
    require('./style.scss');
    console.log('main: ', main);

// console.log('rButton: ', rButton);

function handleClick(e){
    console.log(e.target);
    location.href='https://resume.cliff-crerar.tech';
}


    main.innerHTML = `
        <div class="mobile-container">
            <h1><span>Cliff</span> Crerar</h1>
            <div class="info">
                <div>
                    ${infoIcon}
                </div>
                <div>
                    <p>Works best on desktop.</p>
                    <small>Mobile version coming soon!</small>
                </div>
            </div>
            <button id="resume-button" class="mobile-button">Resume<button>
        </div>
    `
    main.addEventListener('click',handleClick)
}