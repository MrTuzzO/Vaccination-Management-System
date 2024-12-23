function includeHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            setupAuthButtons();
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Separate logout function
async function logout() {
    // for adding loader
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); // Show loader

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        showAlert('You are not logged in.', 'warning');
        return;
    }

    try {
        const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
        });

        if (response.ok) {
            // Remove the token and redirect to the login page
            localStorage.removeItem('authToken');
            localStorage.clear();
            // alert('Logout successful!');
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            console.error('Logout failed:', errorData);
            loader.classList.add("d-done");
            showAlert('Logout failed. Please try again.', 'warning');
        }
    } catch (error) {
        console.error('An unexpected error occurred during logout:', error);
        loader.classList.add("d-done");
        showAlert('An unexpected error occurred. Please try again.');
    } finally {
        loader.classList.add("d-done");
    }
}

function setupAuthButtons() {
    const authToken = localStorage.getItem('authToken');
    const authButtons = document.getElementById('auth-buttons');

    if (authToken) {
        authButtons.innerHTML = `
            <a class="btn btn-outline-light" href="patient_profile.html">Profile</a>
            <button class="btn btn-outline-light" id="logout-btn">Logout</button>
        `;

        document.getElementById('logout-btn').addEventListener('click', logout);
    } else {
        authButtons.innerHTML = `<a href="login.html" class="btn btn-outline-light">Login</a>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    includeHTML("header", "components/header.html");
    includeHTML("footer", "components/footer.html");
    includeHTML("loader", "components/loader.html");
});


// for alert
function showAlert(message, type = 'danger', duration = 10000) {
    // Create the alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

    // Append the alert to the alert container
    const alertContainer = document.getElementById('alert-container');
    alertContainer.appendChild(alertDiv);

    // Automatically remove the alert after the specified duration
    setTimeout(() => {
        alertDiv.classList.remove('show'); // Start fade-out animation
        alertDiv.addEventListener('transitionend', () => alertDiv.remove()); // Remove the alert after fade-out
    }, duration);
}