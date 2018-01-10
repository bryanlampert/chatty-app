import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const welcome = this.props.welcome;

    return (
      (welcome) ?
        (<footer className="chatbar">
            <input type="text" className="chatbar-username" disabled
              placeholder={'Your Handle (Optional)'}
              onBlur={this.changeUser} />
            <input type="text" className="chatbar-message" disabled
              placeholder="Type a message and hit ENTER"
              onKeyPress={this.handleSubmit} />
          </footer>
        ) :
        (<footer className="chatbar">
            <input type="text" className="chatbar-username"
              placeholder={'Your Handle (Optional)'}
              onBlur={this.changeUser} />
            <input type="text" className="chatbar-message"
              placeholder="Type a message and hit ENTER"
              onKeyPress={this.handleSubmit} />
          </footer>
        )
    );
  }

  handleSubmit = (e) => {
    if (e.key === "Enter") {
      this.props.createMessage(e.target.value)
      e.target.value = ''
    }
  }

  changeUser = (f) => {
    this.props.changeUser(f.target.value)
  }

}
export default ChatBar;