const router = require("express").Router()
const routeControllers = require("../controllers/routeController")
const authorization = require("../middleware/authorization")


router.post("/cadRoute",routeControllers.cadRoute);
router.get("/getRoute",routeControllers.getRoute);
router.get("/getAllRoutes",routeControllers.getAllRoutes);
module.exports = router