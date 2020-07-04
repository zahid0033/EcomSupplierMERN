const express = require('express');
const app = express();

const router = express.Router();
//header set
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
//middleware
const {verifyToken,isAdmin}  = require('../../middleware/authJwt');

//controller import
const {allProduct,addProduct,getProduct,editProduct,deleteProduct,uploadFile,mainCategoryProducts,subCategoryProducts,upload} = require ('../../controller/Product/productController');


router.get('/', allProduct );
router.post('/add',upload, addProduct );
router.get('/get/:id', getProduct );
router.post('/update/:id',upload, editProduct );
router.delete('/delete/:id', deleteProduct );

router.get('/mainCategoryProducts/get',mainCategoryProducts);
router.get('/subCategoryProducts/get',subCategoryProducts);

module.exports = router;