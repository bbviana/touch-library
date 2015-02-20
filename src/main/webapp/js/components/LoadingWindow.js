var React = require('react');
var PropTypes = React.PropTypes;

var LoadingWindow = React.createClass({
    propTypes: {
        loading: PropTypes.bool.isRequired
    },

    render: function () {
        if (!this.props.loading) {
            return null;
        }

        return (
            <div style={styles.container}>
                <div style={styles.inner}>
                    <i className="glyphicon glyphicon-repeat icon-spin"></i>
                </div>
            </div>
        );
    }
});

var styles = {
    container: {
        backgroundColor: '#e5e5e5',
        bottom: 0,
        display: 'table',
        fontSize: 100,
        height: '100%',
        left: 0,
        opacity: .8,
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        zIndex: 20000
    },

    inner: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle'
    }
};

module.exports = LoadingWindow;