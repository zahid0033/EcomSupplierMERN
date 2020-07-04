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
const {allRole,addRole,deleteRole} = require ('../../controller/Role/roleController');


router.get('/', allRole );
router.post('/add', addRole );
router.delete('/delete/:id', deleteRole );

module.exports = router;