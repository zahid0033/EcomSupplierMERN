module.exports = (sequelize, Sequelize) => {
    const banner = sequelize.define('banners',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        text: Sequelize.STRING,
        image: Sequelize.STRING
    });
    return banner;
};