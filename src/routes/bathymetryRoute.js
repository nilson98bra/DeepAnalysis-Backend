const router = require("express").Router()
const bathymetryController = require("../controllers/bathymetryController")
const authorization = require("../middleware/authorization")
const multer = require("multer")
const configurationMulter = require("../config/multer")

router.post("/cadBathy",authorization,bathymetryController.cadBathy);
router.get("/getBathy/:id",authorization,bathymetryController.getBathy);
router.get("/getAllBathy/:idRoute",authorization,bathymetryController.getAllBathy);
router.post("/uploadImg",authorization,multer(configurationMulter).single("file"), bathymetryController.uploadImg)
router.patch("/finishBathy/:id",authorization, bathymetryController.finishBathy)

module.exports = router