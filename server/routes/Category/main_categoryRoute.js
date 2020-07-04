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
const {allCategory,addCategory,getCategory,editCategory,deleteCategory,upload} = require ('../../controller/Category/main_categoryController');


router.get('/', allCategory );
router.post('/add',upload, addCategory );
router.get('/get/:id', getCategory );
router.post('/update/:id', editCategory );
router.delete('/delete/:id', deleteCategory );

module.exports = router;