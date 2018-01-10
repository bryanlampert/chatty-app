import React, {Component} from 'react';
import Nav from './nav.jsx';
import Welcome from './Welcome.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous',
        userColour: 'White'
      },
      messages: [{ userColour: null }],
      userCount: 0,
      welcome: true
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // Open server connection
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = (evt) => {
      console.log("Connected to the server");
    };

    setTimeout(() =>
      this.setState({
        welcome: false
      }), 2000
    );

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(data, 'data from onmessage');

      switch(data.type) {
        case "incomingMessage":

          const displayMessage = {
            id: data.id,
            username: data.username,
            content: data.content,
            userColour: data.userColour
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

       case "incomingColour":

         const newColour = Object.assign(this.state.currentUser, {
           userColour: data.userColour
         });

         this.setState({
           currentUser: newColour
         });

         break;

      }
      if (data.userCount) {
        this.setState({
          userCount: data.userCount
        });
      }

    };

  }

  render() {
    console.log('Rendering <App />');

    return (
      this.state.welcome ?
        (<div>
          <Nav userCount={this.state.userCount} />
          <Welcome />
          <MessageList messages={this.state.messages} />
          <ChatBar changeUser={this.changeUser} createMessage={this.createMessage} />
        </div>) :
        (<div>
          <Nav userCount={this.state.userCount} />
          <MessageList messages={this.state.messages} />
          <ChatBar changeUser={this.changeUser} createMessage={this.createMessage} />
        </div>)
    );
  }

  createMessage = (content) => {
    if (content !== '') {
      const newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        userColour: this.state.currentUser.userColour,
        content
      }

      // Send to the server
      let stringifyMsg = JSON.stringify(newMessage)
      this.socket.send(stringifyMsg)

    }
  }

  changeUser = (name) => {

    if (name !== this.state.currentUser.name) {
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

      } else if (this.state.currentUser.name !== 'Anonymous') {

        const anonName = {
          type: 'postNotification',
          content: `${this.state.currentUser.name} has changed name to Anonymous`,
        }

        let stringifyAnon = JSON.stringify(anonName)
        this.socket.send(stringifyAnon)

        this.setState({
          currentUser: { name: 'Anonymous' }
        })

      }
    }
  }

}

export default App;
