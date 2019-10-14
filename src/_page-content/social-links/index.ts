/**
 * Social links
 */
import icons from './icons'
import  { iSocialLinks, socialLinks, linksContainer, list } from './elements';
function buildLink(itm: iSocialLinks, idx: number):HTMLLIElement{
    const listItem: HTMLLIElement = document.createElement('li');
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = itm.link;
    link.target = '_blank';
    link.innerHTML = <string>icons[itm.name];
    listItem.appendChild(link);
    return listItem;
}
linksContainer.appendChild(list);
socialLinks.map((itm, idx) => {
    console.log('index: ', itm);
    console.log('value: ', idx);
    return buildLink(itm, idx);
}).forEach(itm=>list.appendChild(itm));
export default linksContainer.innerHTML;