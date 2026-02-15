async function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "sign_in.html";
        } else {
            alert(data.error || "Signup failed.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during signup.");
    }
}
