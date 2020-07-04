var MainCategory = require('./mainCategory.model');
module.exports = (sequelize, Sequelize) => {
    const subCategory = sequelize.define('subCategories',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name : Sequelize.STRING,
        status : Sequelize.STRING,
        mainCategoryId:{
            type: Sequelize.INTEGER,
            reference:{
                model: MainCategory,
                key: 'id'
            }
        },
        slug : Sequelize.STRING
    });
    return subCategory;
};