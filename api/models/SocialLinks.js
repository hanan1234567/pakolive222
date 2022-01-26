const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const LinksSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
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

module.exports = SocialLinks = mongoose.model("socialLink", LinksSchema);