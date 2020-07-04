var SubCategory = require("./subCategory.model");
var Supplier = require("./supplier.model");

module.exports = (sequelize, Sequelize) => {
    const product = sequelize.define('products',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name: Sequelize.STRING,
        specification: Sequelize.TEXT('long'),
        description: Sequelize.TEXT('long'),
        images: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        model: Sequelize.STRING,
        status: Sequelize.STRING,
        subCategoryId : {
            type: Sequelize.INTEGER,
            reference:{
                model: SubCategory,
                key: 'id'
            }
        },
        supplierId : {
            type: Sequelize.INTEGER,
            reference:{
                model: Supplier,
                key: 'id'
            }
        },
        slug: Sequelize.STRING,
    });
    return product;
};