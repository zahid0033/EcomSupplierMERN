const express = require('express');
const querystring = require('querystring');
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "uploads")));

//cors origin
const cors = require("cors");

// const corsOptions = {
//     origin: "http://localhost:3000"
// };
// app.use(cors(corsOptions));
app.use(cors());
//header set
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//db import
const db = require("./models");
//db sync

db.sequelize.sync();
//if import any existing database or after creating new tables
// (async () => {
//     await db.sequelize.sync({ force: true });
//     // Code here
// })();

//Middleware
app.use(express.json());

// import router
const userRouter = require('./routes/user');
const roleRouter = require('./routes/Role/roleRoute');
const adminRouter = require('./routes/Admin/adminRoute');
const mainCategoryRouter = require('./routes/Category/main_categoryRoute');
const subCategoryRouter = require('./routes/Category/sub_categoryRoute');
const productRouter = require('./routes/Product/productRoute');
const supplierRouter = require('./routes/Supplier/supplierRoute');
const employeeRouter = require('./routes/Employee/employeeRoute');
const bannerRouter = require('./routes/Banner/bannerRoute');


//root
app.get('/',(req,res) => {
    const author = {
        name : 'Zahid',
        profession : 'Node js Developer'
    };
    res.send(author);
});

//connect with the router through path
app.use('/users', userRouter); //( just for testing purposes .will delete after finish tehe project.)

app.use('/api/role', roleRouter);
app.use('/api/admin', adminRouter);
app.use('/api/mainCategory', mainCategoryRouter);
app.use('/api/subCategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/banner', bannerRouter);

//not found url
app.get('*',(req,res)=>{
    res.status(404).send("404 page not found");
});

if (process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

//server creation
const port = process.env.PORT || 8000;
//server creation
app.listen(port, ()=> {
    console.log(`server started on port ${port}`);
});