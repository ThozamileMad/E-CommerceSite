const form = document.getElementById("form")
const userInputs = Array.from(document.querySelectorAll("form input"));
const labels = Array.from(document.querySelectorAll("label"));
const errorBoxes = Array.from(document.querySelectorAll(".error-box"));
const submitButton = document.getElementById("form-but")


// Prevent Default Form Submission
function formFunc(event) {
    event.preventDefault()
}

form.addEventListener("submit", formFunc)


// Submit form
function submitForm() {
    form.submit()
}

submitButton.addEventListener("click", submitForm)


// Ctrl + Enter Form Submission
function ctrlEnterSubmit(event) {
    if (event.code === "Enter") {
        event.preventDefault();
        form.submit();
    }
}

document.addEventListener("keyup", ctrlEnterSubmit)


// Flag Invalid Char
function isInvalidInput(input, regex) {
    const userInput = input.value
    return regex.test(userInput)
}


function detectSpacesInFields() {
    // Detect Spaces in Input Fields
    for (let i = 0; i < labels.length; i++) {
        const userInput = userInputs[i];
        const label = labels[i];
        const errorBox = errorBoxes[i];
        if (isInvalidInput(element, /\s/)) {
            userInput.style.borderColor = "red";
            label.style.color = "red";
            errorBox.innerText = `Error! Spaces in the ${label.innerText} field.`;
            return true;
        }
    }
}


function detectInvalidChar() {
    const userInput = userInputs[1];
    const userLabel = labels[1];
    const errorBox = errorBoxes[1]
}




