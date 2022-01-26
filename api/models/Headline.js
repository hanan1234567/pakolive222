const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const HeadlineSchema = new Schema({
    title: {
        type: String,
        required: true,
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

module.exports = Headline = mongoose.model("headline", HeadlineSchema);