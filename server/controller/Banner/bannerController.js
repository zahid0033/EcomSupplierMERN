//db import
const db = require("../../models");
var multer = require('multer');
//file system
var fs = require('fs');
const Banner = db.banner;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/images/banner')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname.toLowerCase().split(' ').join('-') )
        // cb(null, Date.now()+'1' )
    }
});
// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).single('file');

exports.upload = upload;

//bcrypt for hashing pass
const bcrypt = require('bcrypt');

module.exports.allBanner = async (req,res) => {

    await Banner.findAll()
        .then(banners => {
            res.status(200).json({
                success: true,
                output : banners
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addBanner = async (req,res) => {

    // res.send({req: req.file});
    const path = req.file && req.file.path;

    const {text,image} = req.body;

    if (path){
        await Banner.create({
            text : text,
            image : req.file.path
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Banner Created successfully",
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
        await Banner.create({
            text : text,
            image : null
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Banner Created successfully",
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

module.exports.getBanner = async (req,res) => {

    const {id} = req.params;

    await Banner.findAll({
        where: {id: id}
    })
        .then(data => {
            if ( data.length === 0 ) {
                res.status(404).json({
                    success: true,
                    message: "Banner Not found",
                    output: data
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "Banner Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};

module.exports.editBanner = async (req,res) => {

    const path = req.file && req.file.path;
    const {id} = req.params;

    const {text,image} = req.body;

    if (path){
        await Banner.update(
            {
                text : text,
                image : req.file.path
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Banner Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })

    }else{
        await Banner.update(
            {
                text : text,
                image : null
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Banner Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }


};

module.exports.deleteBanner = async (req,res) => {
    const {id} = req.params;

    await Banner.findByPk(id)
        .then(data => {
            const path = data.image;
            if (path){
                fs.unlinkSync(path);
            }
        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        });

    await Banner.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Banner Deleted Successfully"
        });
    })

};

