const form = document.getElementById("form")
const submitButton = document.getElementById("form-but")


// Flag Invalid Char
const invalidInput = (regex, input) => {
    return regex.test(input);
}


function triggerError(label, input, errorbox, message) {
    label.style.color = "red";
    input.style.borderColor = "red";
    errorbox.innerHTML = `<p style="color: red" class="error-text">${message}</p>`;
}


function triggerValid(label, input, errorbox) {
    label.style.color = "black";
    input.style.borderColor = "black";
    errorbox.innerHTML = ``;
}


function checkForSpacesInInputs(labels, userInputs, errorBoxes) {
    let validInputNum = 0
    for (let i = 0; i < labels.length; i++) {
        const userInput = userInputs[i];
        const userInputValue = userInput.value
        const label = labels[i];
        const errorBox = errorBoxes[i]

        // Checks For
        if (invalidInput(/\s/g, userInputValue.trim()) || userInputValue.length === 0 || invalidInput(/^\s/, userInputValue)) {
            triggerError(label, userInput, errorBox, "Error!!! No spaces allowed in field.");
            validInputNum += 1;
        }  else {
            triggerValid(label, userInput, errorBox);
        }
    }
    return validInputNum === 3 ? true : false;
}


function validateEmailAddress(emailInput, emailLabel, emailErrorField) {
    const emailAddress = emailInput.value.trim()
    if (emailAddress.includes("@") && emailAddress.includes(".")) {
        const usernameAndDomain = emailAddress.split("@");
        const emailUsername = usernameAndDomain[0];
        const emailDomain = usernameAndDomain[1];

        // Prompts Username and Domain Error
        if (invalidInput(/^[\.\-_!#$%&'*+/=?^`{|}~]|[\.\-_!#$%&'*+/=?^`{|}~]$|[\\,":;<>[\]()]|[-_!\.#$%&'*+/=?^`{|}~]{2}/, emailUsername)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Error!!! Invalid Username.");
        } else if (invalidInput(/^[-.]|[-.]$|[^a-zA-Z0-9-.]|[.-]{2}/, emailDomain)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Error!!! Invalid Domain.");
        } else {
            triggerValid(emailLabel, emailInput, emailErrorField);
            return true;
        }
    } else {
        triggerError(emailLabel, emailInput, emailErrorField, "Error!!! Invalid Email Address.");
    }
}


function submitForm() {
    // Labels
    const labels = document.querySelectorAll("label");
    const userInputs = document.querySelectorAll("input");
    const errorFields = document.querySelectorAll(".error-box");

    // Detect Spaces in fields
    const spacesInInputs = checkForSpacesInInputs(labels, userInputs, errorFields);

    // Validate Email Address
    const emailIsValid = validateEmailAddress(userInputs[1], labels[1], errorFields[1])

    if (spacesInInputs === false && emailIsValid) {
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







