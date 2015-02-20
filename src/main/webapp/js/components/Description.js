var React = require('react');

var Description = React.createClass({
    render: function () {
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>Descrição</h1>
                <div style={styles.body}>
                    {this.props.text}
                </div>
            </div>
        );
    }
});

var styles = {
    container: {
        padding: 26
    },

    title: {
        margin: '0 0 10px 0',
        fontSize: 28,
        lineHeight: '40px'
    },

    body: {
        lineHeight: '22px',
        textAlign: 'justify'
    }
};

module.exports = Description;