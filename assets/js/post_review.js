document.getElementById("review-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const reviewText = document.getElementById("review-text").value;
    const authToken = localStorage.getItem("authToken");
  
    if (!authToken) {
      alert("Authentication token not found. Please log in to continue.");
      return;
    }
  
    if (!reviewText) {
      alert("Please write a review before submitting.");
      return;
    }
  
    if (!campaignId) {
      alert("Campaign ID is required. Please select a campaign.");
      return;
    }
  
    const reviewData = {
      campaign: parseInt(campaignId), 
      review_text: reviewText,
    };
  
    try {
      const response = await fetch(
        "https://vaccination-management-system-backend.vercel.app/api/patient/create-review/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify(reviewData),
        }
      );
  
      const responseStatus = response.status;
      const responseBody = await response.json();
  
      const feedback = document.getElementById("review-feedback");
  
      if (response.ok) {
        feedback.innerHTML = `<div class="alert alert-success">Review submitted successfully!</div>`;
        document.getElementById("review-form").reset(); // Reset the form after successful submission
      } else {
        // Handle non-field errors
        if (responseBody.non_field_errors && responseBody.non_field_errors.length > 0) {
          let errorMessages = responseBody.non_field_errors.map((error) => {
            return `<p>${error}</p>`;
          }).join('');
          feedback.innerHTML = `<div class="alert alert-danger">${errorMessages}</div>`;
        } else {
          feedback.innerHTML = `<div class="alert alert-danger">Error ${responseStatus}: ${responseBody.detail || "Failed to submit review."}</div>`;
        }
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      document.getElementById("review-feedback").innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
  });
  