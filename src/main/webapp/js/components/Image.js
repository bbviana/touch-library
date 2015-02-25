var React = require('react');
var PropTypes = React.PropTypes;

var Image = React.createClass({
    propTypes: {
        id: PropTypes.string,
        style: PropTypes.object
    },

    render: function () {
        if (!this.props.id) {
            return null;
        }

        return <img style={this.props.style} src={"/touch-library/ws/books/image/" + this.props.id}/>;
    }
});

module.exports = Image;