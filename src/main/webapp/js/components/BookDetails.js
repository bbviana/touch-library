var React = require('react');
var PropTypes = React.PropTypes;
var ActionCreators = require('../actions/ActionCreators');
var BookStore = require('../stores/BookStore');
var StoreWatchMixin = require('../flux/StoreWatchMixin');

var Description = require('./Description');
var DownloadButton = require('./DownloadButton');
var Image = require('./Image');
var Reviews = require('./Reviews');
var Similar = require('./Similar');
var StarRating = require('./StarRating');


var BookDetails = React.createClass({
    propTypes: {
        bookId: PropTypes.string.isRequired
    },

    mixins: [StoreWatchMixin(BookStore)],

    getStateFromStores: function () {
        return {
            book: BookStore.getBook()
        }
    },

    componentDidMount: function () {
        if (this.props.bookId !== this.state.book.id) { // já foi carregado?
            ActionCreators.loadBook(this.props.bookId);
        }
    },

    render: function () {
        console.log("BookDetails:render");

        var book = this.state.book;
        var reviews = book.reviews || {};

        return (
            <div style={styles.container}>
                <div style={styles.detailsSection}>
                    <Image style={styles.cover} id={book.coverId} />

                    <div style={styles.info}>
                        <h1 style={styles.title}>{book.title}</h1>

                        <div style={styles.subtitle}>
                            <a style={styles.author} href="#">{book.author}</a>
                            <div style={styles.separator}>-</div>
                            <div style={styles.datePublished}>{book.datePublished}</div>
                            <div style={styles.publisher}>{book.publisher}</div>
                        </div>

                        <div style={styles.actions}>
                            <DownloadButton title="pdf" id={book.pdfId}/>
                            <DownloadButton title="epub" id={book.epubId}/>
                            <DownloadButton title="mobi" id={book.mobiId}/>
                        </div>

                        <div style={styles.divider}></div>

                        <div>
                            <StarRating score={reviews.score} />
                            <div style={styles.reviewsCount}>
                                (
                                <i className="glyphicon glyphicon-user"></i> {reviews.count})
                            </div>
                        </div>
                    </div>
                </div>

                <Description text={book.description}/>

                <Reviews reviews={reviews} />

                <Similar list={book.similar}/>
            </div>
        );
    }
});

var styles = {
    container: {
        background: '#f5f5f5'
    },
    detailsSection: {
        background: '#e5e5e5',
        borderBottom: '2px solid #d6d6d6',
        padding: 26
    },
    cover: {
        boxShadow: '0 0 4px #8d8d8d',
        display: 'inline-block',
        width: 200
    },
    info: {
        display: 'inline-block',
        padding: '0 30px',
        verticalAlign: 'top'
    },
    title: {
        color: '#333',
        fontSize: 28,
        lineHeight: '35px',
        margin: 0
    },
    subtitle: {
        color: '#8d8d8d',
        fontSize: 13
    },
    author: {
        color: '#8d8d8d',
        display: 'inline-block',
        fontWeight: 'bold'
    },
    separator: {
        display: 'inline-block',
        margin: '0 5px'
    },
    datePublished: {
        display: 'inline-block'
    },
    actions: {
        margin: '10px 0'
    },
    divider: {
        borderTop: '1px solid rgba(0,0,0,0.1)',
        margin: '15px 0',
        maxWidth: 510,
        width: '100%'
    },
    reviewsCount: {
        color: '#8d8d8d',
        display: 'inline-block',
        fontSize: 13,
        marginLeft: 5,
        verticalAlign: 'middle'
    }
};

module.exports = BookDetails;
