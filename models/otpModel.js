const { DataTypes, Sequelize, Model } = require("sequelize");
const { sequelize } = require("../db/config");
const userModel = require("./userModel");
const OTP = sequelize.define(
  "OTP",
  {
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "tblOTP",
    timestamps: false,
  }
);
// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("OTP table is created");
  } catch (err) {
    console.error("Error synchronizing the OTP table:", err);
  }
})();

// Define the relationship between OTP and User
userModel.hasOne(OTP, { foreignKey: "userId", as: "otp", onDelete: "CASCADE" });
OTP.belongsTo(userModel, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});
module.exports = OTP;
