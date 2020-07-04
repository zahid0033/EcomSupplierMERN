//db import
const db = require("../../models");
const Op = db.Sequelize.Op;
//file system
var fs = require('fs');

var multer = require('multer');
const Supplier = db.supplier;
const Product = db.product;
const Employee = db.employee;
//bcrypt for hashing pass
const bcrypt = require('bcrypt');
//jwt
const jwt = require('jsonwebtoken');
//secret key
const config = require('../../config/auth.config');

//file upload with multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/images/supplier')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname.toLowerCase().split(' ').join('-') )
        // cb(null, Date.now()+'1' )
    }
});
// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).single('image');

exports.upload = upload;

module.exports.signin = async (req,res) => {
    const {email,password} = req.body;
    Supplier.findOne({
        where : {
            email : email
        }
    })
    .then(supplier => {
        if (!supplier){
            return res.status(200).send("Supplier doesnt found");
        }
        const isPasswordValid = bcrypt.compareSync(password, supplier.password);
        if (!isPasswordValid){
            res.status(401).send({
                accessToken: null,
                message: "invalid password"
            })
        }

        const token = jwt.sign({id: supplier.id,email:supplier.email},config.secret,{expiresIn: 86400});
        res.status(200).json({
            success: true,
            message: "Supplier Logged in successfully",
            accessToken: token,
            id: supplier.id,
            name: supplier.name
        })
    })
};

module.exports.signUp = async (req,res) => {

    const {name,address,phone,email,password,country,businessType,ownership } = req.body;

    await Supplier.create({
        name : name,
        address : address,
        phone : phone,
        email : email,
        password : bcrypt.hashSync(password, 10),
        country : country,
        businessType : businessType,
        ownership : ownership,
        status : "Non-Verified"

    }).then((data) => {

        const token = jwt.sign({id: data.id,email:data.email},config.secret,{expiresIn: 86400});
        res.status(200).json({
            success: true,
            message: "Supplier Logged in successfully",
            accessToken: token,
            id: data.id,
            name: data.name
        })
    }).catch(error => {
        res.status(500).json({
            name: "server error",
            error: error.errors
        });
    })
};

module.exports.allSupplier = async (req,res) => {

    await Supplier.findAll({
        include: [Product,Employee]
    })
        .then(supplier => {
            res.status(200).json({
                success: true,
                output : supplier
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addSupplier = async (req,res) => {

    const {name,address,phone,email,password,description,image ,country,businessType,ownership } = req.body;

    await Supplier.create({
        name : name,
        address : address,
        phone : phone,
        email : email,
        password : password,
        description : description,
        image : image,
        country : country,
        businessType : businessType,
        ownership : ownership

    }).then((data) => {
        res.status(200).json({
            success: true,
            message: "Supplier Created successfully",
            output: data
        })
    }).catch(error => {
        res.status(500).json({
            name: "server error",
            error: error.errors
        });
    })
};

module.exports.getSupplier = async (req,res) => {

    const {id} = req.params;

    await Supplier.findAll({
        where: {id: id},
        include: [Product,Employee]
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send('404 Category  not found');
            }else{
                res.status(200).json({
                    success: true,
                    message: "Supplier Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};

module.exports.editSupplier = async (req,res) => {

    const path = req.file && req.file.path;
    const {id} = req.params;
    const {name,address,phone,email,password,description,image ,country,businessType,ownership } = req.body;

    if (path){
        await Supplier.update(
            {
                name : name,
                address : address,
                phone : phone,
                email : email,
                password : password,
                description : description,
                image : req.file.path,
                country : country,
                businessType : businessType,
                ownership : ownership
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Supplier Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }
    else{
        await Supplier.update(
            {
                name : name,
                address : address,
                phone : phone,
                email : email,
                password : password,
                description : description,
                country : country,
                businessType : businessType,
                ownership : ownership
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Supplier Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }



};

module.exports.statusUpdate = async (req,res) => {
    await Supplier.update(
        {
            status : req.body.status
        },
        {
            where : {id: req.body.id}
        }
    ).then(data => {
        res.status(200).json({
            success: true,
            message: "Supplier Status Updated",
            output: data
        })
    }).catch(error => {
            res.status(500).send(error);
        })
};

module.exports.deleteSupplier = async (req,res) => {
    const {id} = req.params;

    await Supplier.findByPk(id)
        .then(data => {
            const path = data.image;
            if (path){
                fs.unlinkSync(path);
            }
        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        });

    await Supplier.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Supplier Deleted Successfully"
        });
    })

};

module.exports.searchSupplier = async (req,res) => {

    const searchText = req.params.searchText.toLowerCase();

    await Supplier.findAll({
        include: [Employee,{
            model: Product,
            // where: {name: `%${searchText}%`},
            where: {
                name : {[Op.like]: `%${searchText}%`}
            },
        }]
    })
        .then(data => {
            console.log(data);
            if (data.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No Supplier found",
                    output: data
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "Supplier Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};