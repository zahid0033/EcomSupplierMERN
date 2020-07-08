module.exports = (sequelize, Sequelize) => {
    const advertise = sequelize.define('advertise',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        position: Sequelize.STRING,
        image: Sequelize.STRING
    });
    return advertise;
};