const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: '',
    },
    detail:{
        type:String,
        default:''
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

module.exports = News = mongoose.model("news", NewsSchema);