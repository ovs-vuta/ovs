const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../db/config");

const Candidates = sequelize.define(
  "tblObcCandidate",
  {
    candidateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    candidateType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);


// Synchronize the model with the database
;(async () => {
  try {
    await sequelize.sync();
    console.log("obc Candidates table is created");
  } catch (err) {
    console.error("Error synchronizing the Candidates table:", err);
  }
})();

module.exports = Candidates;
