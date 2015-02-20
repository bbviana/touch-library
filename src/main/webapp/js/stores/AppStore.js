var $ = require('jquery');
var createStore = require('../flux/create-store');
var ActionNames = require('../actions/ActionNames');

// state
var isLoading = false;

// Store
var AppStore = createStore({
    init: function () {
        this.bindAction(ActionNames.LOADING, loading);
    },

    isLoading: function () {
        return isLoading;
    }
});

// private
function loading(payload) {
    isLoading = payload.loading;
    this.emitChange();
};

module.exports = AppStore;