document.addEventListener('DOMContentLoaded', function() {
    const registerButtons = document.querySelectorAll('.register-btn');
    const modal = document.getElementById('registrationModal');
    const closeModal = document.querySelector('.close');

    registerButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const row = button.closest('tr');
            const session = row.cells[1].innerText;
            const speaker = row.cells[2].innerText;

            document.getElementById('session').value = session;
            document.getElementById('speaker').value = speaker;

            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    const registerForm = document.getElementById('registerSessionForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const session = document.getElementById('session').value;
        const speaker = document.getElementById('speaker').value;
        const email = document.getElementById('email').value;

        const formData = new FormData(registerForm);

        fetch('qrgenerator.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('Error')) {
                alert('There was an error registering for the session.');
            } else {
                const queryString = new URLSearchParams({
                    username: username,
                    session: session,
                    speaker: speaker,
                    email: email
                }).toString();

                window.location.href = `qrgen.html?${queryString}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error registering for the session.');
        });
    });
});
