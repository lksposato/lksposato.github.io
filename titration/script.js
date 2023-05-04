var debuglog = document.getElementById('debuglog');
var drag_source = null;

const HOVER_COLOR = '#aaaaaa'
const DROPZONE_COLOR = '#3d424d'
const DROPZONE_SIZE = '200px'
const IMAGE_SIZE = "130px"
const IMAGE_HOVER_SIZE = "140px"

function mouseover(event) {
	event.target.style.width = IMAGE_HOVER_SIZE
}

function mouseleave(event) {
	console.log("mouse leave")
	event.target.style.width = IMAGE_SIZE
}

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
	if (e.target.childElementCount == 0) {
		e.target.style.backgroundColor = HOVER_COLOR;
	}
	e.preventDefault();
}

function dragdrop(e) {
	e.preventDefault();
	if (e.target.className == "dropzone") {
		e.target.style.backgroundColor = DROPZONE_COLOR;
		if (e.target.childElementCount == 0) {
			e.target.appendChild(drag_source)
		}
	}	
}

var draggables = document.querySelectorAll('[draggable="true"]');
draggables.forEach(function(element) {
	element.addEventListener('mouseover', mouseover)
	element.addEventListener('mouseleave', mouseleave)
	element.addEventListener('dragstart', dragstart)
	element.style.width = IMAGE_SIZE
	element.style.borderRadius = '20px'
})

var dropzones = Array.from(document.getElementsByClassName('dropzone'))
dropzones.forEach(function(element) {
	element.addEventListener('drop', dragdrop)
	element.addEventListener('dragover', dragover)
	element.addEventListener('dragleave', dragexit)
	element.style.backgroundColor = DROPZONE_COLOR
	element.style.width = DROPZONE_SIZE
	element.style.height = DROPZONE_SIZE
})

