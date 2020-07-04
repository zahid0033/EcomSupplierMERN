const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

//table import
const User = require("./user.model");
const Admin = require("./admin.model");
const Role = require("./role.model");
const MainCategory = require("./mainCategory.model");
const SubCategory = require("./subCategory.model");
const Product = require("./product.model");
const Supplier = require("./supplier.model");
const Employee = require("./employee.model");
const Banner = require("./banners.model");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.user = User(sequelize, Sequelize);
db.admin = Admin(sequelize, Sequelize);
db.role = Role(sequelize, Sequelize);
db.mainCategory = MainCategory(sequelize, Sequelize);
db.subCategory = SubCategory(sequelize, Sequelize);
db.product = Product(sequelize, Sequelize);
db.supplier = Supplier(sequelize, Sequelize);
db.employee = Employee(sequelize, Sequelize);
db.banner = Banner(sequelize, Sequelize);

db.admin.belongsTo(db.role);
db.mainCategory.hasMany(db.subCategory,{ foreignKey: 'mainCategoryId' }, {onDelete: 'CASCADE'});
db.subCategory.belongsTo(db.mainCategory);
db.subCategory.hasMany(db.product,{ foreignKey: 'subCategoryId' }, {onDelete: 'CASCADE'});
db.product.belongsTo(db.subCategory);
db.supplier.hasMany(db.product,{ foreignKey: 'supplierId' }, {onDelete: 'CASCADE'});
db.product.belongsTo(db.supplier);
db.supplier.hasMany(db.employee,{ foreignKey: 'supplierId' }, {onDelete: 'CASCADE'});
db.employee.belongsTo(db.supplier);

module.exports = db;