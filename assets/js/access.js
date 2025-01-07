if (localStorage.getItem("userType") != "patient") {
    alert("You are not authorized to view this page");
    localStorage.clear(); 
    window.location.href = "login.html";
}