var Role = require('./role.model');
module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define('admins',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
        status : Sequelize.STRING,
        image : Sequelize.STRING,
        address : Sequelize.STRING,
        phone : Sequelize.STRING,
        roleId:{
            type: Sequelize.INTEGER,
            reference:{
                model: Role,
                key: 'id'
            }
        },
        slug : Sequelize.STRING
    });
    return admin;
};