async function fetchAndSaveProfile() {
    try {
        if (localStorage.getItem('userId') && localStorage.getItem('profileId')) {
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            showAlert('Please log in again.');
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
            localStorage.setItem('userType', user.user_type);
            localStorage.setItem('profileId', profile.id);
        } else {
            const errorData = await profileResponse.json();
            showAlert(errorData?.detail || 'Failed to retrieve user profile. Please try again.', 'warning');
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        showAlert('An unexpected error occurred. Please try again.');
    }
}
document.addEventListener("DOMContentLoaded", fetchAndSaveProfile);
