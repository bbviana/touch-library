var React = require('react');
var App = require('./components/App');

// FIXME remover
window.ActionCreators = require('./actions/ActionCreators');

React.render(<App root="/touch-library" history={true}/>, document.getElementById("app"));