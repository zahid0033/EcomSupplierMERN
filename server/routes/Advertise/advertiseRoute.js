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
const {allAdvertise,addAdvertise,getAdvertise,editAdvertise,deleteAdvertise,upload} = require ('../../controller/Advertise/advertiseController');


router.get('/', allAdvertise );
router.post('/add',upload, addAdvertise );
router.get('/get/:id', getAdvertise );
router.post('/update/:id',upload,editAdvertise );
router.delete('/delete/:id', deleteAdvertise );

module.exports = router;