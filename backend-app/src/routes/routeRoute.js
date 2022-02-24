const router = require("express").Router()
const userControllers = require("../controllers/userController")


router.post("/cadPhone",userControllers.cadUserPhone);
router.post("/cadEspc",userControllers.cadUserEspec);
router.post("/login",userControllers.login);

module.exports = router