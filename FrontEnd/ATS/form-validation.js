async function parsePDF() {
    const fileInput = document.getElementById("pdfFileInput");
    const parsedTextElement = document.getElementById("parsedText");

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const typedArray = new Uint8Array(e.target.result);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;
            let text = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                content.items.forEach(item => {
                    text += item.str + " ";
                });
            }

            parsedTextElement.innerText = text;
            fillForm(text); // Function to fill the form with parsed details
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert("Please select a PDF file.");
    }
}

function fillForm(parsedText) {
    // Assuming the resume contains labels like "Name: John Doe", "Email: john@example.com"
    // You can modify the regular expressions based on the expected format of the resume.

    // Extract and set First Name
    const firstNameMatch = parsedText.match(/First Name: (\w+)/i);
    if (firstNameMatch) {
        document.getElementById('firstName').value = firstNameMatch[1];
    }

    // Extract and set Last Name
    const lastNameMatch = parsedText.match(/Last Name: (\w+)/i);
    if (lastNameMatch) {
        document.getElementById('lastName').value = lastNameMatch[1];
    }

    // Extract and set Email
    const emailMatch = parsedText.match(/Email: (\S+@\S+\.\S+)/i);
    if (emailMatch) {
        document.getElementById('email').value = emailMatch[1];
    }

    // Extract and set Age
    const ageMatch = parsedText.match(/Age: (\d+)/i);
    if (ageMatch) {
        document.getElementById('age').value = ageMatch[1];
    }

    // Similar extraction and setting can be done for other fields like Experience, Skills, etc.
}
