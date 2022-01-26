const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const GallerySchema = new Schema({
    title: {
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
    images:[
        {
            thumbnail:{type:String,default: ''},
            original:{type:String,default: ''},
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = Gallery = mongoose.model("gallery", GallerySchema);