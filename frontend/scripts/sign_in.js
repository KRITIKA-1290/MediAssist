async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login success response:", data);

            if (!data.user_id) {
                console.error("user_id missing in response!");
                alert("Login successful but user ID missing.");
                return;
            }

            // Store user info in localStorage
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('username', data.username);

            console.log("Stored user_id in localStorage:", localStorage.getItem('user_id'));

            // Redirect to profile page specifically
            window.location.href = "index.html#profile";
        } else {
            alert(data.error || "Login failed.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during login.");
    }
}