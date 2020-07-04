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
const {allBanner,addBanner,getBanner,editBanner,deleteBanner,upload} = require ('../../controller/Banner/bannerController');


router.get('/', allBanner );
router.post('/add',upload, addBanner );
router.get('/get/:id', getBanner );
router.post('/update/:id',upload,editBanner );
router.delete('/delete/:id', deleteBanner );

module.exports = router;