import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: 'Bob'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 'whoLetBobOut',
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 'anony-moose',
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} createMessage={this.createMessage} />
      </div>
    );
  }

  createMessage = (content) => {
    const newMessage = {
      username: this.state.currentUser.name,
      content
    }

    const newMsgs = this.state.messages.concat(newMessage)

    this.setState({
      messages: newMsgs
    })
  }

}
export default App;
