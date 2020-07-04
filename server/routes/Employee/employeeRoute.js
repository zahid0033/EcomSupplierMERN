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
const {verifyToken,isAdmin,isSupplier}  = require('../../middleware/authJwt');

//controller import
const {allEmployee,addEmployee,getEmployee,editEmployee,deleteEmployee,upload} = require ('../../controller/Employee/employeeController');


router.get('/', allEmployee );
router.post('/add',[verifyToken,isSupplier],upload, addEmployee );
router.get('/get/:id', getEmployee );
router.post('/update/:id',[verifyToken,isSupplier], upload, editEmployee );
router.delete('/delete/:id', deleteEmployee );

module.exports = router;