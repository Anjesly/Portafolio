document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const senEmailButton = document.getElementById('sendMessage');

    // Eventos
    senEmailButton.addEventListener('click', () => {
        sendEmail();
    });

    // Funciones
    const sendEmail = () => {

        senEmailButton.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        fetch('php/contacto/sendEmail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.estado === 'success') {
                showNotification(data.mensaje, 'success');
                name.value = '';
                email.value = '';
                subject.value = '';
                message.value = '';
            } else {
                showNotification(data.mensaje, 'error');
            }
        })
        .catch(error => console.error(error));

        senEmailButton.disabled = false;
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon;
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        notification.innerHTML = `${icon}<span>${message}</span>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

});

