import React, {Component} from 'react';

class Nav extends Component {
  render() {
    const welcome = this.props.welcome;

    return (
      (welcome) ?
        (<nav className="navbar">
            <div className='first-joined'>Welcome to Chatty!</div>
          </nav>
        ) :
        (<nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <h2 className="navbar-user-count"><span className='number'>{this.props.userCount}</span> users connected</h2>
          </nav>
        )
    )
  }


}

export default Nav;