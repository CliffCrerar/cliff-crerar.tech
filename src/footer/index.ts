import './footer.scss';

const terms = "https://policies.cliff-crerar.tech/portal-terms"
const privacy = "https://policies.cliff-crerar.tech/portal-privacy"

export default () => {
    return `
        <div class="footer">
            
        <span><a class="policies" href="${privacy}" target="_blank">Privacy Policy</a></span>
        <span><|></span>
        <span><a class="policies" href="${terms}" target="_blank">Terms of use</a></span>
        
        </div>
    `
}