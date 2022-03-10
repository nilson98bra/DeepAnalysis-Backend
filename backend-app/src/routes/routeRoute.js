const router = require("express").Router()
const userControllers = require("../controllers/userController")


router.post("/cadRoute",userControllers.cadUserPhone);
router.post("/login",userControllers.login);

module.exports = router