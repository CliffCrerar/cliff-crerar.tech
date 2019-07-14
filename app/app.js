


function components() {
	const element = document.createElement('div');
	element.innerHTML = 'This is a test'
	return element
}

document.body.appendChild(components());