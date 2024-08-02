const fs = require("node:fs");
const path = require("node:path");
const csv = require("csv-parser");
const User = require("../models/userModel");
const ObcCandidatesModel = require("../models/ObcCandidateModel");
const OBCVotersModel = require("../models/votersModel"); // OBCVoterModel
const ECCModel = require("../models/ECCModel");
const ECCVotersModel = require("../models/ECCVotersModel");
const { jsonToXlsx } = require("../utils/jsonToXlsx");

const addSingleUser = async (req, res) => {
  try {
    const { voterId, name, email } = req.body;
    console.log(req.body);
    // if userExists
    const user = await User.findOne({
      attributes: ["empId", "email"],
      where: { empId: voterId },
    });

    if (!user) {
      const newUser = await User.create({
        empId: voterId,
        name,
        email,
      });

      console.log("new user: ", newUser.toJSON());
      return res.status(200).send({
        msg: "user created successfully",
        user: newUser.toJSON(),
        status: true,
      });
    }

    if ((user && user.email === email) || user.empId === voterId) {
      return res.status(201).send({
        msg: "user already exsits",
        user: user.toJSON(),
        status: true,
      });
    }
  } catch (err) {
    console.log("error => ", err);
    return res.status(501).send({
      msg: `error while creating user ${err}`,
      user: null,
      status: false,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { voterId } = req.body;

    const user = await User.findOne({
      attributes: ["empId", "email"],
      where: { empId: voterId },
    });

    if (!user) {
      return res.status(200).send({
        msg: "no user found",
      });
    }

    if (user) {
      console.log(user.toJSON());
      return res.status(200).send({
        msg: "user found",
        user: user.toJSON(),
        status: true,
      });
    }
  } catch (error) {
    return res.status(501).send({
      msg: "error while fetching user",
      user: null,
      status: false,
    });
  }
};

/***
 * HANDLE FUNCTIONS FOR OFFICE-BEARER CANDIDATES
 ***/
const uploadUserFormCsv = (req, res) => {
  try {
    console.log(req?.file);
    const results = [];
    const file = req?.file;
    if (!file) {
      if (!file) {
        return res.status(400).send({
          msg: "file is required",
          success: false,
        });
      }
    }
    // Read the CSV file
    const filePath = path.join(__dirname, `../public/uploads/${file.filename}`);
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          // Bulk insert data into the database
          console.log("Data successfully imported!", results);
          const users = await User.bulkCreate(results);
          return res.status(200).send({
            msg: "Data successfully imported!",
            // fileData: file,
            users,
            success: true,
          });
        } catch (error) {
          console.error("Error importing data:", error);
          return res.status(501).send({
            msg: `Error importing data ${error}`,
            success: false,
          });
        }
      });
  } catch (error) {
    console.log("error => ", error);
    return res.status(501).send({
      msg: `error while creating user ${error}`,
      success: false,
    });
  }
};

const addMultiUser = async (req, res) => {
  try {
    const userObj = req.body;
    console.log(userObj);
    if (userObj.length === 0) {
      return res.status(400).send({
        msg: "user data is required",
        status: false,
      });
    }
    const users = await User.bulkCreate(userObj);
    return res.status(200).send({
      msg: "user register sucessfully",
      // users,
      status: true,
    });
  } catch (error) {
    return res.status(501).send({
      msg: `Error while register user data ${error}`,
      status: false,
    });
  }
};

const getRegisterUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "empId", "name", "email", "role"],
    });
    return res.status(200).send({
      msg: "fetching all register user",
      status: true,
      users,
    });
  } catch (error) {
    return res.status(501).send({
      msg: `Error while fetching register user data ${error}`,
      status: false,
    });
  }
};

const deleteRegisterUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const delUser = await User.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send({
      msg: "User deleted successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).send({
      msg: "Problem while deleting user",
      status: false,
    });
  }
};

