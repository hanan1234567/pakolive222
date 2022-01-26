const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const LocationsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    kmz: {
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

module.exports = Locations = mongoose.model("location", LocationsSchema);