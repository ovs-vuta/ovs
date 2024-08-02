const { DataTypes, Sequelize, Model } = require("sequelize");
const { sequelize } = require("../db/config");

// Define the ECC model
const ECC = sequelize.define(
  "tblExecutiveCandidates",
  {
    candidateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    candidateType: {
      type: DataTypes.STRING,
      defaultValue:"Executive",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
  }
);
// Synchronize the model with the database
;(async () => {
  try {
    await sequelize.sync();
    console.log("ECC table is created");
  } catch (err) {
    console.error("Error synchronizing the ECC table:", err);
  }
})();

module.exports = ECC;