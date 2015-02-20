var React = require('react');
var PropTypes = React.PropTypes;
var BookCard = require('./BookCard');
var SeeMore = require('./SeeMore');

var BookList = React.createClass({
    propTypes: {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div className="book-list" style={styles.container}>
                <h1 className="heading" style={styles.heading}>
                    <a style={styles.title} href="books/tag/XXX">{this.props.title}</a>
                    <SeeMore />
                </h1>
                <div className="book-list" style={styles.list}>
                    {this.props.books.map(function (book, i) {
                        return <BookCard book={book} key={i} />;
                    })}
                </div>
            </div>
        );
    }
});

var styles = {
    container: {
        padding: '0 100px'
    },
    heading: {
        cursor: 'default',
        fontSize: 28,
        height: 50,
        lineHeight: '50px',
        margin: 0,
        padding: 5,
        position: 'relative'
    },
    title: {
        color: '#333',
        textDecoration: 'none'
    },
    list: {}
};

module.exports = BookList;
