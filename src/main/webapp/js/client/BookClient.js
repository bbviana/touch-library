var $ = require('jquery');
var Promise = require('es6-promise').Promise;

// Como toda a comunicação com o servidor é assincrona, TODOS os métodos que fazem requisições AJAX devem retornar um
// "Promise" (http://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

var BookClient = {
    create: function (book) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/touch-library/ws/books',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(book),
                dataType: 'json',

                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, err) {
                    reject(err);
                }
            });
        });
    },

    load: function (bookId) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/touch-library/ws/books/' + bookId,
                type: 'GET',
                dataType: 'json',

                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, err) {
                    reject(err);
                }
            });
        });
    },

    loadAll: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/touch-library/ws/books',
                dataType: 'json',
                type: 'GET',

                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, err) {
                    reject(err);
                }
            });
        });
    },

    // aqui é o melhor lugar? deveriamos criar outro client? FileClient talvez?
    uploadFile: function () {
        var payload = arguments[0];
        var file = payload.file;
        var fileType = file.type;
        var onPreviewCallback = payload.preview;
        var onProgressCallback = payload.progress;
        var onSuccessCallback = payload.success;

        // preview
        var isImage = fileType.indexOf("image/") === 0;
        if (isImage) {
            var reader = new FileReader();
            reader.onload = function (e) {
                onPreviewCallback(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            onPreviewCallback(null);
        }

        // upload
        var data = new FormData();
        data.append("file", file);

        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", function (e) {
            onProgressCallback(roundToTwo((e.loaded / e.total) * 100) + "%");
        }, false);

        xhr.addEventListener("load", function (e) {
            var hash = e.target.responseText;
            onSuccessCallback(hash);
        }, false);

        xhr.open("post", "/touch-library/ws/books/upload", true);
        xhr.send(data);
    }
};

// private

function roundToTwo(num) {
    return Math.round(num * 100) / 100;
}


module.exports = BookClient;