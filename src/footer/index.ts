import './footer.scss';





export default () => {

    const footer = document.createElement('footer');
    const policies = document.createElement('div');
    const anchor = document.createElement('a');
    const privacy = anchor.cloneNode();
    const terms = anchor.cloneNode();

    footer.appendChild(policies);

    policies.classList.add("policies");
    
    policies.innerHTML = '<h1>policies</h1>';

    console.log('terms: ', terms);

    console.log('privacy: ', privacy);

    return footer;
}