const router = require("express").Router()
const routeControllers = require("../controllers/routeController")


router.post("/cadRoute",routeControllers.cadRoute);
router.get("/getRoute",routeControllers.getRoute);

module.exports = router