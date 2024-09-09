/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/approval.js":
/*!*************************!*\
  !*** ./src/approval.js ***!
  \*************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\r\n    const urlParams = new URLSearchParams(window.location.search);\r\n    const code = urlParams.get('code');\r\n\r\n    if (!code) {\r\n        document.body.innerHTML = 'No code provided.';\r\n        return;\r\n    }\r\n\r\n    // Establish a WebSocket connection\r\n    const ws = new WebSocket('ws://192.168.29.201:8081');\r\n\r\n    // Handle WebSocket connection establishment\r\n    ws.onopen = () => {\r\n        console.log('Connected to the WebSocket server');\r\n    };\r\n\r\n    // Handle messages from the server\r\n    ws.onmessage = (event) => {\r\n        const data = JSON.parse(event.data);\r\n        if (data.code === code) {\r\n            if (data.status === 'approved') {\r\n                document.body.innerHTML = `Approved: ${code}`;\r\n            } else if (data.status === 'denied') {\r\n                document.body.innerHTML = `Denied: ${code}`;\r\n            }\r\n        }\r\n    };\r\n\r\n    // Handle errors\r\n    ws.onerror = (error) => {\r\n        console.log(`Error occurred: ${error}`);\r\n    };\r\n\r\n    // Handle disconnections\r\n    ws.onclose = () => {\r\n        console.log('Disconnected from the WebSocket server');\r\n    };\r\n\r\n    // Display the code for approval\r\n    document.body.innerHTML = `<h1>Approve Code: ${code}</h1>\r\n                               <button id=\"approve\">Approve</button>\r\n                               <button id=\"deny\">Deny</button>`;\r\n\r\n    document.getElementById('approve').addEventListener('click', () => {\r\n        fetch('http://192.168.29.201:3000/updateStatus', {\r\n            method: 'POST',\r\n            headers: { 'Content-Type': 'application/json' },\r\n            body: JSON.stringify({ code, status: 'approved' })\r\n        });\r\n    });\r\n\r\n    document.getElementById('deny').addEventListener('click', () => {\r\n        fetch('http://192.168.29.201:3000/updateStatus', {\r\n            method: 'POST',\r\n            headers: { 'Content-Type': 'application/json' },\r\n            body: JSON.stringify({ code, status: 'denied' })\r\n        });\r\n    });\r\n});\n\n//# sourceURL=webpack:///./src/approval.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/approval.js"]();
/******/ 	
/******/ })()
;