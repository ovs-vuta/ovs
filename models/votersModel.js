const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../db/config");
const OBCCandidates = require("./ObcCandidateModel");
// Define the Voter model
const Voters = sequelize.define(
  "tblObcVoterInfo",
  {
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    annoyUserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // candidateWeight: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "tblObcVoterInfo",
    timestamps: false,
  }
);

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Voters table created!");
  } catch (err) {
    console.error("Error synchronizing the database:", err);
  }
})();

// Define the association between Candidate and Voter
OBCCandidates.hasMany(Voters, {
  foreignKey: "candidateId",
  as: "voters",
  onDelete: "CASCADE",
});

Voters.belongsTo(OBCCandidates, {
  foreignKey: "candidateId",
  as: "candidates",
  onDelete: "CASCADE",
});

module.exports = Voters;
