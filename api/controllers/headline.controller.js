const { Headline } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
class HeadlineController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            detail: 'required|string'
        });

        validator.niceNames({
            title: "Title",
            detail: 'Detail',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        new Headline({
            title: form_data.title,
            detail:form_data.detail,
        })
            .save()
            .then((headline) => {
                return res.status(200).json({ headline, message: 'Headline added successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async Update(req, res) {
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            detail: 'required|string'
        });
        validator.niceNames({
            title: "Title",
            detail: 'Detail',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            let headline=await Headline.updateOne({_id:req.body._id},{title:req.body.title,detail:req.body.detail,updated_at:new Date()})
            return res.status(200).json({ headline:req.body, message: 'Headline Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating News', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            var headlines = await Headline.find();
            return res.status(200).json({ headlines});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { headlineID } = req.params
        try {
            await Headline.deleteOne({_id:headlineID})
            return res.status(200).json({headlineID, message: 'Headline removed successfully' })

        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new HeadlineController();