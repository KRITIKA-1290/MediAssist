function loadPage(page) {
    var iframe = document.getElementById("content-frame");
    iframe.src = page;
}

// Use DOMContentLoaded to ensure DOM is ready before running logic
document.addEventListener('DOMContentLoaded', init);

function init() {
    checkLogin();
    const hash = window.location.hash;


    if (hash) {
        if (hash === "#home") {
            loadPage('home.html');
        } else if (hash === "#services") {
            loadPage('services.html');
        } else if (hash === "#doctors") {
            loadPage('doctors.html');
        } else if (hash === "#contact") {
            loadPage('contactus.html')
        } else if (hash === "#profile") { // Add profile handling
            loadPage('profile.html');
        }
    } else {
        loadPage('home.html');
    }
}

function checkLogin() {
    const userId = localStorage.getItem('user_id');
    const authLink = document.getElementById('auth-link');

    console.log("Checking login status. User ID:", userId);
    console.log("Auth link element:", authLink);

    // Temporary alert removed
    // alert("Debug: User ID is " + userId);

    if (userId) {
        // User is logged in
        console.log("User is logged in. Updating navbar.");
        if (authLink) {
            authLink.href = "#profile";
            authLink.innerHTML = "My Profile";
            authLink.style.backgroundColor = "blue"; // Visual debug: Blue means logged in
            authLink.style.color = "white";

            authLink.onclick = function () {
                console.log("Profile link clicked");
                loadPage('profile.html');
            };

            // Force load profile if hash is present (double check)
            if (window.location.hash === "#profile") {
                console.log("Hash is #profile, forcing loadPage");
                loadPage('profile.html');
            }
        } else {
            console.error("Auth link not found in DOM!");
        }
    } else {
        // User is not logged in
        console.log("User is NOT logged in.");
        if (authLink) {
            authLink.href = "sign_in.html";
            authLink.textContent = "Sign in";
            authLink.style.backgroundColor = "red"; // Visual debug: Red means logged out
            authLink.style.color = "white";
            authLink.onclick = null;
        } else {
            console.error("Auth link not found in DOM!");
        }
    }
}


// window.onload = init; // Removed in favor of DOMContentLoaded