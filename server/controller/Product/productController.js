//db import
const db = require("../../models");
var multer = require('multer');
//file system
var fs = require('fs');
const Product = db.product;
const SubCategory = db.subCategory;
const Supplier = db.supplier;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/images/products')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '-' +file.originalname.toLowerCase().split(' ').join('-') )
        // cb(null, Date.now()+'1' )
    }
});
// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).array('images',4);

exports.upload = upload;

module.exports.allProduct = async  (req,res) => {

    await Product.findAll({
        include: [SubCategory,Supplier],
        order: [ [ 'createdAt', 'DESC' ]]
    })
        .then(product => {
            res.status(200).json({
                success: true,
                output : product
            });
        }).catch(error => {
            res.status(500).json({
                error : error,
            })
        })

};

module.exports.addProduct = async (req,res) => {

    const {name,specification,description,images,price,model,subCategoryId ,supplierId } = req.body;

    if (req.files.length !== 0){
        var filesPath = [];

        for (var x= 0; x<req.files.length; x++){
            await filesPath.push(req.files[x].path);
        }

        await Product.create({
            name : name,
            specification : specification,
            description : description,
            images : JSON.stringify(filesPath),
            price : price,
            model : model,
            subCategoryId : subCategoryId,
            supplierId : supplierId,
            status : "active"
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Product Created successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).json({
                name: "server error",
                error: error
            });
            console.log(error)
        })
    }
    else{
        await Product.create({
            name : name,
            specification : specification,
            description : description,
            price : price,
            model : model,
            subCategoryId : subCategoryId,
            supplierId : supplierId,
            status : "active"
        }).then((data) => {
            res.status(200).json({
                success: true,
                message: "Product Created successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).json({
                name: "server error",
                error: error
            });
            console.log(error)
        })
    }

};

module.exports.getProduct = async (req,res) => {

    const {id} = req.params;

    await Product.findByPk (id,{
        include: [SubCategory,Supplier]
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send('404 Product  not found');
            }else{
                res.status(200).json({
                    success: true,
                    message: "Product Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })

};

module.exports.editProduct = async (req,res) => {
    const {id} = req.params;
    const {name,specification,description,images,price,model,subCategoryId } = req.body;

    if(req.files.length !== 0){
        var filesPath = [];

        for (var x= 0; x<req.files.length; x++){
            await filesPath.push(req.files[x].path);
        }
        await Product.update(
            {
                name : name,
                specification : specification,
                description : description,
                images : images,
                price : price,
                model : model,
                subCategoryId : subCategoryId
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Product Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }
    else{
        await Product.update(
            {
                name : name,
                specification : specification,
                description : description,
                price : price,
                model : model,
                subCategoryId : subCategoryId
            },
            {
                where: {id: id}
            }
        ).then((data) => {
            res.status(200).json({
                success: true,
                message: "Product Updated successfully",
                output: data
            })
        }).catch(error => {
            res.status(500).send(error);
        })
    }



};

module.exports.deleteProduct = async (req,res) => {
    const {id} = req.params;

    await Product.findByPk(id)
        .then(data => {
            const paths = JSON.parse(data.images);
            paths.map((item,key) => {
                if (item){
                    fs.unlinkSync(item);
                }
            })

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        });

    await Product.destroy(
        {where: {id:id} }
    ).then((deleted)=>{
        res.status(200).json({
            success: true,
            deleted: deleted,
            message: "Product Deleted Successfully"
        });
    })

};

module.exports.mainCategoryProducts = async (req,res) => {
    const id = req.query.categoryId;
    await Product.findAll({
        where : {},
        include: [Supplier,{
            model: SubCategory,
            where: {mainCategoryId : id}
        }]

    })
    .then(data => {
        if (data.length === 0) {
            res.status(200).json({
                success: true,
                message: "Product Not Found",
                output: data
            });
        }else{
            res.status(200).json({
                success: true,
                message: "Product Found",
                output: data
            })
        }

    }).catch(error => {
        res.status(500).send(`server error ${error}`);
    })
};

module.exports.subCategoryProducts = async (req,res) => {
    const id = req.query.categoryId;
    await Product.findAll({
        where : {subCategoryId: id},
        include: [Supplier,SubCategory]

    })
        .then(data => {
            if (data.length === 0) {
                res.status(200).json({
                    success: true,
                    message: "Product Not Found",
                    output: data
                });
            }else{
                res.status(200).json({
                    success: true,
                    message: "Product Found",
                    output: data
                })
            }

        }).catch(error => {
            res.status(500).send(`server error ${error}`);
        })
};

