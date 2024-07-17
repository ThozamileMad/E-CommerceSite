const form = document.getElementById("form")
const submitButton = document.getElementById("form-but")
const noError = true;

// Flag Invalid Char
const invalidInput = (regex, input) => {
    return regex.test(input);
}


function triggerError(label, input, errorbox, message) {
    label.style.color = "red";
    input.style.borderColor = "red";
    errorbox.innerHTML = `<p style="color: red" class="error-text">${message}</p>`;
    noError = false;
}


function checkForSpacesInInputs(labels, userInputs, errorBoxes) {
    for (let i = 0; i < labels.length; i++) {
         const userInput = userInputs[i];
         const label = labels[i];
         const errorBoxes = erroroBoxes[i]

        if (invalidInput(/\s/g, userInput.value)) {
            triggerError(userInput, label, errorBoxes, "Error! No spaces allowed in field.")
        }
    }
}


function validateEmailAddress(emailInput, emailLabel, emailErrorField) {
    const emailAddress = emailInput.value

    if (emailAddress.includes("@")) {
        const usernameAndDomain = emailAddress.split("@");
        const emailUsername = usernameDomain[0];
        const emailDomain = usernameDomain[1];

        // Prompts Username Error
        if (invalidEmail(/^[.-_!#$%&'*+/=?^`{|}~]|[.-_!#$%&'*+/=?^`{|}~]$|[\\,":;<>[\]()]|[-_!\.#$%&'*+/=?^`{|}~]{2}/, username)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Error! in email username!!!");
        }

        // Prompt Domain Error
        if (invalidEmail(/^[-.]|[-.]$|[^a-zA-Z0-9-.]|[.-]{2}/, domain)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Error! in email domain!!!");
        }
    else {
        noError = false;
    }
}


function submitForm() {
    // Labels
    const labels = document.querySelectorAll("label");
    const userInputs = document.querySelectorAll("input");
    const errorFields = document.querySelectorAll(".error-field");

    // Detect Spaces in fields
    checkForSpaceError(labels, userInputs, errorFields);

    // Validate Email Address
    validateEmailAddress(userInput[1], labels[1], errorFields[1])

    if (noError) {
        form.submit()
    }
}

submitButton.addEventListener("click", submitForm)


// Ctrl + Enter Form Submission
function ctrlEnterSubmit(event) {
    if (event.code === "Enter") {
        submitForm();
    }
}

document.addEventListener("keyup", ctrlEnterSubmit)







