//db import
const db = require("../../models");
var multer = require('multer');
//file system
var fs = require('fs');
//database table
const Admin = db.admin;
const Role = db.role;
//bcrypt for hashing pass
const bcrypt = require('bcrypt');
// jwt
const jwt = require('jsonwebtoken');
//config
const config = require ('../../config/auth.config');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/images/admin')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname.toLowerCase().split(' ').join('-') )
        // cb(null, Date.now()+'1' )
    }
});
// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).single('file');

exports.upload = upload;

module.exports.signin = async (req,res) => {
    const {email,password} = req.body;
    Admin.findOne({
        where : {
            email : email
        },
        include: [Role]
    })
        .then(admin => {
            if (!admin){
                return res.status(404).send({
                    success : false,
                    accessToken : null,
                    message : "Email Not Found"
                });
            }
            const isPasswordValid = bcrypt.compareSync(password,admin.password);
            if(!isPasswordValid){
                res.status(401).send({
                    success : false,
                    accessToken : null,
                    message : "invalid Password"
                })
            }
            const token = jwt.sign({id: admin.id, email : admin.email},config.secret,{expiresIn: 86400});
            res.status(200).json({
                success : true,
                message : "Admin Logged in successfully",
                accessToken : token,
                id: admin.id,
                name: admin.name,
                role : admin.role.role
            })
        })
};

module.exports.allAdmin = async (req,res) => {

    await Admin.findAll({
        include: [Role]
    })
        .then(admins => {
            res.status(200).json({
                success: true,
                output : admins
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addAdmin = async (req,res) => {

    // res.send({req: req.file});
    const path = req.file && req.file.path;

    const {name,email,password,role_id,address,phone,image} = req.body;

    if (path){
        await Admin.create({
            name : name,
            email : email,
            password : bcrypt.hashSync(password, 10),
            roleId : role_id,
            address : address,
            phone : phone,
            image : req.file.path,
            status : "active",
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Admin Created successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).json({
                name: "server error",
                error: error.errors
            });
        })
    }
    else{
        await Admin.create({
            name : name,
            email : email,
            password : bcrypt.hashSync(password, 10),
            roleId : role_id,
            address : address,
            phone : phone,
            image : null,
            status : "active",
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Admin Created successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).json({
                name: "server error",
                error: error.errors
            });
        })
    }

};

module.exports.getAdmin = async (req,res) => {

    const {id} = req.params;

    await Admin.findAll({
        where: {id: id},
        include: [ Role ]
    })
    .then(data => {
        if ( data.length === 0 ) {
            res.status(404).json({
                success: true,
                message: "User Not found",
                output: data
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Admin Found",
                output: data
            })
        }

    }).catch(error => {
        res.status(500).send(`server error ${error}`);
    })

};

module.exports.editAdmin = async (req,res) => {

    const path = req.file && req.file.path;
    const {id} = req.params;

    const {name,role_id,address,phone,image,status} = req.body;

    if (path){
        await Admin.update(
            {
                name : name,
                roleId : role_id,
                address : address,
                phone : phone,
                image : req.file.path,
                status : status
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Admin Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })

    }else{
        await Admin.update(
            {
                name : name,
                roleId : role_id,
                address : address,
                phone : phone,
                status : status
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Admin Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }


};

module.exports.deleteAdmin = async (req,res) => {
    const {id} = req.params;

    await Admin.findByPk(id)
        .then(data => {
            const path = data.image;
            if (path){
                fs.unlinkSync(path);
            }
        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        });

    await Admin.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Admin Deleted Successfully"
        });
    })

};

