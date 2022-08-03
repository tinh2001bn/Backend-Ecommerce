const express = require("express");
const router = express.Router();
const {
register,getUser,update,Login,profile,getUserByStats
} = require("../controller/userControllers");
router.get('/stats',getUserByStats)
router.post('/login', Login)
router.post("/",register)
router.put('/:id',update)
router.get('/:id',profile)
router.get('/',getUser)
module.exports = router;
