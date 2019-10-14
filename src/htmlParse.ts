

function parseHtml(html:any){
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

export default parseHtml;