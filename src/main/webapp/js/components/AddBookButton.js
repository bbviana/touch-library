var React = require('react');
var navigate = require('react-mini-router').navigate;

var AddBookButton = React.createClass({

    _onClick: function () {
        navigate('/touch-library/books/create');
    },

    render: function () {
        return (
            <button style={styles.container} onClick={this._onClick}>
                <i className="glyphicon glyphicon-upload"></i> Adicionar Livro
            </button>
        );
    }
});

var styles = {
    container: {
        backgroundColor: '#1aa1e1',
        border: 'none',
        borderRadius: 2,
        boxShadow: '0 1px 0 rgba(0,0,0,.05)',
        color: '#FFF',
        fontSize: '14px',
        fontWeight: 'bold',
        height: 30,
        outline: 'none',
        padding: '0 13px',
        position: 'absolute',
        right: 25,
        top: 9
    }
};

module.exports = AddBookButton;