
const form = document.getElementById("form")
const submitButton = document.getElementById("form-but")
const hangerImage = document.querySelector(".hanger-img")
const errorTag = document.getElementById("error");

// Email elements
const emailLabel = document.querySelector("label[for='email']");
const emailInput = document.getElementById("email");

// Password elements
const passwordLabel = document.querySelector("label[for='password']");
const passwordInput = document.getElementById("password");

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
    moveImageOnSubmit()
    form.submit()
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

    if (titleText.includes(labelText)) {
         label.style.color = "red";
         input.style.borderColor = "red";
    }
}

promptDatabaseError(emailLabel, emailInput);
promptDatabaseError(passwordLabel, passwordInput);

