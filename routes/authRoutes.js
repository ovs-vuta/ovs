// create express routes
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { auth, isAdmin, isUser } = require("../middleware/auth-middleware");

// auth routes
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOtp);

// protected route
router.get("/admin", (req, res) => {
  req.send("this is protected route...");
});

router.get("/getUser", auth, (req, res) => {
  const userData = req.user;
  userData.token = req.token;
  return res.status(200).send({
    msg: "testing page for user ...",
    data: userData,
  });
});

module.exports = router;
