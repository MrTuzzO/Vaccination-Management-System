document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken'); // Fetch token from localStorage

    if (!token) {
        alert('You must be logged in to view your profile.');
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    try {
        const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const user = data.user.user;
            const userInfo = data.user

            // Populate the profile section
            document.getElementById('full-name').textContent = `${user.first_name} ${user.last_name}`;
            document.getElementById('username').textContent = user.username;
            document.getElementById('email').textContent = user.email || 'N/A';
            document.getElementById('age').textContent = userInfo.age || 'N/A'; // Replace with dynamic age if available
            document.getElementById('nid').textContent = userInfo.nid || 'N/A'; // Replace with dynamic age if available
            document.getElementById('medical-info').textContent = userInfo.medical_info || 'N/A';

        } else {
            const errorData = await response.json();
            alert(`Failed to load profile: ${errorData.detail || 'Unknown error occurred.'}`);
            window.location.href = 'login.html'; // Redirect to login if unauthorized
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching the profile data.');
    }
});
