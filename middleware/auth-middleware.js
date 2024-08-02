const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // console.log("header = ", req.header("Authorization"));

    const token = req.header("Authorization").replace("Bearer ", "");
    // if no token
    if (!token || token === undefined) {
      return res
        .status(401)
        .send({ msg: "Access denied. No token provided.", status: false });
    }
    // verify token
    try {
      const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
      const userData = await User.findOne({ 
        attributes: { exclude: ["id", "updatedAt"] }, 
        where: { empId: decodeUser.voterId }
      });
      req.user = userData.toJSON();
      req.token = token;
    } catch (err) {
      return res.status(400).send({ msg: "Your login credential is expired.Please login again" });
    }
    next();
  } catch (err) {
    return res.status(401).send({
      msg: "Error while verifying the token !!",
      error: err.message,
      status: false,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(404).send({
        msg: "You are not authorized to access this resource !! Only admin can access",
        status: false,
      });
    }
    next();
  } catch (err) {
    return res.status(401).send({
      msg: "Error while verifying the token !!",
      error: err.message,
      status: false,
    });
  }
};

exports.isUser = (req, res, next) => {
  try {
    if (req.user.role !== "user") {
      return res.status(404).send({
        msg: "You are not authorized to access this resource",
        status: false,
      });
    }
    next();
  } catch (err) {
    return res.status(401).send({
      msg: "Error while verifying the token !!",
      error: err.message,
      status: false,
    });
  }
};
