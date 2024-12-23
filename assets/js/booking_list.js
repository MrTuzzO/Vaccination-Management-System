document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("bookings-container");
    const authToken = localStorage.getItem("authToken");
    const apiURL = "https://vaccination-management-system-backend.vercel.app/api/patient/list-bookings/";

    if (!authToken) {
        console.error("No auth token found in local storage");
        return;
    }

    container.innerHTML = "<p class='text-primary p-3'>Loading Appoinments, please wait...</p>";
    fetch(apiURL, {
        method: "GET",
        headers: {
            "Authorization": `Token ${authToken}`,
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";
            data.forEach(booking => {
                const card = document.createElement("div");
                card.className = "col";
                card.innerHTML = `
                    <div class="card border-0 shadow">
                        <div class="card-body">
                            <h6 class="card-title text-primary  mb-2">Campaign: ${booking.campaign}</h6>
                            <p class="card-text mb-1"><strong>Dose Number:</strong> ${booking.dose_number}</p>
                            <p class="card-text mb-1"><strong>Date:</strong> ${booking.dose_date}</p>
                            <p class="card-text"><strong>Booked At:</strong> ${new Date(booking.booked_at).toLocaleString()}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error fetching bookings:", error);
        });
});
