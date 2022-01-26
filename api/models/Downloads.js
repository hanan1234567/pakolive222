const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DownloadsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        default: '',
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = Downloads = mongoose.model("download", DownloadsSchema);