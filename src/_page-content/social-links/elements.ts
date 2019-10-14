
/**
 * Social links
 */



interface iSocialLinks {
    name: string,
    link: string    
    
}

function getImg(imgName: string): string {
    return require(require('path').join(__dirname, '../../_assets', imgName+'.svg'));
}

const baseUrl: string = 'https://cdn-cloudflare.ga/assets/social-icons';
const socialLinks: iSocialLinks[] = [
    { name: 'linkedIn', link: 'https://www.linkedin.com/in/cliff-crerar/'},
    { name: 'quora', link: 'https://www.quora.com/profile/Cliff-Crerar'},
    { name: 'facebook', link: 'https://www.facebook.com/cliff.crerar' },
    { name: 'twitter', link: 'https://twitter.com/Cliffenator'},
    { name: 'github', link: 'https://github.com/CliffCrerar'},
    { name: 'stackOverflow', link: 'https://stackoverflow.com/users/5599914/cliff-crerar'},
    { name: 'instagram', link: 'https://www.instagram.com/cliffenator/'},
    { name: 'pinterest', link: 'https://za.pinterest.com/cliffcrerar/'},
]

const linksContainer = document.createElement('div');
const list: HTMLUListElement = document.createElement('ul');

export { iSocialLinks, baseUrl, socialLinks, linksContainer, list }

