document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
        document.body.innerHTML = 'No code provided.';
        return;
    }

    // Establish a WebSocket connection
    const ws = new WebSocket('ws://raspberrypi.local:8081');

    // Handle WebSocket connection establishment
    ws.onopen = () => {
        console.log('Connected to the WebSocket server');
    };

    // Handle messages from the server
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.code === code) {
            if (data.status === 'approved') {
                document.body.innerHTML = `Approved: ${code}`;
            } else if (data.status === 'denied') {
                document.body.innerHTML = `Denied: ${code}`;
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

    // Display the code for approval
    document.body.innerHTML = `<h1>Your Payment Code: ${code}</h1>
                               <button id="approve">Payment Approved</button>
                               <button id="deny">Payment Denied</button>`;

    document.getElementById('approve').addEventListener('click', () => {
        fetch('http://raspberrypi.local:3000/updateStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, status: 'approved' })
        });
    });

    document.getElementById('deny').addEventListener('click', () => {
        fetch('http://raspberrypi.local:3000/updateStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, status: 'denied' })
        });
    });
});