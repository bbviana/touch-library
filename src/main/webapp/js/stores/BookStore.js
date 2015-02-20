var $ = require('jquery');
var createStore = require('../flux/create-store');
var ActionNames = require('../actions/ActionNames');

// state
var books = [];
var currentBook;

// Store
var BookStore = createStore({
    init: function () {
        this
            .bindAction(ActionNames.LOAD_BOOK, loadBook)
            .bindAction(ActionNames.LOAD_BOOKS_FROM_SERVER, loadBooksFromServer);
    },

    getBooks: function () {
        return books;
    },

    getCurrentBook: function () {
        return currentBook;
    }
});

// private
function loadBook(payload) {
    var self = this;
    var resolve = payload.resolve;
    var reject = payload.reject;
    var bookId = payload.bookId;

    $.ajax({
        url: '/touch-library/ws/books/' + bookId,
        dataType: 'json',
        type: 'GET',

        success: function (book) {
            currentBook = book;
            self.emitChange();
            resolve(book);
        },
        error: function (xhr, status, err) {
            reject(err);
        }
    });
};

function loadBooksFromServer() {
    var self = this;

    $.ajax({
        url: '/touch-library/ws/books',
        dataType: 'json',
        type: 'GET',

        success: function (data) {
            books = data;
            self.emitChange();
        },

        error: function (xhr, status, err) {
            console.error(err);
        }
    });
}

module.exports = BookStore;