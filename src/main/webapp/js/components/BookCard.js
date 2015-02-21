var React = require('react');
var PropTypes = React.PropTypes;
var Actions = require('../actions/AppActions');
var navigate = require('react-mini-router').navigate;
var StarRating = require('./StarRating');

var BookCard = React.createClass({
    propTypes: {
        book: PropTypes.object.isRequired
    },

    _onClick: function (e) {
        Actions.loading(true);

        Actions.loadBook(this.props.book.id).then(function (book) {
            Actions.loading(false);
            navigate("/touch-library/books/" + book.id);
        });
    },

    render: function () {
        var book = this.props.book;
        var reviews = book.reviews || {};

        return (
            <div style={styles.container}>
                <div className="cover" style={styles.cover} onClick={this._onClick}>
                    <div style={styles.cell}>
                        <img style={styles.image} src={book.cover}/>
                    </div>
                </div>
                <div style={styles.details}>
                    <div className="title" style={styles.title}>
                        <a href="#">{book.title}</a>
                        <div style={styles.paragraphEnd}></div>
                    </div>
                    <div className="author" style={styles.author}>
                        <a href="#">{book.author}</a>
                    </div>
                    <div className="rating" style={styles.rating}>
                        <StarRating score={reviews.score}/>
                    </div>
                </div>
            </div>
        );
    }
});

var styles = {
    container: {
        background: '#FFF',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'inline-block',
        margin: 5,
        verticalAlign: 'top',
        width: 160
    },
    cover: {
        background: '#f5f5f5',
        cursor: 'pointer',
        display: 'table',
        height: 245,
        width: 160
    },
    cell: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    image: {
        maxHeight: '100%',
        maxWidth: '100%'
    },
    details: {
        padding: 10
    },
    title: {
        fontSize: 14,
        lineHeight: '18px',
        maxHeight: 18,
        overflow: 'hidden',
        position: 'relative',
        whiteSpace: 'nowrap'
    },
    paragraphEnd: {
        background: 'linear-gradient(to right,rgba(255,255,255,0),rgba(255,255,255,1))',
        bottom: 0,
        height: 19,
        position: 'absolute',
        right: 0,
        width: 45
    },
    author: {
        color: '#aaa',
        fontSize: 12
    }
};

module.exports = BookCard;
