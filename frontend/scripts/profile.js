document.addEventListener('DOMContentLoaded', async () => {
    console.log("profile.js loaded and DOM content loaded");
    const userId = localStorage.getItem('user_id');

    if (!userId) {
        alert("You are not logged in.");
        window.location.href = "sign_in.html";
        return;
    }

    // Fetch User Details
    try {
        const userRes = await fetch(`http://127.0.0.1:5000/user/${userId}`);
        const userData = await userRes.json();

        if (userRes.ok) {
            document.getElementById('user-details').innerHTML = `
                <p><strong>Username:</strong> ${userData.username}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
            `;
        } else {
            document.getElementById('user-details').innerHTML = `<p class="text-red-500">Failed to load user details.</p>`;
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }

    // Fetch Appointments
    try {
        const apptRes = await fetch(`http://127.0.0.1:5000/appointments/${userId}`);
        const apptData = await apptRes.json();

        const apptList = document.getElementById('appointments-list');
        apptList.innerHTML = '';

        if (apptRes.ok && apptData.length > 0) {
            apptData.forEach(appt => {
                const row = `
                    <tr>
                        <td class="py-2 px-4 border-b">${appt.doctor_name}</td>
                        <td class="py-2 px-4 border-b">${appt.date}</td>
                        <td class="py-2 px-4 border-b">${appt.time}</td>
                        <td class="py-2 px-4 border-b">
                            <span class="px-2 py-1 rounded-full text-xs ${getStatusColor(appt.status)}">
                                ${appt.status}
                            </span>
                        </td>
                    </tr>
                `;
                apptList.innerHTML += row;
            });
        } else {
            apptList.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-gray-500">No appointments found.</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
        document.getElementById('appointments-list').innerHTML = `<tr><td colspan="4" class="py-4 text-center text-red-500">Error loading appointments.</td></tr>`;
    }
});

function getStatusColor(status) {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Confirmed') return 'bg-green-100 text-green-800';
    if (status === 'Cancelled') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
}

function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    window.location.href = "../html/index.html";
}
