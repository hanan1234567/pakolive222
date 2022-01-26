const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TendersSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    release: {
        type: String,
        required: true,
    },
    closing: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum:['Open','Close'],
        default:'Open'
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

module.exports = Tenders = mongoose.model("tender", TendersSchema);