const piano = document.querySelector(`.piano`);
const pianoKeys = document.querySelectorAll(`.piano-key`);

piano.addEventListener('mousedown', mouseDownHandler);
window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyUp);
function mouseDownHandler(event) {
	const btn = event.target;
	if (!isPianoKey(btn)) return;

	piano.addEventListener('mouseover', mouseover);
	piano.addEventListener('mouseout', mouseout);

	searchAudio(btn);
	addClass(btn);

	window.addEventListener('mouseup', mouseUp);
}

function isPianoKey(key) {
	return key.classList.contains('piano-key');
}

function searchAudio(pianoKey) {
	const note = pianoKey.dataset.note;
	const src = `./assets/audio/${note}.mp3`;
	playAudio(src);
}

function playAudio(src) {
	const audio = new Audio();
	audio.currentTime = 0;
	audio.src = src;
	audio.play();
}

function addClass(btn) {
	btn.classList.add('piano-key-active');
	btn.classList.add('piano-key-active-pseudo');
}
function removeClass(btn) {
	btn.classList.remove('piano-key-active');
	btn.classList.remove('piano-key-active-pseudo');
}

function mouseover(event) {
	const target = event.target;
	if (!isPianoKey(target)) return;
	searchAudio(target);
	addClass(target);
}

function mouseout(event) {
	const target = event.target;
	if (!isPianoKey(target)) return;
	removeClass(target);
}

function mouseUp() {
	pianoKeys.forEach((btn) => {
		removeClass(btn);
	});
	piano.removeEventListener('mouseover', mouseover);
	piano.removeEventListener('mouseout', mouseout);
	window.removeEventListener('mouseup', mouseUp);
}
/* keyboard */
keydown.press = [];
function keydown(event) {
	if (event.repeat) return;
	let target = event.code.slice(-1);
	pianoKeys.forEach((pianoKey) => {
		if (pianoKey.dataset.letter === target) {
			addClass(pianoKey);
			searchAudio(pianoKey);
			keydown.press.push(pianoKey);
		}
	});
}

function keyUp(event) {
	let target = event.code.slice(-1);
	let index = keydown.press.findIndex((key) => key.dataset.letter === target);
	if (~index) {
		let key = keydown.press[index];
		removeClass(key);
		keydown.press.splice(index, 1);
	}
}

/* notes / letters */

const btnContainer = document.querySelector('.btn-container');
btnContainer.addEventListener('click', btnContainerHandler);

function btnContainerHandler(event) {
	let targetBtn = event.target;
	if (!targetBtn.classList.contains('btn')) return;

	const allButtons = event.currentTarget.querySelectorAll('.btn');
	allButtons.forEach((btn) => {
		btn.classList.remove('btn-active');
		if (btn === targetBtn) {
			btn.classList.add('btn-active');
		}
	});

	if (targetBtn.classList.contains('btn-notes')) {
		pianoKeys.forEach((pianoKey) => {
			pianoKey.classList.remove('letter');
		});
	} else if (targetBtn.classList.contains('btn-letters')) {
		pianoKeys.forEach((pianoKey) => {
			pianoKey.classList.add('letter');
		});
	}
}

/* Fullscreen */
const fullscreenBtn = document.querySelector(`.fullscreen`);
fullscreenBtn.addEventListener('click', fullScreen);

function fullScreen(event) {
	console.log(document.fullscreenElement);
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}
