const router = require("express").Router()
const deepController = require("../controllers/deepController")
const authorization = require("../middleware/authorization")

router.post("/CadDeep",authorization,deepController.insertDeep);
router.get("/getDeeps",authorization,deepController.selectDeeps);


module.exports = router