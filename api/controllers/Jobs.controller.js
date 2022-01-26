const {Jobs } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
class JobsController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            position: 'required|string',
            department: 'required|string',
            detail: 'required|string',
            release:'required|string',
            closing:'required|string',
        });

        validator.niceNames({
            position: "Position",
            department: "Department",
            detail: "Detail",
            release: "Releasing ",
            closing: "Closing",
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        new Jobs(form_data)
            .save()
            .then((job) => {
                return res.status(200).json({job, message: 'Job added successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async Update(req, res) {
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            position: 'required|string',
            department: 'required|string',
            detail: 'required|string',
            release:'required|string',
            closing:'required|string',
        });

        validator.niceNames({
            position: "Position",
            department: "Department",
            detail: "Detail",
            release: "Releasing ",
            closing: "Closing",
        })
        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            await Jobs.updateOne({_id:req.body._id},{position:req.body.position,department:req.body.department,detail:req.body.detail,release:req.body.release,closing:req.body.closing,status:req.body.status,updated_at:new Date()})
            return res.status(200).json({ job:req.body, message: 'Job Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Job', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            var jobs = await Jobs.find();
            return res.status(200).json({ jobs});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { jobID } = req.params
        try {
            await Jobs.deleteOne({_id:jobID})
            return res.status(200).json({jobID, message: 'Job removed successfully' })
        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new JobsController();