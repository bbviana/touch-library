var React = require('react');


var SeeMore = React.createClass({
    render: function () {
        return (
            <a style={styles} href="books/XXXX">Ver Mais</a>
        );
    }
});

var styles = {
    backgroundColor: '#1aa1e1',
    border: 1,
    borderRadius: 2,
    bottom: 0,
    boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
    color: '#FFFFFF',
    display: 'inline-block',
    fontSize: 14,
    height: 30,
    lineHeight: '30px',
    padding: '0 13px',
    position: 'absolute',
    marginTop: 5,
    right: 5,
    textAlign: 'center',
    textDecoration: 'none'
};

module.exports = SeeMore;
