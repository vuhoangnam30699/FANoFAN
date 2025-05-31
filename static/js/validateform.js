
// =========================================================================================================
// =========================================== VALIDATE ====================================================
// =========================================================================================================

// Validate email address
function validateEmail(email) {
    // Regular expression to match valid email addresses
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Return true if the email address matches the regular expression
    return regex.test(email);
}

// Bind the validation functions to the form elements
document.getElementById("email").addEventListener("input", function() {
    const email = this.value.trim();

    // Show the error message if the email address is invalid
    if (email === "") {
        document.getElementById("emailError").innerHTML = "Email is required";
    } else if (!validateEmail(email)) {
        document.getElementById("emailError").innerHTML = "Invalid email address";
    } else { 
        document.getElementById("emailError").innerHTML = "";
    }
});

// Validate phone number
function validatePhone(phone) {
    // Regular expression to match valid phone numbers
    const regex = /^\+?\d{0,3}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;

    // Return true if the phone number matches the regular expression
    return regex.test(phone);
}

document.getElementById("phone").addEventListener("input", function() {
    const phone = this.value.trim();

    // Show the error message if the phone number is invalid or not provided
    if (!phone) {
        document.getElementById("phoneError").innerHTML = "Phone number is required";
    } else if (!validatePhone(phone)) {
        document.getElementById("phoneError").innerHTML = "Invalid phone number";
    } else {
        document.getElementById("phoneError").innerHTML = "";
    }
});

document.getElementById("mySubmit").addEventListener("click",function(){
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    
    if (!phone && !email) {
        document.getElementById("phoneError").innerHTML = "Phone number is required";
        document.getElementById("emailError").innerHTML = "Email is required";
      } else {
        document.getElementById("phoneError").innerHTML = "";
        document.getElementById("emailError").innerHTML = "";
    
        if (!phone) {
          document.getElementById("phoneError").innerHTML = "Phone number is required";
        }
    
        if (!email) {
          document.getElementById("emailError").innerHTML = "Email is required";
        }
    
        if (email && !validateEmail(email)) {
          document.getElementById("emailError").innerHTML = "Invalid email address";
        }
    
        if (phone && !validatePhone(phone)) {
          document.getElementById("phoneError").innerHTML = "Invalid Phone Number";
        }

      }
});