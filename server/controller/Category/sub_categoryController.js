//db import
const db = require("../../models");
const SubCategory = db.subCategory;
const MainCategory = db.mainCategory;
const Product = db.product;

module.exports.allCategory = async (req,res) => {

    await SubCategory.findAll({
        include: [MainCategory,Product]
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

    const {name,mainCatgId} = req.body;

    await SubCategory.create({
        name : name,
        mainCategoryId: mainCatgId,
        status : "active",
    }).then((data) => {
        res.status(200).json({
            success: true,
            message: "Sub Category Created successfully",
            output: data
        })
    }).catch(error => {
        res.status(500).json({
            name: "server error",
            error: error
        });
    })
};

module.exports.getCategory = async (req,res) => {

    const {id} = req.params;

    await SubCategory.findAll({
        where: {id: id},
        include: [MainCategory,Product]
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send('404 Category  not found');
            }
            res.status(200).json({
                success: true,
                message: "Sub Category Found",
                output: data
            })
        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};

module.exports.editCategory = async (req,res) => {
    const {id} = req.params;
    const {name,mainCatgId} = req.body;

    await SubCategory.update(
        {
            name : name,
            mainCategoryId: mainCatgId
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
    await SubCategory.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Category Deleted Successfully"
        });
    })

};

