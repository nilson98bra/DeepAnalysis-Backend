const router = require("express").Router()
const userControllers = require("../controllers/userController")
const authorization = require("../middleware/authorization")

router.post("/checkEmail",userControllers.cadUserEmail);
router.post("/cadUserEspec",authorization,userControllers.cadUserEspec);
router.post("/login",userControllers.login);

module.exports = router