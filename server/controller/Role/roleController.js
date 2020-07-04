//db import
const db = require("../../models");
const Role = db.role;

module.exports.allRole = async (req,res) => {

    await Role.findAll()
        .then(roles => {
            res.status(200).json({
                success: true,
                output : roles
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addRole = async (req,res) => {

    const {role} = req.body;

    await Role.create({
        role : role,
    }).then((data) => {
        res.status(200).json({
            success: true,
            message: "Role Created successfully",
            output: data
        })
    }).catch(error => {
        res.status(500).send(error);
    })
};

module.exports.deleteRole = async (req,res) => {
    const {id} = req.params;
    await Role.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Deleted Successfully"
        });
    })

};

