module.exports = (sequelize, Sequelize) => {
    const mainCategory = sequelize.define('mainCategories',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name: Sequelize.STRING,
        image: Sequelize.STRING,
        icon: Sequelize.STRING,
        status: Sequelize.STRING,
        slug: Sequelize.STRING,
    });
    return mainCategory;
};