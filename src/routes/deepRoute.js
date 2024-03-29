const router = require("express").Router()
const deepController = require("../controllers/deepController")
const authorization = require("../middleware/authorization")

router.post("/cadDeep",authorization,deepController.insertDeep);
router.get("/getDeeps/:idBathy",authorization,deepController.selectDeeps);


module.exports = router