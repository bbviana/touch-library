var React = require('react');
var PropTypes = React.PropTypes;

var DownloadButton = React.createClass({
    propTypes:{
        id: PropTypes.string
    },

    render: function () {
        if(!this.props.id){
            return null;
        }

        return (
            <a style={styles.container} href={"/touch-library/ws/books/download/" + this.props.id}>
                <i className="glyphicon glyphicon-download-alt"></i> {this.props.title}
            </a>
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
        display: 'inline-block',
        fontSize: 14,
        fontWeight: 'bold',
        height: 36,
        lineHeight: '36px' ,
        marginRight: 10,
        padding: '0 20px',
        textDecoration: 'none'
    }
};

module.exports = DownloadButton;
