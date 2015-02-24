var dispatch = require('../flux/Dispatcher').dispatch;
var navigate = require('react-mini-router').navigate;
var ActionTypes = require('./ActionTypes');
var BookClient = require('../client/BookClient');

var ActionCreators = {
    // remover o uso de promises a fazer como file upload?

    createBook: function (book) {
        ActionCreators.loading(true);
        dispatch({action: ActionTypes.CREATE_BOOK, book: book});

        BookClient.create(book)
            .then(function (savedBook) {
                dispatch({action: ActionTypes.CREATE_BOOK_SUCCESS, book: savedBook});
                ActionCreators.loading(false);
                navigate("/touch-library/books/" + savedBook.id);
            })
            .catch(function (err) {
                // nao bastaria um SERVER_FAIL generico?
                dispatch({action: ActionTypes.CREATE_BOOK_FAIL});
                ActionCreators.loading(false);
            });
    },

    loadBook: function (bookId) {
        ActionCreators.loading(true);
        dispatch({action: ActionTypes.LOAD_BOOK, bookId: bookId});

        BookClient.load(bookId)
            .then(function (book) {
                dispatch({action: ActionTypes.LOAD_BOOK_SUCCESS, book: book});
                ActionCreators.loading(false);
            })
            .catch(function (err) {
                dispatch({action: ActionTypes.LOAD_BOOK_FAIL});
                ActionCreators.loading(false);
            });
    },

    loadBooks: function () {
        ActionCreators.loading(true);
        dispatch({action: ActionTypes.LOAD_BOOKS});

        BookClient.loadAll()
            .then(function (data) {
                dispatch({action: ActionTypes.LOAD_BOOKS_SUCCESS, books: data});
                ActionCreators.loading(false);
            })
            .catch(function () {
                dispatch({action: ActionTypes.LOAD_BOOKS_FAIL});
                ActionCreators.loading(false);
            });

    },

    loading: function (loading) {
        dispatch({action: ActionTypes.CHANGE_LOADING, loading: loading});
    },

    uploadFile: function (fileType, file) {
        // TODO validar tipo de arquivo

        dispatch({action: ActionTypes.UPLOAD_FILE});

        BookClient.uploadFile({
            file: file,
            preview: function (data) {
                dispatch({action: ActionTypes.UPLOAD_FILE_PREVIEW, fileType: fileType, preview: data});
            },
            progress: function (data) {
                dispatch({action: ActionTypes.UPLOAD_FILE_PROGRESS, fileType: fileType, progressStatus: data});
            },
            success: function (data) {
                dispatch({action: ActionTypes.UPLOAD_FILE_SUCCESS, fileType: fileType, hash: data});
            }
        });
    }
};

module.exports = ActionCreators;