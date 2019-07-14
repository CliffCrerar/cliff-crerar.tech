class NewElement {
	public element: HTMLElement;

	constructor(html: string, elementClass: string) {
		this.element = document.createElement('section');
		this.element.style.display = 'block';
		this.element.setAttribute('class', this.elementClass);
	}
}