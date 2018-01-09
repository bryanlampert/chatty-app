import React, {Component} from 'react';

class ChatBar extends Component {


  render() {
    console.log('Rendering <ChatBar />');
    return (
      <footer className="chatbar">
        <input type="text" className="chatbar-username"
          placeholder={'Your Name (Optional)'}
          defaultValue={this.props.currentUser.name} />
        <input type="text" className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.createMessage} />
      </footer>
    );
  }

  createMessage = (e) => {
    if (e.key === "Enter") {
      this.props.createMessage(e.target.value)
      e.target.value = ''
    }

  }

}
export default ChatBar;