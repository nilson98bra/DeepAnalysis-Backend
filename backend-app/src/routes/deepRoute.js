const router = require("express").Router()
const deepController = require("../controllers/deepController")


router.post("/deep",deepController.insertDeep);
router.get("/deep",deepController.selectDeep);


module.exports = router