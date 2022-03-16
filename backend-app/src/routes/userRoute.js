const router = require("express").Router()
const userControllers = require("../controllers/userController")


router.post("/cadUserPhone",userControllers.cadUserPhone);
router.post("/cadUser",userControllers.cadUserEspec);
router.patch("/generateCode",userControllers.generateVerificationCode)
router.post("/login",userControllers.login);

module.exports = router