var React = require('react');
var m = require('../utils').m;


var StarRating = React.createClass({
    getDefaultProps: function () {
        return {size: "small"}
    },

    render: function () {
        var percentScore = this.props.score * 100 / 5; // score %
        var size = this.props.size;

        return (
            <div style={styles[size].container}>
                <div style={m(styles[size].inner, {width: percentScore + "%"})}></div>
            </div>
        );
    }
});

var styles = {
    small: {
        container: {
            background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAcklEQVQoz2P4//8/AzmYgWKN6KC4uFgYhGF8UjTqgjBJGqG2GUOxMF6NQAViQCwFxGpAbICk0QAqBpITw6ZRAUkxLqyA1akENCvg9SNQgRYWTVoEA4cSjTDFalAM5uPVCFTABY0/ASSDBKBiXNRNcqRiADBao1Bj6dJdAAAAAElFTkSuQmCC)',
            height: 14,
            width: 70,
            display: 'inline-block',
            verticalAlign: 'middle'
        },

        inner: {
            background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAdElEQVQoz2P4//8/AzmYgWKN6KC4uDgBhGF8UjQ+AGGSNEJt+w/FCXg1AhUUAHEDEB8A4g9IGj9AxUByBdg0LkBSjAsvwOpUApoX4PUjUMEFLJouEAwcSjTCFB+AYjAfr0agAgNo/AUgGRQAFTOgbpIjFQMAtcfKBD81ItYAAAAASUVORK5CYII=) left bottom',
            height: 14
        }
    },

    medium: {
        container: {
            background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsElEQVQoz+2SsQqAIBCGhaCtSWhwFRqCg6BH8/0xjTNEyu683Aq+pbz/M3+V9171RP0CtqD2OOd0pLZGKoBIFwHufkd0DwFkAvhUEAKnLDwxNQnC4IiBc8AElmL311/gN4Nr48xIEaw3YVRWimBolMSZgdRBg+QMZ5XMkFzh7Fv0cHuqt4kr0ASBlggMQWAkAluELUj+zkoEqWTIzxq7gVSyRLCVZ3zT0cYSfM0veOUA7SaWETdHTzIAAAAASUVORK5CYII=)',
            height: 24,
            width: 120,
            display: 'inline-block',
            verticalAlign: 'middle'
        },

        inner: {
            background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAtElEQVQoz+2S0Q2AIAwFGYERHMVRGMGEBRjJERzBETqCGyCYQghRbKn8aXI/St8hD+W9VyNRv4AtaD3WWhNprZEKIDJEgLv3iBkhgEIAnwpC4FyEJ+YuQRicMHAJuMBW7T7/BX5zuDbOTBTBfhNGZacIdKckzmhSBx2SK5xVMkOSw9m36OH2NG8TV2AIAiMROILASQRrFbYh5btVIkglQ3nW2A2kkiWCoz7jm44OluBrfsErJ8j79BUPTQO5AAAAAElFTkSuQmCC) left bottom',
            height: 24
        }
    }

};

module.exports = StarRating;
