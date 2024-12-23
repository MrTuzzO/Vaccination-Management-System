// document.getElementById("booking-form").addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const bookingDate = document.getElementById("booking_date").value;
//   const patinetId = localStorage.getItem("patientId");
//   const authToken = localStorage.getItem("authToken");

//   if (!authToken) {
//     alert("Authentication token not found. Please log in to continue.");
//     return;
//   }

//   const bookingData = {
//     patient: parseInt(patinetId),
//     campaign: campaignId,
//     dose_number: 1,
//     dose_date: bookingDate,
//   };

//   // Log the JSON payload being sent
//   // console.log("JSON Payload Sent to API:", JSON.stringify(bookingData));

//   try {
//     const response = await fetch(
//       "https://vaccination-management-system-backend.vercel.app/api/patient/create-booking/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${authToken}`,
//         },
//         body: JSON.stringify(bookingData),
//       }
//     );

//     const responseStatus = response.status;
//     const responseBody = await response.json();

//     // Log the status and response from the API
//     console.log("Response Status:", responseStatus);
//     console.log("Response Body:", responseBody);

//     const feedback = document.getElementById("booking-feedback");
//     if (response.ok) {
//       feedback.innerHTML = `<div class="alert alert-success">Booking successful!</div>`;
//     } else {
//       feedback.innerHTML = `<div class="alert alert-danger">Error ${responseStatus}: ${responseBody.detail || "Failed to create booking."}</div>`;
//     }
//   } catch (error) {
//     console.error("Request Error:", error.message);
//     document.getElementById("booking-feedback").innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
//   }
// });


document.getElementById("booking-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // for adding loader
  const loader = document.getElementById('loader');
  loader.classList.remove('d-none'); // Show loader


  const bookingDate = document.getElementById("booking_date").value;
  const patientId = localStorage.getItem("patientId");
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    showAlert("Please log in to continue.");
    window.location.href = 'login.html';
    return;
  }

  const bookingData = {
    patient: parseInt(patientId),
    campaign: campaignId, // Make sure to define campaignId
    dose_number: 1,
    dose_date: bookingDate,
  };

  try {
    const response = await fetch(
      "https://vaccination-management-system-backend.vercel.app/api/patient/create-booking/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(bookingData),
      }
    );

    const responseStatus = response.status;
    const responseBody = await response.json();

    const feedback = document.getElementById("booking-feedback");
    if (response.ok) {
      feedback.innerHTML = `<div class="alert alert-success">Booking successful!</div>`;
    } else {
      if (responseBody.non_field_errors && responseBody.non_field_errors.length > 0) {
        let errorMessages = responseBody.non_field_errors.map((error) => {
          return `<p>${error}</p>`;
        }).join('');
        feedback.innerHTML = `<div class="alert alert-warning">${errorMessages}</div>`;
      } else {
        feedback.innerHTML = `<div class="alert alert-danger">Error ${responseStatus}: ${responseBody.detail || "Failed to create booking."}</div>`;
      }
    }
  } catch (error) {
    console.error("Request Error:", error.message);
    document.getElementById("booking-feedback").innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
  } finally {
    loader.classList.add('d-none'); // Hide loader
  }
});
