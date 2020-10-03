//db import
const db = require("../../models");
const Op = db.Sequelize.Op;
const path = require('path');
//file system
var fs = require('fs');
var nodemailer = require('nodemailer');

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
        // cb(null, './server/images/supplier')
        cb(null, path.join(__dirname,'../../images/supplier'));
        console.log("dirname",path.join(__dirname,'../../images/supplier'))
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
            return res.send({
                success: false,
                accessToken: null,
                message: "User Doesnt Found"
            })
        }else{
            const isPasswordValid = bcrypt.compareSync(password, supplier.password);
            if (!isPasswordValid){
                res.send({
                    success: false,
                    accessToken: null,
                    message: "Invalid password"
                })
            }else{
                if (supplier.mailVerifyStatus === "non-verified"){
                    res.send({
                        success: false,
                        accessToken: null,
                        message: "Your email is not verified yet. Please check your mail"
                    })
                }else{
                    const token = jwt.sign({id: supplier.id,email:supplier.email},config.secret,{expiresIn: 86400});
                    res.status(200).json({
                        success: true,
                        message: "Supplier Logged in successfully",
                        accessToken: token,
                        id: supplier.id,
                        name: supplier.name
                    })
                }
            }
        }
    })
};

module.exports.forgetPassword = async (req,res) => {
    const {email} = req.body;

    if (email === ''){
        res.status(400).send({
            success : false,
            accessToken : null,
            message : "Email Required"
        })
    }
    Supplier.findOne({
        where : {
            email : email
        }
    }).then( supplier => {
        if (supplier === null){
            res.status(403).send({
                success : false,
                message : "Email Not found"
            });
        }else{
            const token = jwt.sign({id: supplier.id, email:supplier.email},config.secret,{expiresIn: 3600000});
            Supplier.update({
                resetPasswordToken: token,
                resetPasswordExpires: Date.now()+ 3600000
            },{
                where : {id: supplier.id}
            });
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: `${process.env.MAIL_SERVICE}`,
                port: 465,
                secure: true,
                auth: {
                    user: `${process.env.MAIL_USER}`, // generated ethereal user
                    pass: `${process.env.MAIL_PASSWORD}`, // generated ethereal password
                },
            });

            const mailOptions = {
                from: `${process.env.MAIL_USER}`, // sender address
                to: `${email}`, // list of receivers
                subject: "From Dadavi", // Subject line
                text: 'You are receiving this email because you (or someone else) have requested to reset of the password of your account.\n\n'
                +'Please Click on the following link,or paste this into your browser to complete the process within one hour of receiving it : \n\n'
                +`https://dadavi.com/resetPassword/${token} \n\n`
                +'If you did not request this, Please ignore this email, Your password will remain unchanged. \n', // plain text body
                // html: "<b>Hello world?</b>", // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions,function (err,response) {
                if(err){
                    res.status(500).json({
                        name: "server error",
                        error: err
                    });
                    console.log("mail send error",err)
                }else{
                    res.status(200).json({
                        success: true,
                        message: "Recovery Mail sent. Check your Email",
                    })
                }
            });
        }
    })
};

module.exports.resetSupplierPassword = async (req,res) => {
    const {token} = req.params;
    Supplier.findOne({
        where : {
            resetPasswordToken : token,
        }
    }).then(supplier => {

        if (supplier === null){
            res.status(200).json({
                success : false,
                message : 'password reset link is invalid or has expired'
            });
        }else{
            const compare = supplier.resetPasswordExpires > Date.now();
            if (compare){
                res.status(200).send({
                    success : true,
                    supplierMail : supplier.email,
                    message : 'password reset link is valid'
                })
            }else{
                res.status(200).json({
                    success : false,
                    message : 'password reset link is invalid or has expired'
                });
            }

        }
    })
};

