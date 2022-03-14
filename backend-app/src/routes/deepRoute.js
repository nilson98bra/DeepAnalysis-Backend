const router = require("express").Router()
const deepController = require("../controllers/deepController")


router.post("/CadDeep",deepController.insertDeep);
router.get("/getDeeps",deepController.selectDeeps);


module.exports = router