module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('users',{
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        email: Sequelize.STRING,
        role: Sequelize.STRING,
        password: Sequelize.STRING,
    });
    return user;
};