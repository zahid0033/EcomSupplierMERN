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
const {verifyToken,isAdmin}  = require('../middleware/authJwt');

//controller import
const {allUser,addUser,getSingleUser,userLogin} = require ('../controller/userController');


router.post('/login', userLogin );
router.get('/', allUser );
router.post('/add', addUser );
router.get('/:userId', getSingleUser );

module.exports = router;