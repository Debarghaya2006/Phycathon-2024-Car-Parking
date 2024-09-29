const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');
const childProcess = require('child_process');

const app = express();
const port = 3000;

// CORS middleware configuration
app.use(cors({
  origin: 'http://localhost:8080' // Allow the POS screen's origin
}));

// Serve static files from 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to parse JSON bodies
app.use(express.json());

let qrCodeStatus = {};

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8081 });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.log(`Error occurred: ${error}`);
  });

  // Handle disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Endpoint to update QR code status
app.post('/updateStatus', (req, res) => {
  const { code, status } = req.body;
  // Update qrCodeStatus
  qrCodeStatus[code] = status;

  // Broadcast the update to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ code, status }));
    }
  });
  if (status === 'approved') {
    childProcess.exec('python script.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
      } else {
        console.log('Command sent to Arduino successfully');
      }
    });
  }
  res.json({ message: 'Status updated successfully' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});