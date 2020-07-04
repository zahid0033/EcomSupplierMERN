var Supplier = require('./supplier.model');

module.exports = (sequelize, Sequelize) => {
    const employee = sequelize.define('employees',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        phone: Sequelize.STRING,
        image : Sequelize.STRING,
        designation : Sequelize.STRING,
        supplierId:{
            type: Sequelize.INTEGER,
            reference:{
                model: Supplier,
                key: 'id'
            }
        },
        slug : Sequelize.STRING
    });
    return employee;
};