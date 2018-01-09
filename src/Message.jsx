import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message />');
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.messages.username}</span>
          <span className="message-content">{this.props.messages.content}</span>
        </div>
        <div className="message system">

        </div>
      </div>

    );
  }
}
export default Message;