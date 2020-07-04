//db import
const db = require("../models");
const User = db.user;
//bcrypt for hashing pass
const bcrypt = require('bcrypt');
//jwt
const jwt = require('jsonwebtoken');

module.exports.userLogin = (req,res) => {

    const {username,password} = req.body;

    User.findOne({
        where: {
            username : username
        }
    }).then(user => {
        if (!user){
            return res.status(404).send("username doesnt found");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid){
            res.status(401).send({
                accessToken: null,
                message: "invalid password"
            })
        }

        const token = jwt.sign({id: user.id},"zahidsProject",{expiresIn: 86400});
        // res.header('x-access-token', token);
        res.status(200).send({
            message: "login successful",
            role: user.role,
            accessToken: token,
            user: user
        })
    })
};

module.exports.allUser = async (req,res) => {
    const users = await User.findAll();
    res.status(200).send({
        isAuth : true,
        permission : "admin",
        output : users
    });
};

module.exports.addUser = async (req,res) => {
    const {username, email, role, password} = req.body;
    const addData = await User.create({
        username : username,
        email : email,
        role : role,
        password: bcrypt.hashSync(password, 10)
    }).then((data) => {
        res.status(200).send({
            success: true,
            message: "successfully submitted"
        })
    }).catch(error => {
        res.status(500).send(error);
    })
};

module.exports.getSingleUser = async (req,res) => {
    const userId = parseInt(req.params.userId);
    await User.findByPk(userId)
        .then(data => {
            if (!data) {
                return res.status(404).status('404 user not found');
            }
            res.status(200).send({output : data});
        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};