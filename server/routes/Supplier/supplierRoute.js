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
const {verifyToken,isSuperAdmin,isSupplier}  = require('../../middleware/authJwt');

//controller import
const {allSupplier,addSupplier,getSupplier,editSupplier,deleteSupplier,signUp,verifyEmail,sendVerificationToken,signin,searchSupplier,statusUpdate,forgetPassword,resetSupplierPassword,updatePasswordViaEmail,upload} = require ('../../controller/Supplier/supplierController');


router.post('/signin', signin );
router.post('/forgetPassword', forgetPassword );
router.get('/resetSupplierPassword/:token', resetSupplierPassword );
router.post('/updatePasswordViaEmail', updatePasswordViaEmail );
router.post('/signup', signUp );
router.get('/verifyEmail/:token', verifyEmail );
router.post('/sendVerificationToken', sendVerificationToken );
router.get('/', allSupplier );
router.post('/add', addSupplier );
router.get('/get/:id', getSupplier );
router.post('/update/:id', upload, editSupplier );
router.post('/statusUpdate',[verifyToken,isSuperAdmin], statusUpdate );
router.delete('/delete/:id', deleteSupplier );
router.get('/searchSupplier/:searchText', searchSupplier );

module.exports = router;