/* ============================================================================== */
//================================= OBC ==========================================
const addAllCandidates = async (req, res) => {
  console.log(req.body);
  try {
    const candidates = req.body;
    console.log("cand ", candidates);
    // Filter out objects that do not have the 'type' property
    const typeObject = candidates.find((obj) => obj.hasOwnProperty("type"));
    // Get the value of the "type" key
    let type = typeObject ? typeObject.type : undefined;

    // empty fields checking
    if (candidates.length === 0 || !type) {
      return res.status(400).send({
        msg: "all fields are required",
        status: false,
      });
    }
    // insert data into the database
    candidates.forEach(async ({ name }) => {
      let newCandidate;
      if (typeof name !== "undefined") {
        newCandidate = await ObcCandidatesModel.create({
          candidateName: name,
          candidateType: type,
        });
      }
    });
    return res.status(200).send({
      msg: "records inserted",
      president: req.body,
      status: true,
    });
  } catch (error) {
    return res.status(501).send({
      msg: "Error while add obc ",
      error: error.message,
      status: false,
    });
  }
};

const findAllOBC = async (req, res) => {
  try {
    const results = await ObcCandidatesModel.findAll({
      attributes: ["id", "candidateName", "candidateType"],
    });

    // Filter out objects that do not have the 'name' and 'type' properties
    const filteredResults = results.filter((item) => item.candidateName);
    //  console.log(filteredResults);
    return res.status(200).send({
      msg: "OBC candidate records retrieved successfully",
      data: filteredResults,
      status: true,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(501).send({
      msg: `Error retrieving data ${error}`,
      status: false,
    });
  }
};

const addOBCVoteData = async (req, res) => {
  try {
    console.log(req.body);
    // OBC candidate ID
    const {
      President: pr,
      Secretary: sec,
      "Vice President": vp,
      "Secretary Co-ordinator": secCoOrd,
      "Secretary Organization": secOrg,
    } = req.body[0];

    // empty validation
    if (!pr || !sec || !vp || !secCoOrd || !secOrg) {
      return res.status(400).send({
        msg: "Please select all candidate are required",
        status: false,
      });
    }

    // create an annoynomous user
    const annoyUser = req.body[0].annoyUser;

    // new Object for candId
    const votersObj = [
      { candidateId: pr, annoyUserId: annoyUser },
      { candidateId: sec, annoyUserId: annoyUser },
      { candidateId: vp, annoyUserId: annoyUser },
      { candidateId: secCoOrd, annoyUserId: annoyUser },
      { candidateId: secOrg, annoyUserId: annoyUser },
    ];
    const voterRecords = await OBCVotersModel.bulkCreate(votersObj);
    // const voterRecords = [];
    return res.status(200).send({
      msg: "update obc vote data",
      data: voterRecords,
      can: votersObj,
      status: true,
    });
  } catch (err) {
    return res.status(501).send({
      msg: "Error updating obc vote data",
      error: err.message,
      status: false,
    });
  }
};

const obcVoteRecordsToXlsx = async (req, res) => {
  const fileLocation = path.join(__dirname, "../public/obc-excel");
  try {
    // Fetch all voters with their associated candidates
    const voters = await OBCVotersModel.findAll({
      attributes: ["annoyUserId", "candidateId"],
      include: [
        {
          model: ObcCandidatesModel,
          as: "candidates",
          attributes: ["candidateName", "candidateType"],
        },
      ],
    });

    // use json data for excel file
    let header = [
      "President",
      "Secretary",
      "Vice President",
      "Secretary Co-ordinator",
      "Secretary Organization",
    ];

    // use json data for excel file
    const jsonFileData = voters.reduce((acc, curr) => {
      // Find the existing user in the accumulator
      let user = acc.find((u) => u.annoyUserId === curr.annoyUserId);
      if (!user) {
        // If user doesn't exist
        user = { annoyUserId: curr.annoyUserId };
        acc.push(user);
      }
      // Add the candidate information to the user's entry
      user[curr.candidates.candidateType] = curr.candidates.candidateName;
      return acc;
    }, []);

    // console.log("file data as json: ", jsonFileData);
    // console.log(header)

    // write data to excel file
    jsonToXlsx(jsonFileData, header, "obc-voters-info", fileLocation);

    return res.status(200).send({
      msg: "OBC records are added to excel file",
      data: jsonFileData,
      status: true,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(501).send({
      msg: "Error while writing obc .xlsx file ",
      error: error.message,
      data: null,
      status: false,
    });
  }
};

const modifyObcCnd = async (req, res) => {
  console.log(req.body);
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).send({
        msg: "Missing id or name in request body",
        status: false,
      });
    }

    console.log("id:", id, "name:", name);

    const [updateCount] = await ObcCandidatesModel.update(
      { candidateName: name },
      { where: { id } }
    );

    if (updateCount === 0) {
      return res.status(404).send({
        msg: "Candidate not found or not updated",
        status: false,
      });
    }

    return res.status(200).send({
      msg: "OBC candidate updated successfully",
      status: true,
    });
  } catch (err) {
    // console.error("Error while updating OBC candidate:", err);
    return res.status(500).send({
      msg: "Error while updating OBC candidate",
      error: err.message,
      status: false,
    });
  }
};

const deleteObcCnd = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await ObcCandidatesModel.destroy({
      where: { id },
    });
    console.log(candidate);
    return res.status(200).send({
      msg: "obc candidate deleted successfully",
      status: true,
    });
  } catch (err) {
    return res.status(501).send({
      msg: "Error while deleting obc candidate",
      error: err.message,
      status: false,
    });
  }
};

