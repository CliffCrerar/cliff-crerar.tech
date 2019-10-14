
/**
 * Social links
 */


import icons from './icons'
import  { iSocialLinks, baseUrl, socialLinks, linksContainer, list } from './elements';
import parseHTML from '../../htmlParse';
console.log('htmlParser: ', parseHTML);

function buildLink(itm: iSocialLinks, idx: number):HTMLLIElement{
    const listItem: HTMLLIElement = document.createElement('li');
    const link: HTMLAnchorElement = document.createElement('a');
    // const image: HTMLImageElement = document.createElement('img');

    link.href = itm.link;
    link.target = '_blank';
    // image.alt = itm.name;
    // image.srcset = `${baseUrl}/${itm.name}.svg`;

    link.innerHTML = <string>icons[itm.name];
    
    //link.append(image);
    listItem.appendChild(link);

    return listItem;
}

linksContainer.appendChild(list);

socialLinks.map((itm, idx) => {
    console.log('index: ', itm);
    console.log('value: ', idx);
    return buildLink(itm, idx);
}).forEach(itm=>list.appendChild(itm));

console.log(linksContainer);

export default linksContainer.innerHTML;