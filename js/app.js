const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function onMouseMove(event) { 
	let x = event.offsetX;
	let y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function onMouseDown(event) {
	painting = true;
}

function stopPainting() {
	painting = false;
}

function handlCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup',  stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handlCanvasClick);
	canvas.addEventListener('contextmenu', function (event) {
		event.preventDefault();
	});
}

if (range) {
	range.addEventListener('input', function (event) {
		ctx.lineWidth = event.target.value;
	})
}

Array.from(colors).forEach(color => color.addEventListener('click', function (event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}))

if (mode) {
	mode.addEventListener('click', function () {
		if (filling === true) {
			filling = false;
			mode.innerText = 'Filling';
		} else {
			filling = true;
			mode.innerText = 'Painting';
		}
	})
}

if (saveBtn) {
	saveBtn.addEventListener('click', function () {
		const image = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.href = image;
		link.download = 'image';
		link.click();

	})
}