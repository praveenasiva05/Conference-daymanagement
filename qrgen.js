document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const session = params.get('session');
    const speaker = params.get('speaker');
    const email = params.get('email');

    if (!username || !session || !speaker || !email) {
        alert("Required parameters are missing in the URL!");
    } else {
        qrgen(username, session, speaker, email);
    }

    // Corrected the URL string with proper interpolation
    function qrgen(username, session, speaker, email) {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(username + ' ' + session + ' ' + speaker + ' ' + email)}`;
        
        // Set the src attribute of the QR image element to the API URL with encoded data
        const qrImage = document.getElementById('qrimage');
        qrImage.src = qrApiUrl;

        // Ensure the QR image is fully loaded before capturing it
        qrImage.onload = function() {
            console.log("QR image loaded successfully.");
        };
    }

    // Download QR Code as an Image
    document.getElementById('download-btn').addEventListener('click', function () {
        const qrContainer = document.getElementById('qr-code');
    
        // Ensure the QR code is fully loaded
        html2canvas(qrContainer, { useCORS: true }).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'qr-code.png';
            link.click();
        }).catch(function (error) {
            console.error('Error capturing QR code:', error);
        });
    });
});
