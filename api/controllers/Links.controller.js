const {Links } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
class LinksController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            link: 'required|string',
        });

        validator.niceNames({
            title: "Title",
            link: "Link",
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        new Links(form_data)
            .save()
            .then((link) => {
                return res.status(200).json({link, message: 'Link added successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async Update(req, res) {
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            link: 'required|string',
        });

        validator.niceNames({
            title: "Title",
            link: "Link",
        })
        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            await Links.updateOne({_id:req.body._id},{title:req.body.title,link:req.body.link,updated_at:new Date()})
            return res.status(200).json({ link:req.body, message: 'Link Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Link', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            var links = await Links.find();
            return res.status(200).json({ links});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { linkID } = req.params
        try {
            await Links.deleteOne({_id:linkID})
            return res.status(200).json({linkID, message: 'Link removed successfully' })
        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new LinksController();