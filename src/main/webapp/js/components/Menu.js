var React = require('react');
var m = require('../utils/').m;
var $ = require('jquery');

var Menu = React.createClass({
    getInitialState: function () {
        return {
            focused: false
        };
    },

    _onMouseOver: function (e) {
        e.stopPropagation();
        this.setState({focused: true});
    },

    _onMouseOut: function (e) {
        this.setState({focused: false});
    },

    render: function () {
        var title = this.props.title;
        var url = this.props.url;
        var focused = this.state.focused;

        return (
            <div style={m(styles.container, focused && styles.focused)}
                onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
                {this.props.items ?
                    <DropdownMenu title={title} items={this.props.items}/> :
                    <SimpleMenu title={title} url={url}/>}
            </div>
        );
    }
});


var SimpleMenu = React.createClass({
    render: function () {
        return <a style={styles.link} href={this.props.url}>{this.props.title}</a>;
    }
});

var DropdownMenu = React.createClass({
    getInitialState: function () {
        return {open: false};
    },
    componentDidMount: function () {
        var self = this;
        document.addEventListener('click', function (e) {
            var $target = $(e.target);
            if (!$target.is('.dropdown-button') && $target.parent('.dropdown-button').length === 0) {
                self._close();
            }
        });
    },

    _close: function () {
        this.setState({open: false});
    },
    _toggle: function () {
        this.setState({open: !this.state.open});
    },

    render: function () {
        return (
            <div>
                <div className="dropdown-button" onClick={this._toggle}>
                    <span>{this.props.title}</span>
                    <span style={styles.dropdownIcon}></span>
                </div>
                <ul style={m(styles.dropdown, this.state.open && styles.open)}>
                    {this.props.items.map(function (item, i) {
                        return (
                            <li style={styles.dropdownItem} key={i}>
                                <SimpleMenu title={item.title} url={item.url} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

var styles = {
    container: {
        cursor: 'pointer',
        display: 'inline-block',
        lineHeight: '48px',
        padding: '0 14px',
        position: 'relative'
    },

    link: {
        display: 'block',
        textDecoration: 'none'
    },

    focused: {
        backgroundColor: 'rgba(0,0,0,0.05)'
    },

    dropdown: {
        background: '#FFF',
        border: '1px solid #d6d6d6',
        borderRadius: 3,
        boxShadow: '0 2px 40px rgba(0,0,0,0.4)',
        color: '#333',
        display: 'none',
        fontSize: 13,
        listStyle: 'none',
        margin: 0,
        padding: '6px 0',
        position: 'absolute',
        top: 44,
        whiteSpace: 'nowrap',
        width: 200,
        zIndex: 100
    },

    dropdownItem: {
        height: 30,
        lineHeight: '30px',
        paddingLeft: 15
    },

    open: {
        display: 'block'
    },

    dropdownIcon: {
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAjUlEQVQoz2P4//8/A7mYYYhrzs3N5SsqKsoE0jLYFGZmZgoWFhZmAYEEhmagxsri4uL/QPwYaIAyssbs7GxhoPwFkDyQnoOhGWiqLlDyA7oBaBp/AdW5YfVzfn6+ObIBeXl5xsgagXQA3gBDM+AnLo04QxtqwHeoAX+xacQbVUC/RQA1vQQF5HBNYeRgAKO6bfkUgtZHAAAAAElFTkSuQmCC)',
        backgroundPositionY: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        height: 15,
        margin: '17px 3px 1px 3px',
        verticalAlign: 'top',
        width: 15
    }
};

module.exports = Menu;