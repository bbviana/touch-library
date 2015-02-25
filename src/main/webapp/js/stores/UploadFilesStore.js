var createStore = require('../flux/create-store');
var ActionTypes = require('../actions/ActionTypes');

// state
var files = {
    cover: {
        progressStatus: null,
        hash: null,
        preview: null
    },
    pdf: {
        progressStatus: null,
        hash: null,
        preview: null
    },
    epub: {
        progressStatus: null,
        hash: null,
        preview: null
    },
    mobi: {
        progressStatus: null,
        hash: null,
        preview: null
    }
};

// Store
var UploadFilesStore = createStore({
    init: function () {
        this.bindAction(ActionTypes.CREATE_BOOK_SUCCESS, clear);
        this.bindAction(ActionTypes.UPLOAD_FILE_PREVIEW, uploadFilePreview);
        this.bindAction(ActionTypes.UPLOAD_FILE_PROGRESS, uploadFileProgress);
        this.bindAction(ActionTypes.UPLOAD_FILE_SUCCESS, uploadFileSuccess);
    },

    getFiles: function () {
        return files;
    }
});

// private
function clear(){

}

// TODO deveriamos usar Immutable nos metodos abaixo?
function uploadFilePreview(payload) {
    var fileType = payload.fileType;

    files[fileType].preview = payload.preview;
    this.emitChange();
}

function uploadFileProgress(payload) {
    var fileType = payload.fileType;

    files[fileType].progressStatus = payload.progressStatus;
    this.emitChange();
}

function uploadFileSuccess(payload) {
    var fileType = payload.fileType;

    files[fileType].progressStatus = null;
    files[fileType].hash = payload.hash;
    this.emitChange();
}

module.exports = UploadFilesStore;