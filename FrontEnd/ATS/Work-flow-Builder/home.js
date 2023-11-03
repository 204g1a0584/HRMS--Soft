// This function will run when the drag starts.
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

// This function runs when the dragged item enters the drop zone.
function dragEnter(e) {
    e.preventDefault();
}

// This function runs when the dragged item is over the drop zone.
function dragOver(e) {
    e.preventDefault();
}

// This function runs when the dragged item is dropped into the drop zone.
function drop(e) {
    e.preventDefault();
    
    // Get the id of the dragged element
    const id = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(id);
    
    // Clone the dragged element
    const clone = draggedElement.cloneNode(true);
    
    // Generate a unique id for the cloned element
    clone.id = 'clone-' + new Date().getTime();
    
    // Append the cloned element to the canvas
    document.getElementById('canvas').appendChild(clone);
}

// Assign event listeners
document.querySelectorAll('.step').forEach(item => {
    item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', dragStart);
});

document.getElementById('canvas').addEventListener('dragenter', dragEnter);
document.getElementById('canvas').addEventListener('dragover', dragOver);
document.getElementById('canvas').addEventListener('drop', drop);
