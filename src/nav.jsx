import React, {Component} from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h2 className="navbar-user-count"><span className='number'>{this.props.userCount}</span> users connected</h2>
      </nav>)
  }


}

export default Nav;