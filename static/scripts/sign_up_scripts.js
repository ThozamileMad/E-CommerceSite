const form = document.getElementById("form")

// Error Element
const errorTag = document.getElementById("error")

// Username elements
const usernameLabel = document.querySelector("label[for='username']");
const usernameInput = document.getElementById("username");

// Password elements
const passwordLabel = document.querySelector("label[for='password']");
const passwordInput = document.getElementById("password");

// Email elements
const emailLabel = document.querySelector("label[for='email']");
const emailInput = document.getElementById("email");

// Confirm Password elements
const confirmPasswordLabel = document.querySelector("label[for='confirm-password']");
const confirmPasswordInput = document.getElementById("confirm-password");

// Errors
const errors = [null, null, null, null]

// Hanger Image
const hangerImage = document.querySelector(".hanger-img")

const submitButton = document.getElementById("form-but")

// Checks for invalid characters using regex
const invalidInput = (regex, input) => {
    return regex.test(input);
}


// Displays errors by making an element's features red and showing error message
function triggerError(label, input, message) {
    label.style.color = "red";
    input.style.borderColor = "red";
    errorTag.textContent = message
}


// Reverts errors back to valid
function triggerValid(label, input) {
    label.style.color = "black";
    input.style.borderColor = "black";
    errorTag.textContent = "";
}


function makeAllValid() {
    const labels = document.querySelectorAll("label");
    const inputs = document.querySelectorAll("input");

    for (let i = 0; i < labels.length; i++) {
        triggerValid(labels[i], inputs[i])
    }
}


// Username Validation Code

// Ensures that the username provided by the user has no invalid characters
// Ensures that the username meets minimum and maximum length conditions
function usernameValidator() {
    const inputValue = usernameInput.value;
    const inputLength = inputValue.trim().length;

    if (invalidInput(/[^a-zA-Z\d_\-.]/, inputValue.trim()) || invalidInput(/^\s/, inputValue)) {
        errors[0] = {label: usernameLabel, input: usernameInput, message: "Invalid username: Please use only letters, numbers, underscores (_), hyphens (-), and periods (.)."};
    } else if (inputLength < 3) {
        errors[0] = {label: usernameLabel, input: usernameInput, message: "Your username must be at least 3 characters long. Please enter a longer username."};
    } else if (inputLength > 12) {
        errors[0] = {label: usernameLabel, input: usernameInput, message: "Your username must not exceed 12 characters. Please enter a shorter username."};
    } else {
        errors[0] = null;
    }
}


const countAt = (email) => {
    if (email.includes("@")) {
        return email.match(/@/g).length === 1 ? true : false;
    } else {
        return false;
    }
}

// Email Validation Code
// Checks if email has valid characters such as @ and .
function validateEmailAddress() {
    const emailAddress = emailInput.value
    const oneAtSymbol = countAt(emailAddress)
    console.log(oneAtSymbol)
    if (emailAddress.includes("@") && emailAddress.includes(".") && oneAtSymbol) {
        const usernameAndDomain = emailAddress.split("@");
        const emailUsername = usernameAndDomain[0];
        const emailDomain = usernameAndDomain[1];

        // Prompts Username and Domain Error
        if (invalidInput(/^[\.\-_!#$%&'*+/=?^`{|}~\s]|[\.\-_!#$%&'*+/=?^`{|}~]$|[\\,":;<>[\]()\s]|[-_!\.#$%&'*+/=?^`{|}~]{2}/, emailUsername)) {
            errors[1] = {label: emailLabel, input: emailInput, message: "Invalid Email Username. Please enter a valid email address. Ensure there are no spaces or invalid characters."};
        } else if (invalidInput(/^[-.\s]|[-.]$|[^a-zA-Z0-9-.]|[.-]{2}/, emailDomain)) {
            errors[1] = {label: emailLabel, input: emailInput, message: "Invalid Email Domain. Please enter a valid email address. Ensure there are no spaces or invalid characters."};
        } else {
            errors[1] = null
        }
    } else {
        errors[1] = {label: emailLabel, input: emailInput, message: "Invalid email address. Please ensure your email includes one '@' symbol and one period."};
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
        errors[2] = {label: passwordLabel, input: passwordInput, message: "Invalid Password: Your password contains spaces, please remove all spaces."};
    } else if (inputLength < 8) {
        errors[2] = {label: passwordLabel, input: passwordInput, message: "Invalid Password: Your password must be at least 8 characters long. Please enter a longer password."}
    } else if (inputLength > 64) {
        errors[2] = {label: passwordLabel, input: passwordInput, message: "Invalid Password: Your password must not exceed 64 characters. Please enter a shorter password."}
    } else if (matchPasswordChar(inputValue.trim()) < 8) {
        errors[2] = {label: passwordLabel, input: passwordInput, message: "Invalid Password: Your password must contain at least 1 special character, 2 uppercase letters, 3 lowercase letters, and 2 digits."}
    }  else {
        errors[2] = null;
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
    if (passwordInputValue !== confirmPasswordInputValue) {
        errors[3] = {label: confirmPasswordLabel, input: confirmPasswordInput, message: "Passwords do not match"};
    } else {
        errors[3] = null;
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
    usernameValidator();
    validateEmailAddress()
    passwordValidator();
    checkIfPasswordsMatch();

    const notNullErrors = errors.filter((data) => data !== null);
    console.log(notNullErrors)
    if (notNullErrors.length > 0) {
        const data = notNullErrors[0]
        makeAllValid()
        triggerError(data.label, data.input, data.message)
    } else {
        moveImageOnSubmit()
        form.submit();
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
    const titleText = errorTag.innerText;
    const labelText = label.innerText.slice(0, label.innerText.length - 1);
    // abcABC123!@#
    if (titleText.includes(labelText)) {
         label.style.color = "red";
         input.style.borderColor = "red";
    }
}

promptDatabaseError(usernameLabel, usernameInput);
promptDatabaseError(emailLabel, emailInput);
promptDatabaseError(passwordLabel, passwordInput);






