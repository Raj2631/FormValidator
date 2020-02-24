const elements = {
    form: document.getElementById("form"),
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    password2: document.getElementById("password2")
};

//Show input error message
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add("error");
    const small = formControl.querySelector("small");
    small.textContent = message;
};

const showSuccess = input => {
    const formControl = input.parentElement;
    formControl.classList.remove("error");
    formControl.classList.add("success");
};

const checkEmail = input => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else if (input.value.length === 0) {
        showError(input, `${getFieldName(input)} is required`);
    } else {
        showError(input, `${getFieldName(input)} is not valid`);
    }
};

// Check required fields.
const checkRequired = inputArr => {
    inputArr.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
};

// Check input length
const checkLength = (input, min, max) => {
    if (!input.value) {
        showError(input, `${getFieldName(input)} is required`);
    } else if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
};

// Check if the passwords match.

const checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
        showError(input1, "");
    } else {
        showSuccess(input2);
    }
};

//Get Field Name
const getFieldName = input => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

//Event Listeners.
elements.form.addEventListener("submit", e => {
    e.preventDefault();

    checkRequired([
        elements.username,
        elements.email,
        elements.password,
        elements.password2
    ]);
    checkLength(elements.username, 3, 15);
    checkLength(elements.password, 6, 25);
    checkEmail(elements.email);
    checkPasswordsMatch(elements.password, elements.password2);
});
