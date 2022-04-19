const router = require("express").Router()
const userControllers = require("../controllers/userController")
const authorization = require("../middleware/authorization")

router.post("/cadEmail",userControllers.cadUserEmail);
router.post("/sendVerifCode",userControllers.sendEmail)
router.post("/verifyCode",userControllers.verifyCode);
router.post("/login",userControllers.login);
router.post("/auth/refreshToken",userControllers.refreshToken)
router.patch("/nameAndPhone",authorization,userControllers.updateNameAndPhone)
router.patch("/cadUserEspec",authorization,userControllers.cadUserEspec);
module.exports = router