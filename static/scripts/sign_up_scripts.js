const form = document.getElementById("form")
const submitButton = document.getElementById("form-but")
let noError = true;

// Flag Invalid Char
const invalidInput = (regex, input) => {
    return regex.test(input);
}


function triggerError(label, input, errorbox, message) {
    label.style.color = "red";
    input.style.borderColor = "red";
    input.value = "";
    errorbox.innerHTML = `<p style="color: red" class="error-text">${message}</p>`;
    noError = false;
}


function checkForSpacesInInputs(labels, userInputs, errorBoxes) {
    for (let i = 0; i < labels.length; i++) {
         const userInput = userInputs[i];
         const label = labels[i];
         const errorBox = errorBoxes[i]

        if (invalidInput(/\s/g, userInput.value)) {
            triggerError(label, userInput, errorBox, "Error!!! No spaces allowed in field.")
        } else {
            noError = true;
        }
    }
}


function validateEmailAddress(emailInput, emailLabel, emailErrorField) {
    const emailAddress = emailInput.value

    if (emailAddress.includes("@")) {
        const usernameAndDomain = emailAddress.split("@");
        const emailUsername = usernameAndDomain[0];
        const emailDomain = usernameAndDomain[1];

        // Prompts Username Error
        if (invalidInput(/^[\.\-_!#$%&'*+/=?^`{|}~]|[\.\-_!#$%&'*+/=?^`{|}~]$|[\\,":;<>[\]()]|[-_!\.#$%&'*+/=?^`{|}~]{2}/, emailUsername)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Error!!! Invalid Username.");
        }

        // Prompt Domain Error
        if (invalidInput(/^[-.]|[-.]$|[^a-zA-Z0-9-.]|[.-]{2}/, emailDomain)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Error!!! Invalid Domain.");
        }
    } else {
        noError = false;
    }
}


function submitForm() {
    // Labels
    const labels = document.querySelectorAll("label");
    const userInputs = document.querySelectorAll("input");
    const errorFields = document.querySelectorAll(".error-box");

    // Detect Spaces in fields
    checkForSpacesInInputs(labels, userInputs, errorFields);

    // Validate Email Address
    validateEmailAddress(userInputs[1], labels[1], errorFields[1])

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







