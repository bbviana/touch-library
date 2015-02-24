var React = require('react');
var PropTypes = React.PropTypes;
var ActionCreators = require('../actions/ActionCreators');

/**
 * TODO permitir especificar uma url de imagem
 */
var FileUpload = React.createClass({
    propTypes: {
        fileType: PropTypes.string.isRequired,
        progressStatus: PropTypes.string,
        preview: PropTypes.string
    },

    _onChange: function () {
        var file = this.refs.input.getDOMNode().files[0];
        if (file) {
            ActionCreators.uploadFile(this.props.fileType, file);
        }
    },

    render: function () {
        return (
            <div style={styles.container}>
                <input ref="input" type="file" onChange={this._onChange}/>
                <div>{this.props.progressStatus}</div>
                <img style={styles.image} src={this.props.preview} />
            </div>
        );
    }
});

var styles = {
    container: {},
    image: {
        marginTop: 10,
        width: 100
    }
};

module.exports = FileUpload;