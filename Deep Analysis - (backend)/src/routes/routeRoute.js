const router = require("express").Router()
const routeControllers = require("../controllers/routeController")
const authorization = require("../middleware/authorization")


router.post("/cadRoute",authorization,routeControllers.cadRoute);
router.get("/getRoute/:_id",authorization,routeControllers.getRoute);
router.get("/getAllRoutes",authorization,routeControllers.getAllRoutes);
module.exports = router