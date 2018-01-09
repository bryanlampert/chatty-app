import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log('Rendering <MessageList />');
    return (
      <main className="messages">
        { this.props.messages.map((msg, ky) =>
          <Message key={ky} messages={msg} />)
        }
      </main>
    );
  }
}
export default MessageList;