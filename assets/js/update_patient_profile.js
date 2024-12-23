document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('update-profile-form');
    const authToken = localStorage.getItem('authToken');

    // for adding loader
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); // Show loader


    if (!authToken) {
        alert('You are not logged in. Please log in to update your profile.');
        window.location.href = 'login.html';
        return;
    }

    // Function to pre-fill form with existing profile data
    async function fetchProfileData() {
        try {
            const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.user.user;
                const userInfo = data.user;

                document.getElementById('first_name').value = user.first_name || '';
                document.getElementById('last_name').value = user.last_name || '';
                document.getElementById('email').value = user.email || '';
                document.getElementById('age').value = userInfo.age || '';
                document.getElementById('medical_info').value = userInfo.medical_info || '';
            } else {
                alert('Failed to fetch profile data. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            alert('An error occurred while fetching profile data. Please try again later.');
        } finally {
            loader.classList.add('d-none'); // Hide loader
        }
    }
    fetchProfileData();

    // Handle form submission to update profile
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // for adding loader
        const loader = document.getElementById('loader');
        loader.classList.remove('d-none'); // Show loader


        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const medicalInfo = document.getElementById('medical_info').value;

        try {
            const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/update/', {
                method: 'PUT', // Use PATCH if partial updates are allowed
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    age: age ? parseInt(age, 10) : null,
                    medical_info: medicalInfo,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Profile updated successfully!');
                window.location.href = 'patient_profile.html'; // Redirect after successful update
            } else {
                console.error('Error updating profile:', data);
                alert(`Update failed: ${data.detail || 'Please check your inputs.'}`);
            }
        } catch (error) {
            console.error('Unexpected error during profile update:', error);
            alert('An unexpected error occurred. Please try again later.');
        } finally {
            loader.classList.add('d-none'); // Hide loader
        }
    });
});
