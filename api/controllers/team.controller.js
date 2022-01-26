const {Team } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
class TeamController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            name: 'required|string',
            designation: 'required|string',
            email: 'required|email',
            phone:'required|string',
        });

        validator.niceNames({
            name: 'Name',
            designation: 'Designation',
            email: 'Email',
            phone:'Phone',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        new Team(form_data)
            .save()
            .then((team) => {
                return res.status(200).json({team, message: 'Team Member added successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async Update(req, res) {
        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            name: 'required|string',
            designation: 'required|string',
            email: 'required|email',
            phone:'required|string',
        });

        validator.niceNames({
            name: 'Name',
            designation: 'Designation',
            email: 'Email',
            phone:'Phone',
        })
        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            await Team.updateOne({_id:req.body._id},{name:req.body.name,designation:req.body.designation,email:req.body.email,phone:req.body.phone,updated_at:new Date()})
            return res.status(200).json({ team:req.body, message: 'Team Member Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Team Member', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            var team = await Team.find();
            return res.status(200).json({ team});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var {_id} = req.params
        try {
            await Team.deleteOne({_id})
            return res.status(200).json({_id, message: 'Team Member removed successfully' })
        }
        catch (e) {
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new TeamController();