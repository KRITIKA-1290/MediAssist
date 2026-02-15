async function bookDoctor(doctorName) {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
        alert("Please sign in to book an appointment.");
        // Redirect parent window to sign in
        window.parent.location.href = "../sign_in.html";
        return;
    }

    const date = prompt("Enter Appointment Date (YYYY-MM-DD):");
    if (!date) return;

    const time = prompt("Enter Appointment Time (HH:MM):");
    if (!time) return;

    try {
        const response = await fetch('http://127.0.0.1:5000/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                doctor_name: doctorName,
                date: date,
                time: time
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Appointment booked successfully!");
        } else {
            alert(data.error || "Booking failed.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during booking.");
    }
}
