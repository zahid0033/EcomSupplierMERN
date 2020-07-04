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
const {verifyToken,isSuperAdmin}  = require('../../middleware/authJwt');

//controller import
const {allAdmin,addAdmin,editAdmin,getAdmin,deleteAdmin,signin,upload} = require ('../../controller/Admin/adminController');


router.post('/signin', signin );
router.get('/', allAdmin );
router.post('/add',[verifyToken,isSuperAdmin],upload, addAdmin );
router.get('/get/:id', getAdmin );
router.post('/update/:id',[verifyToken,isSuperAdmin],upload,editAdmin );
router.delete('/delete/:id', deleteAdmin );

module.exports = router;