module.exports.updatePasswordViaEmail = async (req,res) => {
    const {email,password} = req.body;
    Supplier.findOne({
        where : {
            email : email
        }
    })
        .then(supplier => {
            if (supplier !== null){
                Supplier.update({
                    password : bcrypt.hashSync(password, 10),
                    resetPasswordToken: null,
                    resetPasswordExpires: null
                },
                {
                    where : {email: email}
                }).then(data => {
                    res.status(200).json({
                        success: true,
                        message: "Your password has been reset successfully. Please try logging in again",
                    })
                }).catch(error => {
                    res.status(500).json({
                        name: "server error",
                        error: error.errors
                    });
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                name: "server error",
                error: error.errors
            });
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

        // const token = jwt.sign({id: data.id,email:data.email},config.secret,{expiresIn: 86400});
        const token = jwt.sign({id: data.id,email:data.email},config.secret,{expiresIn: 3600000});
        Supplier.update({
            verifyEmailToken: token,
            mailTokenExpires: Date.now()+ 3600000,
            mailVerifyStatus : "non-verified"
        },{
            where : {id: data.id}
        });
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: `${process.env.MAIL_SERVICE}`,
            port: 465,
            secure: true,
            auth: {
                user: `${process.env.MAIL_USER}`, // generated ethereal user
                pass: `${process.env.MAIL_PASSWORD}`, // generated ethereal password
            },
        });

        const mailOptions = {
            from: `${process.env.MAIL_USER}`, // sender address
            to: `${email}`, // list of receivers
            subject: "From Dadavi", // Subject line
            text: 'To verify your email.\n\n'
                +'Please Click on the following link,or paste this into your browser to complete the process within one hour of receiving it : \n\n'
                +`https://dadavi.com/emailVerify/${token} \n\n`
                +'If you did not attempt to sign up in dadavi, Then please ignore this email \n', // plain text body
            // html: "<b>Hello world?</b>", // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions,function (err,response) {
            console.log("block1");
            if(err){
                console.log("block2");
                res.status(500).json({
                    name: "server error",
                    error: err
                });
                console.log("mail send error",err)
            }else{
                console.log("block3");
                res.status(200).json({
                    success: true,
                    message: "A verification mail has been sent to your email. Please Verify to log in",
                    id: data.id,
                    name: data.name
                })
            }
        });

    }).catch(error => {
        res.status(500).json({
            name: "server error",
            error: error.errors
        });
    })
};

module.exports.verifyEmail = async (req,res) => {
    const {token} = req.params;
    Supplier.findOne({
        where : {
            verifyEmailToken : token,
        }
    }).then(supplier => {

        if (supplier === null){
            res.status(200).json({
                success : false,
                message : 'Your verification link is invalid or has expired'
            });
        }else{
            if (supplier.mailVerifyStatus === "verified"){
                res.status(200).json({
                    success : true,
                    message : 'Your email has already been verified. Go to Login'
                });
            }else{
                const compare = supplier.mailTokenExpires > Date.now();
                if (compare){
                    Supplier.update({
                            verifyEmailToken : null,
                            mailTokenExpires: null,
                            mailVerifyStatus: "verified",
                        },
                        {
                            where : {verifyEmailToken: token}
                        }).then(data => {
                        res.status(200).json({
                            success: true,
                            message : 'Mail Verified. You can login now.'
                        })
                    }).catch(error => {
                        res.status(500).json({
                            name: "server error",
                            error: error.errors
                        });
                    });


                }else{
                    res.status(200).json({
                        success : false,
                        message : 'Your verification link is invalid or has expired'
                    });
                }
            }
        }
    })
};

module.exports.sendVerificationToken = async (req,res) => {

    const {email} = req.body;

    Supplier.findOne({
        where : {
            email : email,
        }
    }).then(data => {
        if (data === null){
            res.status(200).json({
                success : false,
                message : "This Email doesn't register before"
            });
        }
        else{
            const token = jwt.sign({id: data.id,email:data.email},config.secret,{expiresIn: 3600000});
            Supplier.update({
                verifyEmailToken: token,
                mailTokenExpires: Date.now()+ 3600000
            },{
                where : {email: data.email}
            });
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: `${process.env.MAIL_SERVICE}`,
                port: 465,
                secure: true,
                auth: {
                    user: `${process.env.MAIL_USER}`, // generated ethereal user
                    pass: `${process.env.MAIL_PASSWORD}`, // generated ethereal password
                },
            });

            const mailOptions = {
                from: `${process.env.MAIL_USER}`, // sender address
                to: `${email}`, // list of receivers
                subject: "From Alibaba", // Subject line
                text: 'You are receiving this email because you (or someone else) have requested to reset of the password of your account.\n\n'
                    +'Please Click on the following link,or paste this into your browser to complete the process within one hour of receiving it : \n\n'
                    +`http://dadavi.com/emailVerify/${token} \n\n`
                    +'If you did not request this, Please ignore this email, Your password will remain unchanged. \n', // plain text body
                // html: "<b>Hello world?</b>", // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions,function (err,response) {
                if(err){
                    res.status(500).json({
                        name: "server error",
                        error: err
                    });
                    console.log("mail send error",err)
                }else{
                    res.status(200).json({
                        success: true,
                        message: "A verification mail has been sent to your email. Please Verify to log in",
                        id: data.id,
                        name: data.name
                    })
                }
            });
        }

    }).catch(error =>{
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