/*=========================================
        TESTING   ==============================================*/
const getVoterCandaidateRecords = async (req, res) => {
  // const candidates = await ObcCandidatesModel.findAll({
  //   include: [
  //     {
  //       model: OBCVotersModel,
  //       // as: "voters",
  //     },
  //   ],
  // })
  // console.log("candidates => ", candidates)

  // Fetch all voters with their associated candidates
  // const voters = await OBCVotersModel.findAll({
  //   attributes: ["annoyUserId", "candidateWeight"],
  //   include: [
  //     {
  //       model: ObcCandidatesModel,
  //       as: "candidates",
  //       attributes: ["candidateName", "candidateType"],
  //     },
  //   ],
  // });
  const voters = await OBCVotersModel.findAll({
    attributes: ["annoyUserId", "candidateId"],
    include: [
      {
        model: ObcCandidatesModel,
        as: "candidates",
        attributes: ["candidateName", "candidateType"],
      },
    ],
  });
  let v = voters;
  let obj = {};
  // use json data for excel file
  const transformed = voters.reduce((acc, curr) => {
    // Find the existing user in the accumulator
    let user = acc.find((u) => u.annoyUserId === curr.annoyUserId);
    if (!user) {
      // If user doesn't exist, create a new entry and push it to the accumulator
      user = { annoyUserId: curr.annoyUserId };
      acc.push(user);
    }
    // Add the candidate information to the user's entry
    user[curr.candidates.candidateType] = curr.candidates.candidateName;
    return acc;
  }, []);

  console.log("tt => ", transformed);

  /*
  voters.forEach((elem, i) => {
    const { candidateName, candidateType } =
      elem.dataValues.candidates.dataValues;
    // console.log(candidateType, candidateName);
    obj[candidateType] = candidateName;
  });
  console.log("obj =>", obj);
  */
  res.status(200).send({
    msg: "voters and candidates records",
    voters,
  });
};

/*===============================================================================================*/
/*
 * HANDLE ECC FUNCTIONS
 * @description: This function is used to write data to excel file
 * @param {Array} data
 * @param {Array} header
 * @param {String} fileName
 * @param {String} fileLocation
 */

