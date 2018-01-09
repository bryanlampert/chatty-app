import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // Open server connection
    const socketserver = "ws://localhost:3001";
    this.socket = new WebSocket(socketserver);

    this.socket.onopen = (evt) => {
      console.log("Connected to the server");
    };

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 2000);

  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar changeUser={this.changeUser} createMessage={this.createMessage} />
      </div>
    );
  }

  createMessage = (content) => {

    const newMessage = {
      username: this.state.currentUser.name,
      content
    }

    // Send to the server
    let stringifyMsg = JSON.stringify(newMessage)
    this.socket.send(stringifyMsg)


    this.socket.onmessage = (e) => {
      let msgData = JSON.parse(e.data)

      const displayMessage = {
        id: msgData.id,
        username: msgData.username,
        content: msgData.content
      }

      const newMsgs = this.state.messages.concat(displayMessage)

      this.setState({
        messages: newMsgs
      })

    }

  }

  changeUser = (name) => {
    if (name !== '') {
      this.setState({
        currentUser: { name }
      })
    } else {
      this.setState({
        currentUser: { name: 'Anonymous' }
      })
    }
  }

}

export default App;
