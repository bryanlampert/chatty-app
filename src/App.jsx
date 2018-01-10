import React, {Component} from 'react';
import Nav from './nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous'
      },
      messages: [],
      users: 0
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // Open server connection
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = (evt) => {
      console.log("Connected to the server");
    };

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(data, 'data from onmessage');

      switch(data.type) {
        case "incomingMessage":

          const displayMessage = {
            id: data.id,
            username: data.username,
            content: data.content
          };

          const newMsgs = this.state.messages.concat(displayMessage);
          this.setState({
            messages: newMsgs
          });

          break;

        case "incomingNotification":

          const displayNotification = {
            id: data.id,
            notification: data.content
          };

          const notifConcat = this.state.messages.concat(displayNotification);
          this.setState({
            messages: notifConcat
          });

          break;
      }
      if (data.users) {
        this.setState({
          users: data.users
        });
      }

    };

  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <Nav users={this.state.users} />
        <MessageList messages={this.state.messages} />
        <ChatBar changeUser={this.changeUser} createMessage={this.createMessage} />
      </div>
    );
  }

  createMessage = (content) => {

    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content
    }

    // Send to the server
    let stringifyMsg = JSON.stringify(newMessage)
    this.socket.send(stringifyMsg)

  }

  changeUser = (name) => {

    if (name !== '') {

      const newName = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed name to ${ name }`,
      }

      let stringifyName = JSON.stringify(newName)
      this.socket.send(stringifyName)

      this.setState({
        currentUser: { name }
      })

    } else {

      const anonName = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed name to Anonymous`,
      }

      let stringifyAnon = JSON.stringify(anonName)
      this.socket.send(stringifyAnon)
    }
  }

}

export default App;
