
document.querySelectorAll('.symptom-tile').forEach(tile => {
    tile.addEventListener('click', function () {
        const checkbox = tile.querySelector('.symptom-checkbox');
        const checkIcon = tile.querySelector('.check-icon');
        const isChecked = checkbox.checked;

        // Toggle checkbox state
        checkbox.checked = !isChecked;

        // Toggle check icon visibility
        if (checkbox.checked) {
            checkIcon.classList.remove('hidden');
        } else {
            checkIcon.classList.add('hidden');
        }
    });
});

// Handle the "Next" button click
document.getElementById('nextButton').addEventListener('click', function () {
    const selectedSymptoms = Array.from(document.querySelectorAll('.symptom-checkbox:checked')).map(checkbox => checkbox.dataset.symptom);
    const details = document.getElementById('details').value;

    if (selectedSymptoms.length === 0) {
        alert("Please select at least one symptom.");
    } else {
        window.parent.loadPage('schedule_appointment/remedy_and_suggestions.html');
    }
});
