const { Class, Subject, User,Quiz, Content,Gallery } = require('../models')
const { niv, } = require('../utils')
const mongoose = require('mongoose')
const fs=require("fs")
class GalleryController {
    constructor() {
    }

    async Create(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            description: 'required',
            thumbnail: 'mime:jpg,jpeg,png'
        });

        validator.niceNames({
            title: "Gallery Title",
            description: 'Description',
            thumbnail: 'Thumbnail'
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }
        var file_path = req.file?.path ? req.file.path.replace('public\\', "") : '';
        console.log("file_path=",file_path)
        new Gallery({
            title: form_data.title,
            description: form_data.description,
            thumbnail: file_path
        })
            .save()
            .then((gallery) => {
                return res.status(200).json({ gallery, message: 'Gallery created successfully' })
            })
            .catch((error) => {
                return res.status(400).json({ error: error, message: 'Form validation error' });
            })


    }
    async GalleryImage(req, res) {
        var galleryID=req.params.galleryID
        let galleryImage={thumbnail:req.files[0].path.replace('public\\', ""),original:req.files[1].path.replace('public\\', "")}
        const gallery=await Gallery.findOne({_id:galleryID})
        gallery.images.push(galleryImage)
        await gallery.save()
        return res.status(200).json({ galleryImage,galleryID, message: 'Gallery created successfully' })
        return res.status(400).json({ error: error, message: 'Form validation error' });
    }


    async Update(req, res) {

        var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            title: 'required|string',
            description: 'required',
        });

        validator.niceNames({
            title: "Gallery Title",
            description: 'Description',
        })

        let isValid = await validator.check()
        if (!isValid) {
            return res.status(400).json({ error: validator.errors, message: 'Form validation error' });
        }

        try {
            if(req.file)
            {
                let del=await Gallery.findOne({_id:req.body._id},{thumbnail:1})
                let path='public\\'+del.thumbnail;
                fs.unlinkSync(path)
                req.body.thumbnail=req.file.path.replace('public\\', "")
            }
            await Gallery.updateOne({_id:req.body._id},{title:req.body.title,description:req.body.description,thumbnail:req.body.thumbnail,detail:req.body.detail,updated_at:new Date()})
            return res.status(200).json({ gallery:req.body, message: 'Gallery Updated Successfully' })
        }
        catch (error) {
            console.log("Error", error)
            return res.status(400).json({ error: 'Error Updating Gallery', message: 'Error ocurred' });
        }

    }

    async Get(req, res) {
        try {
            const {limit}=req.params;
            var gallerys;
            if(limit)
            gallerys = await Gallery.find().limit(limit);
            else
             gallerys = await Gallery.find();
             console.log(gallerys)
            return res.status(200).json({ gallerys});

        } catch (e) {
            return res.status(400).json({ error: 'Error occured' });
        }

    }
    async Delete(req, res) {
        var { galleryID } = req.params
        try {
            let del=await Gallery.findOne({_id:galleryID},{thumbnail:1,images:1})
            let path='public\\'+del.thumbnail;
            fs.unlinkSync(path)
            for(let i=0;i<del.images.length;i++)
            {
                fs.unlinkSync('public\\'+del.images[i].thumbnail)
                fs.unlinkSync('public\\'+del.images[i].original)
            }
            await Gallery.deleteOne({_id:galleryID})
            return res.status(200).json({galleryID, message: 'Gallery removed successfully' })

        }
        catch (e) {
            console.log(e)
            return res.status(400).json({ error: e || 'Invalid Request' });
        }

    }
}

module.exports = new GalleryController();