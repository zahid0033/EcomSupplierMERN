module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define('roles',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        role: Sequelize.STRING
    });
    return role;
};