var React = require('react');

var AddBookButton = require('./AddBookButton');
var Logo = require('./Logo');
var MenuBar = require('./MenuBar');
var Search = require('./Search');
var UserInfo = require('./UserInfo');


var Header = React.createClass({
    render: function () {
        return (
            <div>
                <div style={styles.row1}>
                    <Logo />
                    <Search />
                    <UserInfo />
                </div>
                <div style={styles.row2}>
                    <MenuBar />
                    <AddBookButton />
                </div>
            </div>
        );
    }
});

var styles = {
    row1: {
        background: '#f1f1f1',
        height: 60,
        position: 'relative'
    },

    row2: {
        position: 'relative'
    }
};

module.exports = Header;
