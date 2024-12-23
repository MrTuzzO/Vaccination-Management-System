if (localStorage.getItem('authToken')) {
    alert("You are already registred")
    window.location.href = 'patient_profile.html';
}

document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // for adding loader
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); // Show loader

    const username = document.getElementById('username').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const nid = document.getElementById('nid').value;
    const age = document.getElementById('age').value;
    const medicalInfo = document.getElementById('medical_info').value;
    const password1 = document.getElementById('password').value;
    const password2 = document.getElementById('confirm_password').value;

    if (password1 !== password2) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/registration/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password1,
                password2,
                first_name: firstName,
                last_name: lastName,
                nid,
                age,
                medical_info: medicalInfo
            })
        });

        const data = await response.json();

        if (response.ok) {
            // alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            let errorMessages = '';
            for (const [key, value] of Object.entries(data)) {
                errorMessages += `${key}: ${value}\n`;
            }
            alert(`Registration failed:\n${errorMessages}`);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
    } finally {
        loader.classList.add("d-done")
    }
});
