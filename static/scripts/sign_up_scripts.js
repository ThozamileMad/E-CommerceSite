const form = document.getElementById("form")
const submitButton = document.getElementById("form-but")
const validEmail = false


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


function matchPasswordChar() {
    // Array.from(userInput.match(/[A-Z]/g)).length
    const regexList = [/[A-Z]/g, /[a-z]/g, /[\d]/g, /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/'\\;]/g];
    let numOfMatches = [];
    for (let i = 0; i < regexList.length; i++) {
        console.log(userInput.match(regexList[i]))
        if (userInput.match(regexList[i]) !== null) {
            numOfMatches.push(userInput.match(regexList[i]).length)
        } else {
            numOfMatches.push(0);
        }
    }
    return numOfMatches
}


function checkPasswordStrength() {
    const matches = matchPasswordChar();
    if (matches[0] )
}

function usernameValidator() {
    const label = document.querySelector("label[for='username']");
    const input = document.getElementById("username");
    const inputValue = input.value;
    const inputLength = inputValue.trim().length;
    const errorField = document.querySelector(".error-box.username");

    if (invalidInput(/[^a-zA-Z\d_\-.]/, inputValue.trim()) || invalidInput(/^\s/, inputValue)) {
        triggerError(label, input, errorField, `Invalid username: Please use only letters, numbers, underscores (_), hyphens (-), and periods (.).`);
    } else if (inputLength < 3) {
        triggerError(label, input, errorField, "Your username must be at least 3 characters long. Please enter a longer username.")
    } else if (inputLength > 12) {
        triggerError(label, input, errorField, "Your username must not exceed 12 characters. Please enter a shorter username.")
    } else {
        triggerValid(label, input, errorField);
        return true;
    }
}


function passwordValidator() {
    const label = document.querySelector("label[for='password']");
    const input = document.getElementById("password");
    const inputValue = input.value;
    const inputLength = inputValue.trim().length;
    const errorField = document.querySelector(".error-box.password");

    if (invalidInput(/\s/g, inputValue.trim()) || invalidInput(/^\s/, inputValue)) {
        triggerError(label, input, errorField, "Invalid Password: Your password contains spaces, please remove all spaces.");
    } else if (inputLength < 8) {
        triggerError(label, input, errorField, "Invalid Password: Your password must be at least 8 characters long. Please enter a longer password.")
    } else if (inputLength > 64) {
        triggerError(label, input, errorField, "Invalid Password: Your password must not exceed 64 characters. Please enter a shorter password.")
    } else {
        triggerValid(label, input, errorField);
        return true
    }
}


function validateEmailAddress(emailInput, emailLabel, emailErrorField) {
    const emailAddress = emailInput.value.trim()
    if (emailAddress.includes("@") && emailAddress.includes(".")) {
        const usernameAndDomain = emailAddress.split("@");
        const emailUsername = usernameAndDomain[0];
        const emailDomain = usernameAndDomain[1];

        // Prompts Username and Domain Error
        if (invalidInput(/^[\.\-_!#$%&'*+/=?^`{|}~\s]|[\.\-_!#$%&'*+/=?^`{|}~]$|[\\,":;<>[\]()\s]|[-_!\.#$%&'*+/=?^`{|}~]{2}/, emailUsername)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Error!!! Invalid Username.");
        } else if (invalidInput(/^[-.\s]|[-.]$|[^a-zA-Z0-9-.]|[.-]{2}/, emailDomain)) {
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

    // Validate Email Address
    const usernameIsValid = usernameValidator()
    const emailIsValid = validateEmailAddress(userInputs[1], labels[1], errorFields[1])
    passwordIsValid = passwordValidator()

    if (usernameIsValid && emailIsValid && passwordIsValid) {
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







