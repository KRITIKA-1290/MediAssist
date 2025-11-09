const doctors = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        bio: "Dr. John is a renowned cardiologist with over 15 years of experience treating heart-related issues.",
        image: "doctor1.jpg"
    },
    {
        id: 2,
        name: "Dr. Jane Smith",
        specialty: "Dermatologist",
        bio: "Dr. Jane specializes in skin care and dermatological treatments. She has a vast experience in aesthetic procedures.",
        image: "doctor2.jpg"
    },
    {
        id: 3,
        name: "Dr. Emily Davis",
        specialty: "Pediatrician",
        bio: "Dr. Emily is a caring pediatrician dedicated to providing the best care for children. She is highly recommended for family health.",
        image: "doctor3.jpg"
    }
];

// Function to show doctor details when a doctor is clicked
function showDoctorDetails(doctorId) {
    const doctor = doctors.find(doc => doc.id === doctorId);

    // Show doctor details in the UI
    document.getElementById('doctor-details').classList.remove('hidden');
    document.getElementById('doctor-name').innerText = doctor.name;
    document.getElementById('doctor-specialty').innerText = doctor.specialty;
    document.getElementById('doctor-bio').innerText = doctor.bio;
}

function bookAppointment() {
    const doctorName = document.getElementById('doctor-name').innerText;
    const appointmentTime = document.getElementById('appointment-time').value;
    const userLocation = document.getElementById('user-location').value;

    if (!userLocation) {
        alert("Please enter your location.");
        return;
    }

    alert(`Your appointment with ${doctorName} has been scheduled for ${appointmentTime}.\nLocation: ${userLocation}`);

    window.parent.loadPage('home.html');
}
