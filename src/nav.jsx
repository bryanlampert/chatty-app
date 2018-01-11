import React, {Component} from 'react';

class Nav extends Component {
  render() {
    const welcome = this.props.welcome;
    return (
      (welcome) ?
        (<nav className="navbar">
            <div className='first-joined'>Welcome to Chatty!</div>
            <div className="connecting">Connecting...</div>
            <div className="sk-fading-circle">
              <div className="sk-circle1 sk-circle"></div>
              <div className="sk-circle2 sk-circle"></div>
              <div className="sk-circle3 sk-circle"></div>
              <div className="sk-circle4 sk-circle"></div>
              <div className="sk-circle5 sk-circle"></div>
              <div className="sk-circle6 sk-circle"></div>
              <div className="sk-circle7 sk-circle"></div>
              <div className="sk-circle8 sk-circle"></div>
              <div className="sk-circle9 sk-circle"></div>
              <div className="sk-circle10 sk-circle"></div>
              <div className="sk-circle11 sk-circle"></div>
              <div className="sk-circle12 sk-circle"></div>
            </div>
          </nav>
        ) /* welcome nav bar */ :
        (<nav className="navbar">
            <img className="logo" src="./images/logo.png" />
            <a href="/" className="navbar-brand">Chatty</a>
            <h2 className="navbar-user-count"><span className='number'>{this.props.userCount}</span> users connected</h2>
          </nav>
        ) // standard nav
    ) // return
  }
}

export default Nav;