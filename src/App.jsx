import React, {Component} from 'react';
import Nav from './nav.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { toArray } from 'react-emoji-render';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Anonymous',
        userColour: 'ffffff'
      },
      messages: [{ userColour: null }],
      userCount: 0,
      welcome: true
    };
  }

  componentDidMount() {
    // Open server connection
    this.socket = new WebSocket("ws://localhost:3001");

    // Connecting timer
    setTimeout(() =>
      this.setState({
        welcome: false
      }), 4000
    );

    // Receiving from the server
    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);

      // Sets state based on type of message incoming
      switch(data.type) {
        case "incomingMessage":
          const displayMessage = {
            id: data.id,
            username: data.username,
            content: toArray(data.content),
            image: data.image,
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

      // Sets the state if usercount data is sent
      if (data.userCount) {
        this.setState({
          userCount: data.userCount
        });
      }
    };
  }

  render() {
    return (
      <div>
        <Nav userCount={this.state.userCount} welcome={this.state.welcome} />
        <MessageList messages={this.state.messages} />
        <ChatBar changeUser={this.changeUser} createMessage={this.createMessage} welcome={this.state.welcome} />
      </div>
    );
  }

  createMessage = (content) => {
    let img;
    let contentText;
    let findImage = /(http[s]?:\/\/.*?\.(?:png|jpg|gif))/gi

    if (content !== '') {
      if (content.match(findImage)) {
        img = content.match(findImage)
        contentText = content.replace((findImage), '')
      }
      if (!img) {
        contentText = content;
      }
      const newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        userColour: this.state.currentUser.userColour,
        image: img,
        content: contentText
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
          currentUser: {
            name,
            userColour: this.state.currentUser.userColour
          }
        })
      } else if (this.state.currentUser.name !== 'Anonymous') {
        const anonName = {
          type: 'postNotification',
          content: `${this.state.currentUser.name} has changed name to Anonymous`,
        }
        let stringifyAnon = JSON.stringify(anonName)
        this.socket.send(stringifyAnon)

        this.setState({
          currentUser: {
            name: 'Anonymous',
            userColour: this.state.currentUser.userColour
          }
        })
      }
    }
  }
}

export default App;
