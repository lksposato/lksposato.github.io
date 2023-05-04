var debuglog = document.getElementById('debuglog');
var drag_source = null;

function dragstart(event) {
	console.log("drag start", event.target)
	drag_source = event.target;
}

function dragover(e) {
	e.preventDefault();
}

function dragdrop(e) {
	e.preventDefault();
	if (e.target.className == "dropzone") {
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
})