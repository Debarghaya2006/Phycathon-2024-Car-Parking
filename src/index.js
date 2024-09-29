import QRious from 'qrious';
import "./index.css"

// Ensure the script runs after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('qrCode');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const qrCodeSize = 200;
    canvas.width = qrCodeSize;
    canvas.height = qrCodeSize;

    const qr = new QRious({
        element: canvas,
        size: qrCodeSize
    });

    let currentCode = '';

    function generateRandomString(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }
        return result;
    }

    function generateQRCode() {
        currentCode = generateRandomString(10);
        const approvalPageURL = `http://localhost:3000/approval.html?code=${currentCode}`;
        qr.value = approvalPageURL;
    }

    // Establish a WebSocket connection
    const ws = new WebSocket('ws://localhost:8081');

    // Handle WebSocket connection establishment
    ws.onopen = () => {
        console.log('Connected to the WebSocket server');
    };

    // Handle messages from the server
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.code === currentCode) {
            if (data.status === 'approved') {
                document.getElementById('status').innerText = 'Approved';
                setTimeout(() => {
                    generateQRCode(); // Generate a new QR code after approval
                    document.getElementById('status').innerText = 'Waiting for approval...';
                }, 5000); // Wait for 5 seconds before generating a new QR code
            } else if (data.status === 'denied') {
                document.getElementById('status').innerText = 'Denied';
                setTimeout(() => {
                    generateQRCode(); // Generate a new QR code after approval
                    document.getElementById('status').innerText = 'Waiting for approval...';
                }, 5000); // Wait for 5 seconds before generating a new QR code
            }
        }
    };

    // Handle errors
    ws.onerror = (error) => {
        console.log(`Error occurred: ${error}`);
    };

    // Handle disconnections
    ws.onclose = () => {
        console.log('Disconnected from the WebSocket server');
    };

    // Initialize QR code generation
    generateQRCode();
});