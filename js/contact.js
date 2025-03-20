document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    // Name validation
    let name = document.getElementById("name").value.trim();
    let nameError = document.getElementById("nameError");
    if (name.length < 3) {
        nameError.textContent = "Name must be at least 3 characters";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Email validation
    let email = document.getElementById("email").value.trim();
    let emailError = document.getElementById("emailError");
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Phone number validation
    let phone = document.getElementById("phone").value.trim();
    let phoneError = document.getElementById("phoneError");
    let phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
        phoneError.textContent = "Enter a valid phone number (10-15 digits)";
        isValid = false;
    } else {
        phoneError.textContent = "";
    }

    // Message validation
    let message = document.getElementById("message").value.trim();
    let messageError = document.getElementById("messageError");

    if (message.length < 10) {
        messageError.textContent = "Message must be at least 10 characters";
        isValid = false;
    } else if (message.length > 1000) {
        messageError.textContent = "Message cannot exceed 1000 characters";
        isValid = false;
    } else {
        messageError.textContent = "";
    }

    // If all fields are valid, submit the form
    if (isValid) {
        alert("Form submitted successfully!");
        this.reset();
    }
});
