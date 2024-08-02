const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const upload = require("../middleware/multer");
const { auth } = require("../middleware/auth-middleware");

// admin handler routes, admin it's self an user ...
router.post("/single-user", userController.addSingleUser);
router.post("/upload-users", upload.single('file'),userController.uploadUserFormCsv)
router.post("/add-users",userController.addMultiUser)
router.get("/getRegUsers", userController.getRegisterUsers);
router.delete("/deleteRegUser/:id", userController.deleteRegisterUser);
router.get("/user", auth,userController.getUser);

// OBC router
router.post("/add-all-candidates", userController.addAllCandidates);
router.get("/all-candidates", userController.findAllOBC);
router.post("/add-obc-vote", userController.addOBCVoteData);
router.get("/obcXlsx-converter",userController.obcVoteRecordsToXlsx)
router.put("/modifyObcCnd", userController.modifyObcCnd);
router.delete("/deleteObcCnd/:id", userController.deleteObcCnd);

// testing routes
router.get("/voters-candidates",userController.getVoterCandaidateRecords);


// ECC router
router.post("/ecc-add-candidates",userController.eccCandidatePost);
router.get("/get-ECC", userController.getAllECC);
router.post("/add-ecc-vote", userController.addECCVoteInfo);
router.get("/ecc-excel-converter", userController.eccVoteDataToXlsx);

// export object 
module.exports = router
