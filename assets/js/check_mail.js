function identifyInput(input) {
    // Regular expression to validate an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if input matches the email regex
    if (emailRegex.test(input)) {
        return "email";
    } else {
        return "username";
    }
}

// Test cases
console.log(identifyInput("user@example.com")); // Output: "email"
console.log(identifyInput("user@name"));        // Output: "username"
console.log(identifyInput("username"));         // Output: "username"
console.log(identifyInput("@username"));        // Output: "username"
