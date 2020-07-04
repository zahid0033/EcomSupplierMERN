//db import
const db = require("../../models");
var multer = require('multer');
//file system
var fs = require('fs');
const Employee = db.employee;
const Supplier = db.supplier;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/images/employee')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname.toLowerCase().split(' ').join('-') )
        // cb(null, Date.now()+'1' )
    }
});
// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).single('image');

exports.upload = upload;

module.exports.allEmployee = async (req,res) => {

    await Employee.findAll({
        include: [Supplier]
    })
        .then(employee => {
            res.status(200).json({
                success: true,
                output : employee
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addEmployee = async (req,res) => {

    const path = req.file && req.file.path;
    const {name,email,phone,image,designation,supplierId} = req.body;

    if (path){
        await Employee.create({
            name : name,
            email : email,
            phone : phone,
            image : req.file.path,
            designation : designation,
            supplierId : supplierId

        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Employee Created successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).json({
                name: "server error",
                error: error
            });
        })
    }
    else{
        console.log(name,email,phone,designation,supplierId);
        await Employee.create({
            name : name,
            email : email,
            phone : phone,
            image : null,
            designation : designation,
            supplierId : supplierId
        }).then((data) => {
            console.log(data);
            res.status(200).json({
                success: true,
                message: "Employee Created successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).json({
                name: "server error",
                error: error
            });
        })
    }

};

module.exports.getEmployee = async (req,res) => {

    const {id} = req.params;

    await Employee.findAll({
        where: {id: id},
        include: [Supplier]
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(200).send('Employee  not found');
            }else{
                res.status(200).json({
                    success: true,
                    message: "Employee Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};

module.exports.editEmployee = async (req,res) => {

    const path = req.file && req.file.path;
    const {id} = req.params;
    const {name,email,phone,image,designation,supplierId} = req.body;

    if (path){
        await Employee.update(
            {
                name : name,
                email : email,
                phone : phone,
                image : req.file.path,
                designation : designation,
                supplierId : supplierId
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Employee Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }
    else{
        await Employee.update(
            {
                name : name,
                email : email,
                phone : phone,
                designation : designation,
                supplierId : supplierId
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Employee Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }



};

module.exports.deleteEmployee = async (req,res) => {
    const {id} = req.params;

    await Employee.findByPk(id)
        .then(data => {
            const path = data.image;
            if (path){
                fs.unlinkSync(path);
            }
        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        });

    await Employee.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Employee Deleted Successfully"
        });
    })

};

