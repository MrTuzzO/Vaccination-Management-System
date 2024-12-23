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
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert('You are not logged in.');
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
            alert('Logout successful!');
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            console.error('Logout failed:', errorData);
            alert('Logout failed. Please try again.');
        }
    } catch (error) {
        console.error('An unexpected error occurred during logout:', error);
        alert('An unexpected error occurred. Please try again.');
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
});
