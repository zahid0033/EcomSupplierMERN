const jwt = require("jsonwebtoken");
//db import
const db = require("../models");
const Admin = db.admin;
const Supplier = db.supplier;
const Role = db.role;
// secret
const config = require('../config/auth.config');


module.exports.verifyToken = (req,res,next) => {
    console.log(req.headers);
    let token = req.headers['x-access-token'];
    if (!token){
        res.status(403).send({
            message: "You have to log in first"
        });
    }
    jwt.verify(token,config.secret,(err, decoded) => {
        if (err) {
            return res.status(401).send({
                isAuth:false,
                message: "You are unauthorized"
            });
        }
        req.userId = decoded.id;
    });
    next();
};

module.exports.isSuperAdmin = (req,res,next) => {
      Admin.findByPk(req.userId , {include : [Role]} ).then(user => {
          if ( user.role.role === "superAdmin"){
              next();
          }
          else {
              res.status(403).send({
                  isAuth:false,
                  message: "You dont have any permission to do this"
              });
          }
      })
};

module.exports.isSupplier = (req,res,next) => {
    Supplier.findByPk(req.userId)
        .then(supplier => {
            if (!supplier){
                res.status(403).send({
                    isAuth:false,
                    message: "You dont have any permission to do this"
                });
            }
            else{
                next();
            }
        })
};
