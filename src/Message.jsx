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
      </div>

    );
  }
}

class Notification extends Component {
  render() {
    console.log('Rendering <Notification />');
    return (
      <div>
        <div className="message system">{this.props.messages.notification}</div>
      </div>
    )
  }
}

module.exports = {
  Message,
  Notification
}