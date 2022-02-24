const router = require("express").Router()
const deepController = require("../controllers/deepController")


router.post("/deep",deepController.insertDeep);
router.get("/cadCaracteriticas",deepController.selectDeep);


module.exports = router