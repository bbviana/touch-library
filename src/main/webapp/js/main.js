var React = require('react');
var Actions = require('./actions/AppActions');
var App = require('./components/App');

// FIXME remover
window.Actions = Actions;

Actions.loadBooksFromServer();

React.render(<App root="/touch-library" history={true}/>, document.getElementById("app"));