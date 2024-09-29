# Phycathon 2024 Car Parking

## QR Code Status Update Server
This is a Node.js application that utilizes Express.js to create a RESTful API and WebSockets to establish real-time communication between the server and clients. The application serves static files from the dist directory and provides an endpoint to update the status of QR codes.

### Features
- CORS Middleware: Configured to allow requests from a specific origin (http://raspberrypi.local:8080)
- Static File Serving: Serves files from the dist directory
- JSON Body Parsing: Parses JSON bodies in incoming requests
- WebSocket Connection: Establishes a WebSocket connection on port 8081
- QR Code Status Update: Provides an endpoint (/updateStatus) to update the status of QR codes and broadcast the update to connected clients

### Endpoints
#### POST /updateStatus
- Request Body: code (string) and status (string)
- Response: JSON object with a success message
- Description: Updates the status of a QR code and broadcasts the update to all connected clients
#### WebSocket Events
- Connection: Handles new client connections
- Message: Handles incoming messages from clients
- Error: Handles errors that occur during the connection
- Close: Handles client disconnections

### Usage
- Install dependencies: npm install
- Start the server: node server.js
- Open a WebSocket client (e.g., wscat) and connect to ws://raspberrypi.local:8081
- Send a request to http://raspberrypi.local:3000/updateStatus with a JSON body containing the QR code and status to update the status and broadcast it to connected clients.

### Example Use Case
A Point of Sale (POS) system can use this application to update the status of QR codes in real-time, allowing multiple clients to receive updates simultaneously.

### Troubleshooting
- Check whether correct IP Address is given in address bar and in the files.
- Ensure that the dist directory contains the static files to be served.
- Verify that the CORS middleware is configured correctly to allow requests from the desired origin.
- Check the WebSocket connection and client implementation for any errors or disconnections.