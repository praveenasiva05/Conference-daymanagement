document.addEventListener('DOMContentLoaded', function() {
    const attendanceLink = document.getElementById('attendanceLink');
    const attendanceSection = document.getElementById('attendance');
    const welcomeSection = document.getElementById('welcome');

    attendanceLink.addEventListener('click', function(event) {
        event.preventDefault();
        attendanceSection.style.display = 'block';
        welcomeSection.style.display = 'none'; // Hide the welcome section

        // Initialize the QR code scanner when the attendance section is displayed
        let htmlscanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbox: 250 });
        htmlscanner.render(onScanSuccess, onScanError);
    });

    function onScanSuccess(decodeText, decodeResult) {
        alert("Your QR is: " + decodeText);
        document.getElementById('data').value = decodeText;
        let dataset = decodeText.split(" ");
        let name = dataset[0];
        let session = dataset[1];
        let email = dataset[2]; // Assuming email is the third element in the QR code data
      
        document.cookie = "data1=" + name;
        document.cookie = "data2=" + session;
        document.cookie = "data3=" + email;

        // Add attendance record to the table
        const tableBody = document.querySelector('#attendance-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${name}</td><td>${session}</td><td>${email}</td>`;
        tableBody.appendChild(newRow);
    }

    function onScanError(errorMessage) {
        console.error("QR Code Scan Error: ", errorMessage);
    }
});
