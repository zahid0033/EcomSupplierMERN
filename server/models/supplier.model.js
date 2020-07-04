module.exports = (sequelize, Sequelize) => {
    const supplier = sequelize.define('suppliers',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        description: Sequelize.STRING,
        image: Sequelize.STRING,
        country: Sequelize.STRING,
        businessType: Sequelize.STRING,
        ownership: Sequelize.STRING,
        status: Sequelize.STRING,
        slug: Sequelize.STRING,
    });
    return supplier;
};