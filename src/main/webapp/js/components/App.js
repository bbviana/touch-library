var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;

var BookDetails = require('./BookDetails');
var BookForm = require('./BookForm');
var BookList = require('./BookList');
var Footer = require('./Footer');
var Header = require('./Header');
var LoadingWindow = require('./LoadingWindow');


var App = React.createClass({
    mixins: [RouterMixin],

    routes: {
        '/': 'home',
        '/books/create': 'create',
        '/books/:id': 'details'
    },

    home: function () {
        return <BookList />
    },
    details: function (id) {
        return <BookDetails bookId={id} />
    },
    create: function () {
        return <BookForm />
    },

    render: function () {
        console.log("App:render");

        return (
            <div style={styles.container}>
                <LoadingWindow />
                <Header/>
                <div style={styles.center}>
                    {this.renderCurrentRoute()}
                </div>
                <Footer />
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
