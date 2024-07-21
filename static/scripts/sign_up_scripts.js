const form = document.getElementById("form")

// Username elements
const usernameLabel = document.querySelector("label[for='username']");
const usernameInput = document.getElementById("username");
const usernameErrorField = document.querySelector(".error-box.username");

// Password elements
const passwordLabel = document.querySelector("label[for='password']");
const passwordInput = document.getElementById("password");
const passwordErrorField = document.querySelector(".error-box.password");

// Email elements
const emailLabel = document.querySelector("label[for='email']");
const emailInput = document.getElementById("email");
const emailErrorField = document.querySelector(".error-box.email");

// Confirm Password elements
const confirmPasswordLabel = document.querySelector("label[for='confirm-password']");
const confirmPasswordInput = document.getElementById("confirm-password");
const confirmPasswordErrorField = document.querySelector(".confirm-password");

// Hanger Image
const hangerImage = document.querySelector(".hanger-img")

const submitButton = document.getElementById("form-but")

// Checks for invalid characters using regex
const invalidInput = (regex, input) => {
    return regex.test(input);
}

// Displays errors by making an element's features red and showing error message
function triggerError(label, input, errorbox, message) {
    label.style.color = "red";
    input.style.borderColor = "red";
    errorbox.innerHTML = `<p style="color: red" class="error-text">${message}</p>`;
}

// Reverts errors back to valid
function triggerValid(label, input, errorbox) {
    label.style.color = "black";
    input.style.borderColor = "black";
    errorbox.innerHTML = ``;
}

// Username Validation Code

// Ensures that the username provided by the user has no invalid characters
// Ensures that the username meets minimum and maximum length conditions
function usernameValidator() {
    const inputValue = usernameInput.value;
    const inputLength = inputValue.trim().length;

    if (invalidInput(/[^a-zA-Z\d_\-.]/, inputValue.trim()) || invalidInput(/^\s/, inputValue)) {
        triggerError(usernameLabel, usernameInput, usernameErrorField, `Invalid username: Please use only letters, numbers, underscores (_), hyphens (-), and periods (.).`);
    } else if (inputLength < 3) {
        triggerError(usernameLabel, usernameInput, usernameErrorField, "Your username must be at least 3 characters long. Please enter a longer username.")
    } else if (inputLength > 12) {
        triggerError(usernameLabel, usernameInput, usernameErrorField, "Your username must not exceed 12 characters. Please enter a shorter username.")
    } else {
        triggerValid(usernameLabel, usernameInput, usernameErrorField);
        return true;
    }
}


