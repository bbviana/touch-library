var $ = require('jquery');
var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state
var book = {};

// Store
var BookStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.LOAD_BOOK_SUCCESS, receiveBook);
        this.bindAction(ActionTypes.CREATE_BOOK_SUCCESS, receiveBook);
    },

    getBook: function () {
        return book;
    }
});

// private

function receiveBook(payload) {
    book = payload.book;
    this.emitChange();
}

module.exports = BookStore;