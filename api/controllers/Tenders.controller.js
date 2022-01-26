const {Tenders } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
const fs = require('fs')
class TendersController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            release:'required|string',
            closing:'required|string',
            file: 'mime:pdf',
        });

        validator.niceNames({
            title: "Title",
            release: "Releasing ",
            closing: "Closing",
            file: "File",
        })

        let isValid = await validator.check()
        if (!isValid) {
            console.log("erors:",validator)
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        var file_path = req.file?.path ? req.file.path.replace('public\\', "") : '';
        new Tenders({
            title: form_data.title,
            release: form_data.release,
            closing: form_data.closing,
            status: form_data.status,
            file: file_path,
        })
            .save()
            .then((tender) => {
                return res.status(200).json({tender, message: 'Tender added successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async Update(req, res) {
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            release:'required|string',
            closing:'required|string',
        });

        validator.niceNames({
            title: "Title",
            release: "Releasing ",
            closing: "Closing",
        })
        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            if(req.file)
            {
                let del=await Tenders.findOne({_id:req.body._id},{file:1})
                let path='public\\'+del.file;
                fs.unlinkSync(path)
                req.body.file=req.file.path.replace('public\\', "")
            }
            await Tenders.updateOne({_id:req.body._id},{title:req.body.title,release:req.body.release,closing:req.body.closing,status:req.body.status,file:req.body.file,updated_at:new Date()})
            return res.status(200).json({ tender:req.body, message: 'Tender Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Tender', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            var tenders = await Tenders.find();
            return res.status(200).json({ tenders});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { tenderID } = req.params
        try {
            let del=await Tenders.findOne({_id:tenderID},{file:1})
            let path='public\\'+del.file;
            fs.unlinkSync(path)
            await Tenders.deleteOne({_id:tenderID})
            return res.status(200).json({tenderID, message: 'Tender removed successfully' })
        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new TendersController();