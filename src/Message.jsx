import React, {Component} from 'react';

let colour = '';

class Message extends Component {

  render() {
    const colour = {
      color: '#' + this.props.messages.userColour
    };

    const img = {
      image: this.props.messages.image
    };

    return (
      <div>
        <div className="message">
          <span className="message-username" style={ colour }>{this.props.messages.username}</span>
          <span className="message-content">{this.props.messages.content} <img src={img.image} /> </span>
        </div>
      </div>

    );
  }
}

class Notification extends Component {
  render() {
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