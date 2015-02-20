var StoreWatchMixin = function () {
    var stores = Array.prototype.slice.call(arguments);

    return {
        getInitialState: function () {
            return this.getStateFromStores();
        },

        componentDidMount: function () {
            var self = this;
            stores.forEach(function (store) {
                store.addChangeListener(self._onStoreChange);
            });
        },

        componentWillUnmount: function () {
            var self = this;
            stores.forEach(function (store) {
                store.removeChangeListener(self._onStoreChange);
            });
        },

        _onStoreChange: function () {
            this.setState(this.getStateFromStores());
        }
    }
};

module.exports = StoreWatchMixin;