const eccCandidatePost = async (req, res) => {
  try {
    const { candidates } = req.body;
    console.log(candidates);
    console.log(candidates, candidates.length);
    // Filter out objects that do not have the 'type' property
    const typeObject = candidates.find((obj) => obj.hasOwnProperty("name"));
    // empty fields checking
    if (candidates.length === 0 || typeObject.name === "") {
      return res.status(500).send({
        msg: "Executive candidates requires",
        status: false,
      });
    }
    const flattenedData = candidates.map((item) => {
      return {
        candidateName: item.name,
        candidateType: "Executive",
      };
    });
    console.log(flattenedData);
    // insert data into the database
    const candidateData = await ECCModel.bulkCreate(flattenedData);

    return res.status(200).send({
      msg: "records inserted",
      ECC: candidateData,
      success: true,
    });
  } catch (error) {
    return res.status(501).send({
      msg: "Error while submitting ECC records",
      error: error.message,
      status: false,
    });
  }
};

const getAllECC = async (req, res) => {
  try {
    const results = await ECCModel.findAll({});
    return res.status(200).send({
      msg: "Data retrieved successfully",
      data: results,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(501).send({
      msg: `Error retrieving data ${error}`,
      success: false,
    });
  }
};

const addECCVoteInfo = async (req, res) => {
  const { eccVoteInfo } = req.body;
  console.log("ecc = ", eccVoteInfo);
  try {
    const [eccIdVal, eccVoteWeight] = eccVoteInfo;

    const annoyUser = "";
    const newEccVoterObj = Object.keys(eccIdVal).map((key) => ({
      annoyUserId: annoyUser,
      candidateId: eccIdVal[key],
      candidateWeight: eccVoteWeight[key],
    }));

    // const resul t = await ECCVotersModel.bulkCreate(newEccVoterObj);
    const result = [];
    return res.status(200).send({
      msg: "Your Executive Candidate Vote has been submitted",
      data: result,
      newEccVoterObj,
      status: true,
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Error while add executive voting data",
      error: err.message,
      status: false,
    });
  }
};

const eccVoteDataToXlsx = async (req, res) => {
  try {
    const fileLocation = path.join(__dirname, "../public/ecc-excel");

    // FETCH ALL ECC CANDIDATES
    const candidates = await ECCModel.findAll({
      attributes: ["candidateName"],
    });

    // get all candidates name for set workbook headers column
    const headerCndData = candidates.map((cnd) => {
      return cnd.candidateName;
    });

    // Fetch all voters with their associated candidates
    const voters = await ECCVotersModel.findAll({
      attributes: ["annoyUserId", "candidateWeight", "candidateId"],
      include: [
        {
          model: ECCModel,
          as: "EccCandidates",
          attributes: ["candidateName", "candidateType"],
        },
      ],
    });

    // use json data for excel file
    const transformed = voters.reduce((acc, voter) => {
      const {
        annoyUserId,
        candidateWeight,
        EccCandidates: { candidateName },
      } = voter;
      if (!acc[annoyUserId]) {
        acc[annoyUserId] = { annoyUserId };
        candidates.forEach((candidate) => {
          acc[annoyUserId][candidate.candidateName] = "0";
        });
      }
      acc[annoyUserId][candidateName] = candidateWeight;
      return acc;
    }, {});

    const jsonFileData = Object.values(transformed);
    console.log("jsonFileData => ", jsonFileData);
    console.log("tt data => ", transformed);

    const header = ["annoyUserId", ...headerCndData];

    // write data to excel file
    jsonToXlsx(jsonFileData, header, "ecc-voters-info", fileLocation);

    return res.status(200).send({
      msg: "ECC records are added to excel file",
      // candidates,
      // voters,
    });
  } catch (err) {
    return res.status(500).send({
      msg: "Error while adding executive voting data to excel file",
      error: err.message,
      status: false,
    });
  }
};

module.exports = {
  addSingleUser,
  getUser,
  uploadUserFormCsv,
  addMultiUser,
  getRegisterUsers,
  deleteRegisterUser,
  addAllCandidates,
  findAllOBC,
  addOBCVoteData,
  obcVoteRecordsToXlsx,
  modifyObcCnd,
  deleteObcCnd,
  getVoterCandaidateRecords,
  eccCandidatePost,
  getAllECC,
  addECCVoteInfo,
  eccVoteDataToXlsx,
};
