//db import
const db = require("../../models");
var multer = require('multer');
const path = require('path');
//file system
var fs = require('fs');
const Advertise = db.advertise;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../images/advertise'));
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' +file.originalname.toLowerCase().split(' ').join('-') )
        cb(null, Date.now()+path.extname(file.originalname) )
        // cb(null, Date.now()+'1' )
    }
});
// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).single('file');

exports.upload = upload;

//bcrypt for hashing pass
const bcrypt = require('bcrypt');

module.exports.allAdvertise = async (req,res) => {

    await Advertise.findAll()
        .then(advertise => {
            res.status(200).json({
                success: true,
                output : advertise
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addAdvertise = async (req,res) => {
console.log("add advertise");
    // res.send({req: req.file});
    const path = req.file && req.file.path;

    const {position,image} = req.body;

    if (path){

        console.log("add advertise path ");
        await Advertise.create({
            position : position,
            image : req.file.path
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Advertise Created successfully",
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
        await Advertise.create({
            position : position,
            image : null
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Advertise Created successfully",
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

module.exports.getAdvertise = async (req,res) => {

    const {id} = req.params;

    await Advertise.findAll({
        where: {id: id}
    })
        .then(data => {
            if ( data.length === 0 ) {
                res.status(404).json({
                    success: true,
                    message: "Advertise Not found",
                    output: data
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "Advertise Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};

module.exports.editAdvertise = async (req,res) => {

    const path = req.file && req.file.path;
    const {id} = req.params;

    const {position,image} = req.body;

    if (path){
        await Advertise.update(
            {
                position : position,
                image : req.file.path
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Advertise Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })

    }else{
        await Advertise.update(
            {
                position : position,
                image : null
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Advertise Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }


};

module.exports.deleteAdvertise = async (req,res) => {
    const {id} = req.params;

    await Advertise.findByPk(id)
        .then(data => {
            const path = data.image;
            if (path){
                fs.unlinkSync(path);
            }
        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        });

    await Advertise.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Advertise Deleted Successfully"
        });
    })

};

