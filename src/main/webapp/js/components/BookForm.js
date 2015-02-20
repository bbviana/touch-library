var React = require('react');
var $ = require('jquery');
var FileUpload = require('./FileUpload');

var BookForm = React.createClass({
    _onSubmit: function (e) {
        e.preventDefault();

        var data = {
            title: this.refs.title.getDOMNode().value,
            category: this.refs.category.getDOMNode().value,
            author: this.refs.author.getDOMNode().value,
            publisher: this.refs.publisher.getDOMNode().value,
            datePublished: this.refs.datePublished.getDOMNode().value,
            description: this.refs.description.getDOMNode().value
        };

        $.ajax({
            url: '/touch-library/ws/books',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),

            success: function (data) {

            },
            error: function (xhr, status, err) {
                console.error(err);
            },
            complete: function(){

            }
        });
    },

    render: function () {
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
                            <FileUpload />
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