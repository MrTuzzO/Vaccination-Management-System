async function fetchAndSaveProfile() {
    try {
        if (localStorage.getItem('userId') && localStorage.getItem('username')) {
            console.log('Profile data already exists in localStorage.');
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            showAlert('Authentication token not found. Please log in again.');
            return;
        }

        const profileResponse = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            const user = profileData.user.user;
            const profile = profileData.user;

            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            localStorage.setItem('firstName', user.first_name);
            localStorage.setItem('lastName', user.last_name);
            localStorage.setItem('userType', user.user_type);
            localStorage.setItem('profileId', profile.id);
            localStorage.setItem('nid', profile.nid);
            localStorage.setItem('age', profile.age);
            localStorage.setItem('medicalInfo', profile.medical_info);

            console.log('Profile data saved to localStorage.');
        } else {
            const errorData = await profileResponse.json();
            showAlert(errorData?.detail || 'Failed to retrieve user profile. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        showAlert('An unexpected error occurred. Please try again.');
    }
}
document.addEventListener("DOMContentLoaded", fetchAndSaveProfile);
