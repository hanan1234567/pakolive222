const config = require('config');
const jwt = require('jsonwebtoken');
const multer = require("multer");
var path = require('path')

const auth = (req, res, next) => {
    var bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        var token;
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
        jwt.verify(token, config.get('myprivatekey'), async function (err, decoded) {
            if (err) {
                req.authenticated = false;
                req.decoded = null;
                return res.status(401).json({ error: "Token Expired", msg: err })
            } else {
                req.decoded = decoded;
                req.authenticated = true;
                req.token = token
                next();
            }
        });
    }
    else {
        return res.status(401).json({ error: "Unauthorized" }).end()
    }
}

const oauth = (req, res, next) => {
    var bearerHeader = req.headers['authorization'];
    var { refresh_token } = req.query;
    if (bearerHeader && refresh_token) {
        var bearer = bearerHeader.split(" ");
        var access_token = bearer[1];
        jwt.verify(refresh_token, config.myprivatekey, function (err, decoded) {
            if (err) {
                req.decoded = null;
                return res.status(401).json({ error: "Session Expired" }).end()
            } else {
                req.decoded = jwt.decode(access_token);
                next();
            }
        })
    }
    else {
        return res.status(401).json({ error: "Unauthorized 2" }).end()
    }
}


const can = (action, subject) => {

    return function (req, res, next) {
        // next()
        var actions = action.split('|')
        var roles = req?.decoded?.roles

        isPermitted = roles.findIndex((x) => {
            var role_subject = x.permissions?.[subject];
            if (role_subject) {
                for (var i = 0; i < actions.length; i++) {
                    if (role_subject?.[actions[i]] === true) {
                        if (actions[i].includes(':own')) {
                            req.own = true
                        }
                        return true
                    }
                }
            }
        })
        if (isPermitted > -1)
            next()
        else
            return res.status(403).json({ error: "Unauthorized" }).end()

    }
}


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/images')
    },
    filename: function (req, file, cb) {
        let file_name = path.parse(file.originalname).name;
        let cleanName = file_name.replace(/[^A-Z0-9]+/ig, "_");
        let ext = path.parse(file.originalname).ext;
        let new_file_name = cleanName + '_' + new Date().getTime() + ext;
        cb(null, new_file_name)
    },
    
})
const upload = multer({ 
    storage: storage ,
    fileFilter: (req, file, cb) => {
        if(file.fieldname=='file')
        {
            if (file.mimetype === "application/pdf") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .pdf format allowed!'));
            }
        }
        else  if(file.fieldname=='kmz')
        {
            if (file.mimetype === "application/octet-stream") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .kmz format allowed!'));
            }
        }
        else if(file.fieldname=='image'|| file.fieldname=='thumbnail')
        {
            if (file.mimetype === "image/png"||file.mimetype === "image/jpg"||file.mimetype === "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .pdf format allowed!'));
            }
        }
        else 
        cb(null, true);
    }
})



module.exports = { auth, oauth, can, upload }