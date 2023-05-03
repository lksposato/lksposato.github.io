var debuglog = document.getElementById('debuglog');
var drag_source = null;

function dragstart(event) {
	console.log(event.target)
	drag_source = event.target;
}

function dragover(e) {
	e.preventDefault();
}

function dragdrop(e) {
	e.preventDefault();
	let image = e.dataTransfer.getData('text/html');
	drag_source.remove();
	e.target.innerHTML = image;
}

var draggables = document.querySelectorAll('[draggable="true"]');
draggables.forEach(function(element) {
	console.log("event addeed")
	element.addEventListener('dragstart', dragstart)
})

var dropzones = Array.from(document.getElementsByClassName('dropzone'))
console.log(dropzones)
dropzones.forEach(function(element) {
	element.addEventListener('drop', dragdrop)
	element.addEventListener('dragover', dragover)
})