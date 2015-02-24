var $ = require('jquery');
var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state
var books = [];

// Store
var BookListStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.LOAD_BOOKS_SUCCESS, loadBooksSuccess);
    },

    getBooks: function () {
        return books;
    }
});

// private
function loadBooksSuccess(payload) {
    books = payload.books;
    this.emitChange();
}

module.exports = BookListStore;