var React = require('react');

var DownloadButton = React.createClass({
    render: function () {
        return (
            <button style={styles.container} type="button">
                <i className="glyphicon glyphicon-download-alt"></i> {this.props.title}
            </button>
        );
    }
});

var styles = {
    container: {
        backgroundColor: '#1aa1e1',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
        border: 1,
        borderRadius: 2,
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        height: 36,
        marginRight: 10,
        padding: '0 20px'
    }
};

module.exports = DownloadButton;
