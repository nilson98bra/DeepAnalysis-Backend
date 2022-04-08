const router = require("express").Router()
const userControllers = require("../controllers/userController")
const authorization = require("../middleware/authorization")

router.post("/cadEmail",userControllers.cadUserEmail);
router.post("/cadUserEspec",authorization,userControllers.cadUserEspec);
router.post("/sendEmail",userControllers.sendEmail)
router.post("/verifyCode",userControllers.verifyCode);
router.post("/login",userControllers.login);

module.exports = router