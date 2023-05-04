var debuglog = document.getElementById('debuglog');
var drag_source = null;

const HOVER_COLOR = '#aaaaaa'
const DROPZONE_COLOR = '#3d424d'

function dragstart(event) {
	console.log("drag start", event.target)
	drag_source = event.target;
}

function dragexit(e) {
	e.preventDefault();
	e.target.style.backgroundColor = DROPZONE_COLOR;
}

function dragover(e) {
	console.log(e.target.style);
	e.target.style.backgroundColor = HOVER_COLOR;
	e.preventDefault();
}

function dragdrop(e) {
	e.preventDefault();
	if (e.target.className == "dropzone") {
		e.target.style.backgroundColor = DROPZONE_COLOR;
		e.target.appendChild(drag_source)
	}
}

var draggables = document.querySelectorAll('[draggable="true"]');
draggables.forEach(function(element) {
	element.addEventListener('dragstart', dragstart)
})

var dropzones = Array.from(document.getElementsByClassName('dropzone'))
dropzones.forEach(function(element) {
	element.addEventListener('drop', dragdrop)
	element.addEventListener('dragover', dragover)
	element.addEventListener('dragleave', dragexit)
	element.style.backgroundColor = DROPZONE_COLOR
})