import './videobg.scss'

const bgVids = [{
	video: "jet",
	prodFrame: `
		<video class="video-iframe" muted autoplay loop>
  			<source src="https://cdn-cloudflare.ga/videoassets/jet-background.mp4" type="video/mp4">
  			Your browser does not support the video tag.
		</video>
		`,
	devFrame: `
		<iframe class="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/fPYU2BA_11c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		`
}, {
	video: "typing",
	prodFrame: `
		<video class="video-iframe" muted autoplay loop>
		<source src="https://s3-eu-west-1.amazonaws.com/cdn-aws-infinityarc.tk/videoassets/typing.mp4" type="video/mp4">
		Your browser does not support the video tag.
	  </video>
		`,
	devFrame: `
		<iframe class="video-iframe" src="https://www.youtube-nocookie.com/embed/pely_DpZfOk?controls=0&loop=1&autoplay=1&showinfo=0" frameborder="0" allow="accelerometer;loop;controls;info; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}
]

export default () => {
	const el = document.createElement('div');
	el.classList.add('video-background');
	el.innerHTML = bgVids[0].prodFrame;
	return el;
}

