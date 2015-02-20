var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;
var StoreWatchMixin = require('../flux/StoreWatchMixin');
var AppStore = require('../stores/AppStore');
var BookStore = require('../stores/BookStore');

var BookDetails = require('./BookDetails');
var BookForm = require('./BookForm');
var BookList = require('./BookList');
var Footer = require('./Footer');
var Header = require('./Header');
var LoadingWindow = require('./LoadingWindow');

var App = React.createClass({
    mixins: [RouterMixin, StoreWatchMixin(AppStore, BookStore)],

    routes: {
        '/': 'home',
        '/books/create': 'create',
        '/books/:id': 'details'
    },

    // invocado a partir de: getInitialState, store:change
    getStateFromStores: function () {
        return {
            loading: AppStore.isLoading(),
            currentBook: BookStore.getCurrentBook(),
            books: BookStore.getBooks()
        };
    },

    home: function () {
        return <BookList books={this.state.books} title="Java"/>
    },
    details: function (id) {
        return <BookDetails book={this.state.currentBook} />
    },
    create: function () {
        return <BookForm />
    },

    render: function () {
        // imlementar shouldComponentUpdate() para evitar renderizações desnecessarias
        return (
            <div style={styles.container}>
                <Header/>
                <div style={styles.center}>
                    {this.renderCurrentRoute()}
                </div>
                <Footer />
                <LoadingWindow loading={this.state.loading}/>
            </div>
        );
    }
});

var styles = {
    container: {
        background: '#e5e5e5',
        minHeight: '100%',
        paddingBottom: 100, // footer
        position: 'relative'
    },
    center: {
        marginTop: 25
    }
};

module.exports = App;
