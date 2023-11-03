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
        color: 'lightblue'
    },
    cellViewNamespace: namespace
});

function addblock(){
    name=document.getElementById("name").value;
    var rect = new joint.shapes.standard.Rectangle();
    rect.position(0, 0);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: name,
            fill: 'white'
        }
    });
    rect.addTo(graph);
}

function linkblocks(s,d){
    var link = new joint.shapes.standard.Link();
    link.source(s);
    link.target(d);
    link.addTo(graph);
}

let selectedElement;

paper.on('element:pointerdblclick', function(elementView, evt) {
    selectedElement = elementView.model;
    document.getElementById('stepNameInput').value = selectedElement.attr('label/text');
    document.getElementById('stepDescriptionInput').value = selectedElement.get('stepDescription');
    document.getElementById('stepConfigInput').value = selectedElement.get('stepConfig');
});

function updateBlock() {
    selectedElement.attr('label/text', document.getElementById('stepNameInput').value);
    selectedElement.set('stepDescription', document.getElementById('stepDescriptionInput').value);
    selectedElement.set('stepConfig', document.getElementById('stepConfigInput').value);
}

paper.on('blank:pointerdown', function(evt, x, y) {

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
