const {Downloads } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
const fs = require('fs')
class DownloadsController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            file: 'mime:pdf',
        });

        validator.niceNames({
            title: "Title",
            file: "File",
        })

        let isValid = await validator.check()
        if (!isValid) {
            console.log("erors:",validator)
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        var file_path = req.file?.path ? req.file.path.replace('public\\', "") : '';
        new Downloads({
            title: form_data.title,
            file: file_path,
        })
            .save()
            .then((download) => {
                return res.status(200).json({download, message: 'Downloaded Material added successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async Update(req, res) {
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
        });

        validator.niceNames({
            title: "Title",
        })
        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            if(req.file)
            {
                let del=await Downloads.findOne({_id:req.body._id},{file:1})
                let path='public\\'+del.file;
                fs.unlinkSync(path)
                req.body.file=req.file.path.replace('public\\', "")
            }
            await Downloads.updateOne({_id:req.body._id},{title:req.body.title,file:req.body.file,updated_at:new Date()})
            return res.status(200).json({ download:req.body, message: 'Downloaded Material Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Downloaded Material', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            var downloads = await Downloads.find();
            return res.status(200).json({ downloads});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { downloadID } = req.params
        try {
            let del=await Downloads.findOne({_id:downloadID},{file:1})
            let path='public\\'+del.file;
            fs.unlinkSync(path)
            await Downloads.deleteOne({_id:downloadID})
            return res.status(200).json({downloadID, message: 'Downloaded Material removed successfully' })
        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new DownloadsController();