# Chatty App

##### LHL React Single Page Chat Application

Chatty is a SPA that allows you to chat with other other users connected.

User handle's are optional and default to anonymous if not set. 

Extra features include:

- Every user is given a random chat colour for every session.
- Send an image (or many images) just by pasting the hyperlink
- Emoji's are rendered by entering certain text
	- Such as `:)`, `:thumbsup:`, `:'D`, `:see_no_evil:` etc..
- A connecting screen when first connecting
 

## Getting Started

1. Clone the repository.
2. Install the server dependencies
	- In your terminal, navigate to the `chatty_server` folder
	- Type the `npm install` command.
3. Install the application dependencies
	- In a separate terminal window/tabe, navigate to the project folder
	- Type the `npm install` command.
4. Start both the application and the server
	- Type `npm start` in both terminals
5. The app will be served at <http://localhost:3000/>.
6. Go to <http://localhost:3000/> in your browser to start chatting away!

## Dependencies

- react
- react-dom
- react-emoji-render

#####Dev dependencies:

- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server

## Screenshots
Connecting Page:
!["Screenshot of Connecting Page"]()

Initial Chat Page:
!["Screenshot of Initial Chat Page"]()

Examples of Messages:
!["Screenshot of Messages"]()
!["Screenshot of Messages2"]()

