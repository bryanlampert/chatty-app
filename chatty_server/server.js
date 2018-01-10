// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Create a unique uuid
const uuidv4 = require('uuid/v4');

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ users: wss.clients.size }));
    }
  });

  ws.on('message', (message) => {
    let data = JSON.parse(message);

    if (data.type === 'postMessage') {
      console.log('User', data.username, 'said', data.content);

      newMsg = {
        type: 'incomingMessage',
        id: uuidv4(),
        username: data.username,
        content: data.content
      };

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newMsg));
        }
      });

    } else if (data.type === 'postNotification') {
      console.log(data.content);
      newUser = {
        type: 'incomingNotification',
        content: data.content,
        id: uuidv4()
      };

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newUser));
        }
      });

    }

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ users: wss.clients.size }));
      }
    });
  });

});
