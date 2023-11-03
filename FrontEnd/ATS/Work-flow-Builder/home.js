function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = data + "_copy";
    nodeCopy.draggable = false; // to make it non-draggable after placing in the canvas
    ev.target.appendChild(nodeCopy);
    populatePropertiesPanel(data);
}

function populatePropertiesPanel(stepId) {
    const propertiesPanel = document.querySelector('.properties-panel');
    propertiesPanel.innerHTML = '<h4>Properties Panel</h4>'; // reset content
    let content = '<label>Step Name:</label><input type="text">';
    switch(stepId) {
        case 'candidate':
            content += '<label>Step Description:</label><input type="text" value="Name of Candidate">';
            break;
        case 'hr':
            content += '<label>Step Description:</label><input type="text" value="Assigned HR">';
            break;
        case 'comment':
            content += '<label>Step Description:</label><textarea>Comments</textarea>';
            break;
    }
    content += '<label>Step Configuration:</label><textarea></textarea>';
    propertiesPanel.innerHTML += content;
}
