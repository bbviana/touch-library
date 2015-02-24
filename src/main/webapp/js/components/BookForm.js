var React = require('react');
var ActionCreators = require('../actions/ActionCreators');
var UploadFilesStore = require('../stores/UploadFilesStore');
var StoreWatchMixin = require('../flux/StoreWatchMixin');

var FileUpload = require('./FileUpload');


var BookForm = React.createClass({
    mixins: [StoreWatchMixin(UploadFilesStore)],

    getStateFromStores: function () {
        return {
            cover: UploadFilesStore.getFiles().cover,
            pdf: UploadFilesStore.getFiles().pdf,
            epub: UploadFilesStore.getFiles().epub,
            mobi: UploadFilesStore.getFiles().mobi
        };
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var book = {
            title: this.refs.title.getDOMNode().value,
            category: this.refs.category.getDOMNode().value,
            author: this.refs.author.getDOMNode().value,
            publisher: this.refs.publisher.getDOMNode().value,
            datePublished: this.refs.datePublished.getDOMNode().value,
            description: this.refs.description.getDOMNode().value
        };

        ActionCreators.createBook(book);
    },

    render: function () {
        console.log("BookForm:render");

        return (
            <form className="container" style={styles.container} className="" onSubmit={this._onSubmit} action="#">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Título</label>
                            <input className="form-control" placeholder="Título" ref="title"/>
                        </div>

                        <div className="form-group">
                            <label>Categoria</label>
                            <input className="form-control" placeholder="Java, Javacript, Scrum etc" ref="category"/>
                        </div>

                        <div className="form-group">
                            <label>Autor</label>
                            <input className="form-control" placeholder="Autor" ref="author"/>
                        </div>

                        <div className="form-group">
                            <label>Editora</label>
                            <input ref="publisher" className="form-control" placeholder="Editora"/>
                        </div>

                        <div className="form-group">
                            <label>Data de Publicação</label>
                            <input type="date" className="form-control" ref="datePublished"/>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea style={styles.description} ref="description" className="form-control" placeholder="Descrição"/>
                        </div>

                        <div className="form-group">
                            <label>Capa</label>
                            <FileUpload fileType="cover" progressStatus={this.state.cover.progressStatus} preview={this.state.cover.preview}/>
                        </div>

                        <div className="form-group">
                            <label>PDF</label>
                            <FileUpload fileType="pdf" progressStatus={this.state.pdf.progressStatus} preview={this.state.pdf.preview}/>
                        </div>

                        <div className="form-group">
                            <label>epub</label>
                            <FileUpload fileType="epub" progressStatus={this.state.epub.progressStatus} preview={this.state.epub.preview}/>
                        </div>

                        <div className="form-group">
                            <label>mobi</label>
                            <FileUpload fileType="mobi" progressStatus={this.state.mobi.progressStatus} preview={this.state.mobi.preview}/>
                        </div>
                    </div>
                </div>

                <input type="submit"/>
            </form>
        );
    }
});

var styles = {
    container: {
        margin: 26
    },

    description: {
        height: 200
    }
};

module.exports = BookForm;