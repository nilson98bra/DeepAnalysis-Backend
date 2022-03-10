const router = require("express").Router()
const userControllers = require("../controllers/userController")


router.post("/checkPhone",userControllers.cadUserPhone);
router.post("/cadUser",userControllers.cadUserEspec);
router.post("/login",userControllers.login);

module.exports = router