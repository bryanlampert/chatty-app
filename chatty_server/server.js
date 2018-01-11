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

wss.on('connection', (ws) => {

  // Sets a random hex colour code for each user
  let red   = (Math.floor(Math.random() * 255)).toString(16);
  let green = (Math.floor(Math.random() * 255)).toString(16);
  let blue  = (Math.floor(Math.random() * 255)).toString(16);
  let setColour = {
    type: 'incomingColour',
    userColour: red.concat(green, blue)
  };
  ws.send(JSON.stringify(setColour));

  // Sends the user count
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        userCount: wss.clients.size
      }));
    }
  });

  ws.on('message', (message) => {
    let data = JSON.parse(message);

    if (data.type === 'postMessage') {
      // Receives a new message and broadcasts to each client
      newMsg = {
        type: 'incomingMessage',
        id: uuidv4(),
        username: data.username,
        content: data.content,
        image: data.image,
        userColour: data.userColour
      };

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newMsg));
        }
      });

    } else if (data.type === 'postNotification') {
      // Receives a user name change and sends notification to each client
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

  // Client closes the connection
  // Updates the user counter
  ws.on('close', () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ userCount: wss.clients.size }));
      }
    });
  });

  // Error Check
  ws.on('error', e => {
    console.log('oh no! error: ', e);
  });

});
