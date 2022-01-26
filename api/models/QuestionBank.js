const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Topic Schema 
const QuestionBankSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    explaination: {
        type: String,
        required: true
    },
    options: {
        type: Array
    },
    answers: {
        type: Array
    },
    userID:{
        type:mongoose.Types.ObjectId
    },
    chapter: {
        type: mongoose.Types.ObjectId,
    },
    topic: {
        type: mongoose.Types.ObjectId,
    },
    subject: {
        type: mongoose.Types.ObjectId,
    },
    difficulty: {
        type: String,
        enum: ['EASY', 'MEDIUM', 'HARD'],
        default: 'EASY'
    },
    tags: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
})



module.exports = QuestionBank = mongoose.model("questionBank", QuestionBankSchema);