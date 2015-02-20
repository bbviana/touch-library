var Dispatcher = require('../flux/Dispatcher');
var ActionNames = require('./ActionNames');

var AppActions = {
    loading: function(loading){
        Dispatcher.dispatch({
            action: ActionNames.LOADING,
            loading: loading
        });
    },

    loadBook: function(bookId){
        return new Promise(function(resolve, reject){
            Dispatcher.dispatch({
                action: ActionNames.LOAD_BOOK,
                resolve: resolve,
                reject: reject,
                bookId: bookId
            });
        });
    },

    loadBooksFromServer: function(){
        Dispatcher.dispatch({
            action: ActionNames.LOAD_BOOKS_FROM_SERVER
        });
    }
};

module.exports = AppActions;