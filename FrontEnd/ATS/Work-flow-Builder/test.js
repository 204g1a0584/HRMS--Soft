// script.js

let selectedBlock = null;

function addBlock() {
    const name = document.getElementById("name").value;
    const assignedResourcePerson = document.getElementById("assignedResourcePerson").value;
    const commentsFeedback = document.getElementById("commentsFeedback").value;

    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = `<p>Name: ${name}</p>
                       <p>Assigned Resource Person: ${assignedResourcePerson}</p>
                       <p>Comments/Feedback: ${commentsFeedback}</p>`;

    // Add the block to the flow graph
    const flowContainer = document.getElementById("myholder");
    flowContainer.appendChild(block);

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("assignedResourcePerson").value = "";
    document.getElementById("commentsFeedback").value = "";

    // Add event listeners for block interactions
    block.addEventListener("click", function () {
        selectBlock(block);
    });

    block.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        updateBlock(block);
    });
}

function selectBlock(block) {
    if (selectedBlock) {
        selectedBlock.classList.remove("selected");
    }

    selectedBlock = block;
    selectedBlock.classList.add("selected");
}

function updateBlock(block) {
    const stepName = prompt("Enter Step Name:", block.querySelector("p:nth-child(1)").textContent.split(": ")[1]);
    const assignedResourcePerson = prompt("Enter Assigned Resource Person:", block.querySelector("p:nth-child(2)").textContent.split(": ")[1]);
    const commentsFeedback = prompt("Enter Comments/Feedback:", block.querySelector("p:nth-child(3)").textContent.split(": ")[1]);

    block.querySelector("p:nth-child(1)").textContent = `Name: ${stepName}`;
    block.querySelector("p:nth-child(2)").textContent = `Assigned Resource Person: ${assignedResourcePerson}`;
    block.querySelector("p:nth-child(3)").textContent = `Comments/Feedback: ${commentsFeedback}`;
}

document.getElementById("addButton").addEventListener("click", addBlock);

