const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../db/config");
const ECC = require("./ECCModel");

const ECCVoters = sequelize.define(
  "tblECCVoteInfo",
  {
    annoyUserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    candidateWeight: {
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
    console.log("ECCVoters table is created");
  } catch (err) {
    console.error("Error synchronizing the ECCVoters table:", err);
  }
})();

// Define the association between Candidate and Voter
ECC.hasMany(ECCVoters, {
  foreignKey: 'candidateId',
  as:"EccVoters",
  onDelete: 'CASCADE'
});

ECCVoters.belongsTo(ECC, {
  foreignKey: 'candidateId',
  as:"EccCandidates",
  onDelete: 'CASCADE'
});


module.exports = ECCVoters