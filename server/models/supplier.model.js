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
        email: {
            type : Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
        description: Sequelize.STRING,
        image: Sequelize.STRING,
        country: Sequelize.STRING,
        businessType: Sequelize.STRING,
        ownership: Sequelize.STRING,
        status: Sequelize.STRING,
        verifyEmailToken: Sequelize.STRING,
        mailTokenExpires: Sequelize.DATE,
        mailVerifyStatus: Sequelize.STRING,
        resetPasswordToken: Sequelize.STRING,
        resetPasswordExpires: Sequelize.DATE,
        slug: Sequelize.STRING,
    });
    return supplier;
};