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
const {allCategory,addCategory,getCategory,editCategory,deleteCategory} = require ('../../controller/Category/sub_categoryController');


router.get('/', allCategory );
router.post('/add', addCategory );
router.get('/get/:id', getCategory );
router.post('/update/:id', editCategory );
router.delete('/delete/:id', deleteCategory );

module.exports = router;