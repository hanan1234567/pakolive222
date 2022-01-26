const { Content, Quiz, QuestionBank } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
class ContentController {
    constructor() {

    }

    async Create(req, res) {
        var form_data = req.body;
        const { topic_id,chapterID } = req.params;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            description: 'required|string',
            content: 'string',
            type: 'required|string',
            duration: 'string',
            passingGrade: 'string',
            random: 'boolean',
        });

        validator.niceNames({
            title: "Content Title",
            description: 'Content Description',
            content: 'Content',
            type: 'Type',
            duration: 'Duration',
            passingGrade: 'PassingGrade',
            random: 'Random',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        try {
            var file_path = req.file?.path ? req.file.path.replace(/^(public\/)/, "") : '';
            if (form_data?.type === 'QUIZ') {
                var quiz = new Quiz({
                    duration: form_data.duration,
                    passingGrade: form_data.passingGrade,
                    random: form_data.random,
                    difficulty: form_data.difficulty,
                })
                await quiz.save()
            }
            new Content({
                title: form_data?.title,
                topic: topic_id,
                description: form_data?.description,
                content: file_path ? file_path : form_data?.type === 'QUIZ' ? quiz?._id : form_data?.content,
                contentType: form_data?.type,
            })
                .save()
                .then(async (content) => {
                    if (content.contentType === 'QUIZ') {
                        const con = await content.populate({ path: 'content', model: Quiz });
                        console.log("yara:quiz",await Quiz.find())
                        return res.status(200).json({ content: con,topicID:topic_id,chapterID, message: 'Content added Successfully' })
                    }
                    return res.status(200).json({ content,topicID:topic_id,chapterID, message: 'Content added Successfully' })
                })
                .catch((error) => {
                    return res.status(400).json({ error: error, message: 'Form validation error' });
                })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Creating Content', message: 'Error ocurred' });
        }
    }


    async Update(req, res) {
        console.log("body:",req.body)
        var form_data = req.body;
        const { topic_id,chapterID } = req.params;
        const content_id=req.body._id
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            description: 'required|string',
            content: 'string',
            duration: 'string',
            passingGrade: 'string',
            random: 'boolean',
        });

        validator.niceNames({
            title: "Content Title",
            description: 'Content Description',
            content: 'Content',
            duration: 'Duration',
            passingGrade: 'PassingGrade',
            random: 'Random',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        try {
            var file_path = req.file?.path ? req.file.path.replace(/^(public\/)/, "") : '';
            let content = await Content.findById(content_id);
            content.title = form_data?.title;
            content.description = form_data?.description;
            content.content = file_path ? file_path : content.contentType === 'QUIZ' ? content.content : form_data?.content;
            if (content.contentType === 'QUIZ') {
                var quiz = await Quiz.findById(content.content)
                quiz.duration = form_data?.duration;
                quiz.passingGrade = form_data?.passingGrade;
                quiz.random = form_data?.random;
                quiz.difficulty = form_data?.difficulty;
                await quiz.save();
            }
            content.updated_at = new Date();
            content.markModified('content');
            await content.save()
            if (content.contentType === 'QUIZ') {
                const con = await content.populate({ path: 'content', model: Quiz });
                return res.status(200).json({ content: con,topicID:topic_id,chapterID, message: 'Content added Successfullys' })
            }
            return res.status(200).json({ content,topicID:topic_id,chapterID, message: 'Content Updated Successfullys' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Contents', message: 'Error ocurred' });
        }
    }


    async Get(req, res) {
        var { topic_id } = req.params;
        try {
            var contents = await Content.find({ topic: mongoose.Types.ObjectId(topic_id) });
            for (let i = 0; i < contents.length; i++) {
                if (contents[i].contentType === 'QUIZ') {
                    contents[i] = await contents[i].populate({ path: 'content', model: Quiz });
                }
            }
            return res.status(200).json({ Contents: contents })
        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }
    }


    async Delete(req, res) {
        var {contentID } = req.params;
        var {chapterID,topicID}=req.body
        console.log(chapterID)
        console.log(topicID)
        console.log(contentID)
        try {
            var content = await Content.findById(contentID);
            if (content.contentType === 'QUIZ') {
                await Quiz.deleteOne({ _id: mongoose.Types.ObjectId(content.content) })
            }
            await Content.deleteOne({ _id: contentID })
            return res.status(200).json({chapterID,topicID,contentID, message: 'Content removed Successfully' })
        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }


    async addQuestions(req, res) {
        var form_data = req.body;
        const { quiz_id } = req.params;
        const validator = new niv.Validator(form_data, {
            questions: 'required|array',
        });

        validator.niceNames({
            questions: "Questions",
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        try {
            const quiz = await Quiz.findById(quiz_id);
            quiz.questions = [...quiz.questions, ...form_data?.questions];
            await quiz.save();
            const populatedQuiz = await quiz.populate({ path: 'questions', model: QuestionBank });
            return res.status(200).json({ Quiz: populatedQuiz, message: 'Questions added Successfully to Quiz' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Adding Questions to Quiz', message: 'Error ocurred' });
        }
    }

    async addNewQuestion(req, res) {
        var form_data = req.body;
        const { quiz_id } = req.params;
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            question: 'required|string',
            explanation: 'string',
            options: 'required|array',
            answers: 'required|array',
            chapter: 'required|string',
            topic: 'required|string',
            subject: 'required|string',
            difficulty: 'required|string',
            tags: 'array',
        });

        validator.niceNames({
            question: "Question",
            explanation: 'Explanation',
            options: 'Options',
            answers: 'Answers',
            chapter: 'Chapter',
            topic: 'Topic',
            subject: 'Subject',
            difficulty: 'Difficulty',
            tags: 'Tags'

        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        try {
            const newQuestion = new QuestionBank({
                question: form_data?.question,
                explanation: form_data?.explanation,
                options: form_data?.options,
                answers: form_data?.answers,
                chapter: form_data?.chapter,
                topic: form_data?.topic,
                subject: form_data?.subject,
                difficulty: form_data?.difficulty,
                tags: form_data?.tags,
            })
            await newQuestion.save()
            const quiz = await Quiz.findById(quiz_id);
            quiz.questions = [...quiz.questions, newQuestion._id];
            await quiz.save();
            const populatedQuiz = await quiz.populate({ path: 'questions', model: QuestionBank });
            return res.status(200).json({ Quiz: populatedQuiz, message: 'New Question added Successfully to Quiz' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Adding New Questions to Quiz', message: 'Error ocurred' });
        }
    }


    async deleteQuestion(req, res) {
        const { quiz_id } = req.params;
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            question: 'required|string',
        });

        validator.niceNames({
            question: "Question",
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        try {
            const quiz = await Quiz.findById(quiz_id);
            quiz.questions = quiz.questions.filter((item) => (item != form_data?.question))
            await quiz.save();
            const populatedQuiz = await quiz.populate({ path: 'questions', model: QuestionBank });
            return res.status(200).json({ Quiz: populatedQuiz, message: 'Questions deleted Successfully to Quiz' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Deleting Question from Quiz', message: 'Error ocurred' });
        }
    }
}

module.exports = new ContentController();