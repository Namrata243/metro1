document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    const fullName = document.getElementById('fullName');
    const userName = document.getElementById('userName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const userRole = document.getElementById('userRole');
    const state = document.getElementById('state');
    const city = document.getElementById('city');
    const showroom = document.getElementById('showroom');
    const active = document.getElementById('active');
    const deactive = document.getElementById('deactive');

    if (fullName.value.trim() === '') {
        fullName.classList.add('error');
        isValid = false;
    }

    if (userName.value.trim() === '') {
        userName.classList.add('error');
        isValid = false;
    }

    if (phone.value.trim() === '') {
        phone.classList.add('error');
        isValid = false;
    }

    if (email.value.trim() === '') {
        email.classList.add('error');
        isValid = false;
    }

    if (userRole.value === '') {
        userRole.classList.add('error');
        isValid = false;
    }

    if (state.value === '') {
        state.classList.add('error');
        isValid = false;
    }

    if (city.value === '') {
        city.classList.add('error');
        isValid = false;
    }

    if (showroom.value === '') {
        showroom.classList.add('error');
        isValid = false;
    }

    if (!active.checked && !deactive.checked) {
        alert('Please select a user status.');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        resetForm();
    }
});

function resetForm() {
    document.getElementById('userForm').reset();
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => input.classList.remove('error'));
}