const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../db/config");

const User = sequelize.define(
  "tblUser",
  {
    empId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Disable the default timestamps (createdAt, updatedAt)
  }
);

// Synchronize the model with the database
;(async () => {
  try {
    await sequelize.sync();
    console.log("User table created!");
  } catch (err) {
    console.error("Error synchronizing the database:", err);
  }
})();

module.exports = User;
