const User = require("../models/userModel");
const OTPModel = require("../models/otpModel");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../utils/generateOtp.js");
const { sendMailOTP } = require("../utils/sendMail.js");
const crypto = require("crypto");

const login = async (req, res) => {
  console.log("login body : ", req.body);
  try {
    // get user voterId & otp
    const [{ voterId }] = req.body;
    if (!voterId) {
      return res.status(403).send({
        msg: "VoterID must be filled!!",
        status: false,
      });
    }
    // find user
    const user = await User.findOne({ where: { empId: voterId } });
    if (!user) {
      return res.status(404).send({
        msg: "Invalid User Details",
        status: false,
      });
    }

    // if the user exists
    if (user) {
      //generate OTP
      const otp = generateOTP();
      const newUserOtpObj = [
        {
          otp: otp,
          userId: user.id,
        },
      ];
      // save OTP to OTP-model
      await OTPModel.bulkCreate(newUserOtpObj);
      // send otp via email
      await sendMailOTP(user.email, otp);
      return res.status(200).send({
        msg: "send otp successfully",
        status: true,
      });
    }
  } catch (err) {
    return res.status(500).send({
      msg: "Error while user login!!",
      status: false,
    });
  }
};

const verifyOtp = async (req, res) => {
  console.log("otp body", req.body);
  try {
    const [{ voterId, otp }] = req.body;

    // fetch user
    let userOtp = await OTPModel.findOne({
      attributes: ["otp", "createdAt", "userId"],
      where: {
        otp: otp,
      },
    });

    // valid otp or not
    if (!userOtp) {
      return res.status(404).send({ msg: "Invalid OTP", status: false });
    }
    // get conver to actual user data
    userOtp = userOtp.toJSON();
    console.log("userOtp = ", userOtp);

    // valid upto 5min
    const now = new Date();
    const newDate = new Date(userOtp.createdAt).getTime();
    const otpValid = now - newDate < 5 * 60 * 1000;

    // otp expires time
    if (!otpValid) {
      console.log("expire otp");
      return res.status(501).send({ msg: "OTP expired", status: false });
    }

    const user = await User.findOne({
      attributes: ["id", "empId", "name", "email", "role"],
      where: {
        id: userOtp?.userId,
      },
    });

    // check user is valid or not
    if (!user) {
      return res.status(401).send({ msg: "User not found", status: false });
    }
    const userObj = user.toJSON();
    console.log("user = ", userObj);

    // create fake user and store in cookie
    const annoyUser = "User-" + crypto.randomUUID();

    // generates token
    const payload = {
      userId: userObj.id,
      voterId: userObj.empId,
      email: userObj.email,
      role: userObj.role,
      newUserId: annoyUser,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("gen token when otp verify : ", token);

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1day  // 60*60*1000 => 1hr
      httpOnly: true,
      // secure: true,
    };

    // setup user in cookies
    res.cookie("user", annoyUser, options);

    // setup token in cookies
    res.cookie("token", token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
      // secure: true,
    });

    return res.status(200).send({
      msg: "Verification completed",
      newUserId: annoyUser,
      token: token,
      status: true,
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Something went wrong, can't verify OTP",
      error: err.message,
      status: false,
    });
  }
};

module.exports = {
  login,
  verifyOtp,
};
