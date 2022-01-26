const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const JobsSchema = new Schema({
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    detail: {
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
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = Jobs = mongoose.model("job", JobsSchema);