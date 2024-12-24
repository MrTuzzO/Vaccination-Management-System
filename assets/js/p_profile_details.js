// with api call---------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken'); // Fetch token from localStorage
    // for adding loader
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none'); // Show loader


    if (!token) {
        showAlert('You must be logged in to view your profile.');
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
            showAlert(`Failed to load profile: ${errorData.detail || 'Unknown error occurred.'}`);
            window.location.href = 'login.html'; // Redirect to login if unauthorized
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        showAlert('An error occurred while fetching the profile data.');
    } finally {
        loader.classList.add('d-none'); // Hide loader
    }
});





// // used local storage data---------------------------------------------------------

// document.addEventListener('DOMContentLoaded', async () => {
//     const token = localStorage.getItem('authToken'); // Fetch token from localStorage
//     const loader = document.getElementById('loader');
//     loader.classList.remove('d-none'); // Show loader

//     // Check if token exists
//     if (!token) {
//         showAlert('You must be logged in to view your profile.');
//         window.location.href = 'login.html'; // Redirect to login page
//         return;
//     }

//     // Check if profile data is already saved in localStorage
//     const userId = localStorage.getItem('userId');
//     const username = localStorage.getItem('username');
//     const email = localStorage.getItem('email');
//     const age = localStorage.getItem('age');
//     const nid = localStorage.getItem('nid');
//     const medicalInfo = localStorage.getItem('medicalInfo');

//     if (userId && username && email && age && nid && medicalInfo) {
//         // If data exists, populate profile from localStorage
//         document.getElementById('full-name').textContent = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
//         document.getElementById('username').textContent = localStorage.getItem('username');
//         document.getElementById('email').textContent = localStorage.getItem('email') || 'N/A';
//         document.getElementById('age').textContent = localStorage.getItem('age') || 'N/A';
//         document.getElementById('nid').textContent = localStorage.getItem('nid') || 'N/A';
//         document.getElementById('medical-info').textContent = localStorage.getItem('medicalInfo') || 'N/A';
        
//         loader.classList.add('d-none'); // Hide loader
//         return; // Exit if data is already available
//     }

//     // If data is not in localStorage, fetch it from the API
//     try {
//         const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Token ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const user = data.user.user;
//             const userInfo = data.user;

//             // Populate profile section with fetched data
//             document.getElementById('full-name').textContent = `${user.first_name} ${user.last_name}`;
//             document.getElementById('username').textContent = user.username;
//             document.getElementById('email').textContent = user.email || 'N/A';
//             document.getElementById('age').textContent = userInfo.age || 'N/A';
//             document.getElementById('nid').textContent = userInfo.nid || 'N/A';
//             document.getElementById('medical-info').textContent = userInfo.medical_info || 'N/A';

//             // Save data to localStorage for future use
//             localStorage.setItem('userId', user.id);
//             localStorage.setItem('username', user.username);
//             localStorage.setItem('email', user.email);
//             localStorage.setItem('firstName', user.first_name);
//             localStorage.setItem('lastName', user.last_name);
//             localStorage.setItem('age', userInfo.age);
//             localStorage.setItem('nid', userInfo.nid);
//             localStorage.setItem('medicalInfo', userInfo.medical_info);

//         } else {
//             const errorData = await response.json();
//             showAlert(`Failed to load profile: ${errorData.detail || 'Unknown error occurred.'}`);
//             window.location.href = 'login.html'; // Redirect to login if unauthorized
//         }
//     } catch (error) {
//         console.error('Error fetching profile:', error);
//         showAlert('An error occurred while fetching the profile data.');
//     } finally {
//         loader.classList.add('d-none'); // Hide loader
//     }
// });
