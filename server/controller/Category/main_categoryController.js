//db import
const db = require("../../models");
var multer = require('multer');
const MainCategory = db.mainCategory;
const SubCategory = db.subCategory;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/images/mainCategory')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname.toLowerCase().split(' ').join('-') )
        // cb(null, Date.now()+'1' )
    }
});
// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).single('file');

exports.upload = upload;

module.exports.allCategory = async (req,res) => {

    await MainCategory.findAll({
        include: [SubCategory]
    })
        .then(category => {
            res.status(200).json({
                success: true,
                output : category
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addCategory = async (req,res) => {

    const path = req.file && req.file.path;

    const {name,image,icon} = req.body;
    if (path){
        await MainCategory.create({
            name : name,
            image : req.file.path,
            icon : icon,
            status : "active",
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Main Category Created successfully",
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
        await MainCategory.create({
            name : name,
            image : null,
            icon : icon,
            status : "active",
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Main Category Created successfully",
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

module.exports.getCategory = async (req,res) => {

    const {id} = req.params;

    await MainCategory.findAll({
        where: {id: id},
        include: [SubCategory]
    })
        .then(data => {
            if (data.length === 0 ) {
                return res.status(404).send('404 Category  not found');
            }else{
                res.status(200).json({
                    success: true,
                    message: "Main Category Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};

module.exports.editCategory = async (req,res) => {
    const {id} = req.params;
    const {name,image} = req.body;

    await MainCategory.update(
        {
            name : name,
            image : image
        },
        {
            where: {id: id}
        }
    ).then((data) => {
        res.status(200).json({
            success: true,
            message: "Category Updated successfully",
            output: data
        })
    }).catch(error => {
        res.status(500).send(error);
    })

};

module.exports.deleteCategory = async (req,res) => {
    const {id} = req.params;
    await MainCategory.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Category Deleted Successfully"
        });
    })

};

