const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const VideosSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    thumbnail: {
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

module.exports = Videos = mongoose.model("video", VideosSchema);