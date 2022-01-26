const {Locations } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
const fs = require('fs')
class LocationsController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            kmz: 'mime:kmz',
        });

        validator.niceNames({
            title: "Title",
            kmz: "File",
        })

        let isValid = await validator.check()
        if (!isValid) {
            console.log("erors:",validator)
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        var file_path = req.file?.path ? req.file.path.replace('public\\', "") : '';
        new Locations({
            title: form_data.title,
            kmz: file_path,
        })
            .save()
            .then((location) => {
                return res.status(200).json({location, message: 'Location added successfully' })
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
                let del=await Locations.findOne({_id:req.body._id},{kmz:1})
                let path='public\\'+del.kmz;
                fs.unlinkSync(path)
                req.body.kmz=req.file.path.replace('public\\', "")
            }
            await Locations.updateOne({_id:req.body._id},{title:req.body.title,file:req.body.kmz,updated_at:new Date()})
            return res.status(200).json({location:req.body, message: 'Location Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Location', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            var locations = await Locations.find();
            return res.status(200).json({ locations});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { locationID } = req.params
        try {
            let del=await Locations.findOne({_id:locationID},{kmz:1})
            let path='public\\'+del.kmz;
            fs.unlinkSync(path)
            await Locations.deleteOne({_id:locationID})
            return res.status(200).json({locationID, message: 'Location removed successfully' })
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new LocationsController();