// Define global variables
var namespace = joint.shapes;
var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 600,
    height: 600,
    gridSize: 10,
    drawGrid: true,
    background: {
        color: 'lightblue',
    },
    cellViewNamespace: namespace,
});

var currentWorkflowName = ''; // Track the current workflow

// Function to add a block to the graph
function addblock() {
    var block_name = document.getElementById("block_name").value;
    if (block_name.trim() === "") {
        alert("Please enter a valid block name.");
        return;
    }

    var rect = new joint.shapes.standard.Rectangle();
    rect.position(0, 0);
    rect.resize(200, 80);
    rect.attr({
        body: {
            fill: 'green',
        },
        label: {
            text: block_name,
            fill: 'white',
        },
    });
    rect.addTo(graph);
}

paper.on('blank:pointerdown', function (evt, x, y) {

    var linkView = this.getDefaultLink()
        .set({
            'source': { x: x, y: y },
            'target': { x: x, y: y }
        })
        .addTo(this.model)
        .findView(this);

    // initiate the linkView arrowhead movement
    linkView.startArrowheadMove('target');

    $(document).on({
        'mousemove.example': onDrag,
        'mouseup.example': onDragEnd
    }, {
        // shared data between listeners
        view: linkView,
        paper: this
    });


    function onDrag(evt) {
        // transform client to paper coordinates
        var p = evt.data.paper.snapToGrid({
            x: evt.clientX,
            y: evt.clientY
        });
        // manually execute the linkView mousemove handler
        evt.data.view.pointermove(evt, p.x, p.y);
    }

    function onDragEnd(evt) {
        // manually execute the linkView mouseup handler
        evt.data.view.pointerup(evt);
        $(document).off('.example');
    }

});


// Function to create a new workflow and clear the graph
function createWorkflow() {
    var workflowName = document.getElementById("Workflow_name").value;
    if (workflowName.trim() === "") {
        alert("Please enter a valid workflow name.");
        return;
    }

    // Clear the existing graph
    graph.clear();

    // Add the workflow name to the list of available workflows
    var workflowList = document.querySelector(".av-wf ul");
    var newWorkflow = document.createElement("li");
    newWorkflow.textContent = workflowName;
    newWorkflow.addEventListener("click", function () {
        openWorkflow(workflowName);
    });
    workflowList.appendChild(newWorkflow);

    // Set the current workflow name
    currentWorkflowName = workflowName;
    document.getElementById("cwf_name").textContent = workflowName;

    // Clear the input field
    document.getElementById("Workflow_name").value = "";
}

// Function to update the properties of a selected block
function updateBlock() {
    if (selectedElement) {
        selectedElement.attr('label/text', document.getElementById('stepNameInput').value);
        selectedElement.set('stepDescription', document.getElementById('stepDescriptionInput').value);
        selectedElement.set('stepConfig', document.getElementById('stepConfigInput').value);
    }
}

// Function to delete the selected block
function deleteSelectedBlock() {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = undefined;
    } else {
        console.error("No element is selected for deletion.");
    }
}

// Event listener for double-clicking on an element to edit its properties
let selectedElement;
paper.on('element:pointerdblclick', function (elementView, evt) {
    selectedElement = elementView.model;
    document.getElementById('stepNameInput').value = selectedElement.attr('label/text');
    document.getElementById('stepDescriptionInput').value = selectedElement.get('stepDescription');
    document.getElementById('stepConfigInput').value = selectedElement.get('stepConfig');
});

// Event listener for pressing the Delete key to delete the selected block
document.addEventListener("keydown", function (e) {
    if (e.key === "Delete") {
        deleteSelectedBlock();
    }
});

// Function to open a specific workflow
function openWorkflow(workflowName) {
    // Set the current workflow name
    currentWorkflowName = workflowName;
    document.getElementById("cwf_name").textContent = workflowName;

    // Load the workflow graph
    loadGraph();
}



// Function to load a saved graph state from a JSON file
function loadGraph() {
    const jsonData = localStorage.getItem(currentWorkflowName);
    if (jsonData) {
        const data = JSON.parse(jsonData);
        graph.fromJSON({ cells: data });
    }
}

