const { Class, Subject, User,Quiz, Content,Gallery,News } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
const fs = require('fs')
class NewsController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            date:'required|string',
            description: 'required|string',
            thumbnail: 'mime:jpg,jpeg,png',
            detail: 'required|string'
        });

        validator.niceNames({
            title: "Title",
            date:'Date',
            description: 'Description',
            thumbnail: 'Thumbnail',
            detail: 'Detail',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        var file_path = req.file?.path ? req.file.path.replace('public\\', "") : '';
        new News({
            title: form_data.title,
            date: form_data.date,
            description: form_data.description,
            thumbnail: file_path,
            detail:form_data.detail,
        })
            .save()
            .then((news) => {
                return res.status(200).json({ news, message: 'News added successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async Update(req, res) {
        var form_data = req.body;
        console.log(req.body)
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            date:'required|string',
            description: 'required|string',
            detail: 'required|string'
        });
        validator.niceNames({
            title: "Title",
            date:'Date',
            description: 'Description',
            detail: 'Detail',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            if(req.file)
            {
                let del=await News.findOne({_id:req.body._id},{thumbnail:1})
                let path='public\\'+del.thumbnail;
                fs.unlinkSync(path)
                req.body.thumbnail=req.file.path.replace('public\\', "")
            }
            let news=await News.updateOne({_id:req.body._id},{title:req.body.title,date:req.body.date,description:req.body.description,thumbnail:req.body.thumbnail,detail:req.body.detail,updated_at:new Date()})
            console.log("news:",news)
            return res.status(200).json({ news:req.body, message: 'News Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating News', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            const {limit}=req.params
            console.log("limt:",limit)
            var newses;
            if(limit)
            newses = await News.find().limit(6);
            else
            newses = await News.find();
            return res.status(200).json({ newses});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { newsID } = req.params
        try {
            let del=await News.findOne({_id:newsID},{thumbnail:1})
            let path='public\\'+del.thumbnail;
            fs.unlinkSync(path)
            await News.deleteOne({_id:newsID})
            return res.status(200).json({newsID, message: 'News removed successfully' })

        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new NewsController();