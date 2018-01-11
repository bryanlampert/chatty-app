import React, {Component} from 'react';
import {Message, Notification} from './Message.jsx';

class MessageList extends Component {
  componentDidUpdate() {
    this.container.scrollIntoView({behavior: 'smooth'});
  }
  render() {
    return (
      <main className='messages'>
        { this.props.messages.map((data, key) =>
          (data.notification) ?
          <Notification key={key} messages={data} /> :
          <Message key={key} messages={data} />
          ) }
        <div />
        <div ref={e => this.container = e} />
      </main>
    );
  }
}

export default MessageList;