// Email Validation Code
// Checks if email has valid characters such as @ and .
function validateEmailAddress() {
    const emailAddress = emailInput.value
    if (emailAddress.includes("@") && emailAddress.includes(".")) {
        const usernameAndDomain = emailAddress.split("@");
        const emailUsername = usernameAndDomain[0];
        const emailDomain = usernameAndDomain[1];

        // Prompts Username and Domain Error
        if (invalidInput(/^[\.\-_!#$%&'*+/=?^`{|}~\s]|[\.\-_!#$%&'*+/=?^`{|}~]$|[\\,":;<>[\]()\s]|[-_!\.#$%&'*+/=?^`{|}~]{2}/, emailUsername)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Invalid Username. Please enter a valid email address. Ensure there are no spaces or invalid characters.");
        } else if (invalidInput(/^[-.\s]|[-.]$|[^a-zA-Z0-9-.]|[.-]{2}/, emailDomain)) {
            triggerError(emailLabel, emailInput, emailErrorField, "Invalid Domain. Please enter a valid email address. Ensure there are no spaces or invalid characters.");
        } else {
            triggerValid(emailLabel, emailInput, emailErrorField);
            return true;
        }
    } else {
        triggerError(emailLabel, emailInput, emailErrorField, "Invalid email address. Please ensure your email includes at least one '@' symbol and one period.");
    }
}


// Password Validation Code
// Matches specific characters in password input and returns the number of matches
function matchPasswordChar() {
    const regexList = [/[A-Z]/g, /[a-z]/g, /[\d]/g, /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/'\\;]/g];
    const maxNums = [2, 3, 2, 1]
    let numOfMatches = [];

    for (let i = 0; i < regexList.length; i++) {
        const matches = passwordInput.value.match(regexList[i])
        const maxNum = maxNums[i]

        if (matches !== null) {
           if (matches.length <= maxNum) {
             numOfMatches.push(matches.length)
           } else {
             numOfMatches.push(maxNum)
           }
        } else {
            numOfMatches.push(0);
        }
    }
    return numOfMatches.reduce((sum, num) => sum += num)
}


// Renders bars that indicate the passwords strength
const makePasswordBars = (colors, description) => {
    return `<div class="strength-field" style="background-color: ${colors[0]}"></div>
            <div class="strength-field" style="background-color: ${colors[1]}"></div>
            <div class="strength-field" style="background-color: ${colors[2]}"></div>
            <div class="strength-field" style="background-color: ${colors[3]}"></div>
            <span class="strength-field-des" style="color: ${colors[0]}">${description}</span>`
}


// Checks how strong the password is and shows bars to the end-user
function checkPasswordStrength(userInput) {
    const totalMatchNum = matchPasswordChar(userInput)
    const strengthField = document.querySelector(".strength-fields");

    if (totalMatchNum > 6) {
       strengthField.innerHTML = makePasswordBars(["#32CD32", "#32CD32", "#32CD32", "#32CD32"], "(secure)");
    } else if (totalMatchNum > 4) {
        strengthField.innerHTML = makePasswordBars(["#FFA500", "#FFA500", "#FFA500", "#B0B0B0"], "(strong)");
    } else if (totalMatchNum > 2) {
        strengthField.innerHTML = makePasswordBars(["#FFD700", "#FFD700", "#B0B0B0", "#B0B0B0"], "(moderate)");
    } else if (totalMatchNum > 0) {
        strengthField.innerHTML = makePasswordBars(["#FF4C4C", "#B0B0B0", "#B0B0B0", "#B0B0B0"], "(weak)");
    } else {
        strengthField.innerHTML = makePasswordBars(["#B0B0B0", "#B0B0B0", "#B0B0B0", "#B0B0B0"], "(unsecure)");
    }
}


// Ensures that the password provided by the user has no invalid characters
// Ensures that the password meets minimum and maximum length conditions
function passwordValidator() {
    const inputValue = passwordInput.value;
    const inputLength = inputValue.trim().length;

    if (invalidInput(/\s/g, inputValue.trim()) || invalidInput(/^\s/, inputValue)) {
        triggerError(passwordLabel, passwordInput, passwordErrorField, "Invalid Password: Your password contains spaces, please remove all spaces.");
    } else if (inputLength < 8) {
        triggerError(passwordLabel, passwordInput, passwordErrorField, "Invalid Password: Your password must be at least 8 characters long. Please enter a longer password.")
    } else if (inputLength > 64) {
        triggerError(passwordLabel, passwordInput, passwordErrorField, "Invalid Password: Your password must not exceed 64 characters. Please enter a shorter password.")
    } else if (matchPasswordChar(inputValue.trim()) < 8) {
        triggerError(passwordLabel, passwordInput, passwordErrorField, "Invalid Password: Your password must contain at least 1 special character, 2 uppercase letters, 3 lowercase letters, and 2 digits.")
    }  else {
        triggerValid(passwordLabel, passwordInput, passwordErrorField);
        return true
    }
}

// Displays password strength (bars)
passwordInput.addEventListener("input", () => {
    checkPasswordStrength(passwordInput.value);
})


// Confirm Password code
function checkIfPasswordsMatch() {
    const passwordInputValue = passwordInput.value.trim()
    const confirmPasswordInputValue = confirmPasswordInput.value.trim()
    if (passwordInputValue === confirmPasswordInputValue) {
        triggerValid(confirmPasswordLabel, confirmPasswordInput, confirmPasswordErrorField)
        return true;
    } else {
        triggerError(confirmPasswordLabel, confirmPasswordInput, confirmPasswordErrorField, "Error: Passwords do not match. Please try again.")
    }
}

// Hanger Image Animation
const moveImageOnSubmit = () => {
    hangerImage.style.top = "100%";
    setTimeout(() => {
        hangerImage.style.display = "none"
    }, 400)
}

// Submission code
// Performs validation checks and submits form if provided info is valid
function submitForm() {
    const usernameIsValid = usernameValidator()
    const emailIsValid = validateEmailAddress()
    const passwordIsValid = passwordValidator()
    const passwordsMatch = checkIfPasswordsMatch()

    if (usernameIsValid && emailIsValid && passwordIsValid && passwordsMatch) {
        moveImageOnSubmit()
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


// Prompt Error if input is in database
function promptDatabaseError(label, input) {
    const databaseErrorTitle = document.getElementById("database-error");
    const titleText = databaseErrorTitle.innerText;
    const labelText = label.innerText.slice(0, label.innerText.length - 1);

    if (titleText.includes(labelText)) {
         label.style.color = "red";
         input.style.borderColor = "red";
    }
}

promptDatabaseError(usernameLabel, usernameInput);
promptDatabaseError(emailLabel, emailInput);
promptDatabaseError(passwordLabel, passwordInput);






