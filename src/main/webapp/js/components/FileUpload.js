var React = require('react');

var FileUpload = React.createClass({
    getInitialState: function () {
        return {preview: null, progress: null};
    },

    _onChange: function () {
        // TODO validar se é imagem
        this.setState({preview: null});

        var file = this.refs.input.getDOMNode().files[0];
        if (file) {
            this._showPreview(file);
            this._upload(file);
        }
    },
    _showPreview: function (file) {
        var self = this;
        var reader = new FileReader();

        reader.onload = function (re) {
            self.setState({preview: re.target.result});
        };

        reader.readAsDataURL(file);
    },
    _upload: function (file) {
        var self = this;
        var data = new FormData();
        data.append("file", file);

        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", function (e) {
            self.setState({progress: self._roundToTwo((e.loaded / e.total) * 100) + "%"});
        }, false);

        xhr.addEventListener("load", function (e) {
            self.setState({progress: null});
        }, false);

        xhr.open("post", "/touch-library/ws/books/upload", true);
        xhr.send(data);
    },
    _roundToTwo: function (num) {
        return Math.round(num * 100) / 100;
    },

    render: function () {
        return (
            <div>
                <input ref="input" type="file" onChange={this._onChange}/>
                <div>{this.state.progress}</div>
                <img style={styles.image} src={this.state.preview} />
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