import React, { useEffect, useState } from "react";
import ECCVoterCard from "../components/serviceCards/ECCVoterCard";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";
import { FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getEccVote, setEccVote } from "../utils/voteState";
import { useSelector } from "react-redux";

const API = import.meta.env.VITE_API_URL;

function ECCVoterPage() {
  const [cndMode, setCndMode] = useState(false);
  // const [voteMode, setvoteMode] = useState("");
  const [voteCount, setVoteCount] = useState({ OBC: false, ECC: false });
  const navigate = useNavigate();
  const { newUserId } = useSelector((state) => state.auth);

  // state for ECC
  const [eccData, setEccData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [eccCanId, setEccCanId] = useState([{}]);
  const [eccWeight, setEccWeight] = useState([{}]);
  const [eccCounter, setEccCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // handle ECC fetch functions at first time
  const hadleFetchEcc = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API}/users/get-ECC`);
      if (response.ok) {
        const resData = await response.json();
        // console.log(resData);
        setEccData(resData.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log("error while fetching ECC data ", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hadleFetchEcc();
  }, []);

  // handle dynamic state object creation
  useEffect(() => {
    const handleRecordsChange = () => {
      const newState = {};
      eccData.forEach((record, index) => {
        newState[`candidate_${index + 1}`] = ""; // initialize with zero string
      });
      setEccWeight([newState]);
      setEccCanId([newState]);
    };
    handleRecordsChange();
  }, [eccData]);

  // ECC input weight handler
  const handleWeightChange = (e) => {
    const { value, name } = e.target;
    if (value !== "" && value >= 0 && value <= 8) {
      const existingWeights = Object.values(eccWeight[0]);
      if (existingWeights.includes(value)) {
        // Weight value already exists, display error and reset input field
        toast.error("Error: Duplicate weight value", {
          autoClose: 1500,
        });
        e.target.value = "";
        // setEccCounter((prev) => (prev >= 0 ? prev - 1 : 0));
        return;
      }
      setEccWeight([{ ...eccWeight[0], [name]: value }]);
      //   setEccCounter((prev) => prev + 1);
    } else if (value > 8) {
      setEccWeight([{ ...eccWeight[0], [name]: "" }]);
      toast.error("weight must be between 1 to 8", {
        autoClose: 2500,
      });
      //   setEccCounter((prev) => (prev >= 0 ? prev - 1 : 0));
    }
  };

  // handle ECC candidate selection
  const handleOnCndSelect = (e, cndId, index) => {
    const { checked, value } = e.target;
    if (!checked) {
      setEccCanId([{ ...eccCanId[0], [`candidate_${index + 1}`]: "" }]);
      setEccCounter((prev) => (prev >= 0 ? prev - 1 : 0));
    } else {
      setEccCanId([{ ...eccCanId[0], [`candidate_${index + 1}`]: cndId }]);
      setEccCounter((prev) => prev + 1);
    }
  };

  // select row if properties are set
  const keys = Object?.keys(eccWeight[0]);

  // ECC row selection
  const handleTdOnClick = (e, index) => {
    const { id, children } = e.target?.parentElement?.parentNode;

    // console.log(keys.includes(e.target.name), e.target.name);
    let wval = eccWeight[0][`candidate_${index + 1}`];

    if (
      keys.includes(e.target.name) &&
      e.target.value !== "" &&
      eccCounter !== 8 &&
      wval !== ""
    ) {
      setEccCanId([{ ...eccCanId[0], [`candidate_${index + 1}`]: id }]);
      e.target.style.border = "1px solid green";
      // children[3].firstChild.firstChild.checked = true;
      // e.target.disabled = true;
    } else {
      // children[3].firstChild.firstChild.checked = false;
      // e.target.disabled = false;
      e.target.style.border = "1px solid red";
      setEccWeight([{ ...eccWeight[0], [`candidate_${index + 1}`]: "" }]);
      setEccCanId([{ ...eccCanId[0], [`candidate_${index + 1}`]: "" }]);
    }
  };

  // handle ECC submission
  const handleEccSubmit = async (e) => {
    e.preventDefault();
    // Check if any eccWeight field is empty and the corresponding candidate is selected
    const weights = Object.values(eccWeight[0]);
    const candidates = Object.values(eccCanId[0]);

    const emptyWeightCandidates = [];
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i] !== "" && weights[i] === "") {
        emptyWeightCandidates.push(`Candidate ${i + 1}`);
      }
    }

    if (emptyWeightCandidates.length > 0) {
      toast.error(
        `Please fill weights for: ${emptyWeightCandidates.join(", ")}`,
        {
          autoClose: 2500,
        }
      );
      setDisabled(false);
      return;
    }

    try {
      if (eccCounter !== 8) {
        toast.error("Please select exactly 8 candidates");
        return;
      }

      const newEccVoteInfo = [...eccCanId, ...eccWeight];
      // Non-empty filter data
      const result = newEccVoteInfo.map((obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([key, value]) => value !== "")
        )
      );
      result.push({ newUser: newUserId });
      console.log(result);

      const response = await fetch(`${API}/users/add-ecc-vote`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          eccVoteInfo: result,
        }),
      });

      const responseData = await response.json();

      if (response.ok || response.status === 200) {
        setVoteCount({ ...voteCount, ECC: true });
        toast.success(responseData.msg);
        // setEccVote({ ECC: true });
        // navigate("/vote");
      } else {
        toast.error(responseData.msg);
      }

      console.log(response, responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // onece vote submitted, voter never visit again
  const eccVoteCount = getEccVote();
  if (eccVoteCount?.ECC) {
    navigate("/vote");
  }
  // lazy loading time
  if (loading) {
    return <Spinner />;
  }
  // error when data fetching failed
  if (error) {
    return <div>Something Went Wrong ...</div>;
  }
  // after final submission vote details can't be changed
  const handleLockBtn = (e) => {
    e.target.style.display = "none";
    setDisabled(true);
  };

  return (
    <div className="hero_cndlist">
      <div className="container">
        {/* ECC lists */}
        {/* {!cndMode && ( "Contents" )} */}
        <div className="bg-body-secondary p-2 my-3 rounded-1 shadow hero-obc-main h-50">
          <div
            className="hero-ecc-header py-3 bg-body-tertiary px-2"
            style={{ position: "sticky", top: "0", zIndex: "222" }}>
            <h3 className="text-center fw-small">
              Vote For Executive Candidates {eccCounter}
            </h3>
            <hr className="m-0 p-0 my-2" />
          </div>
          <div className="d-flex gap-2 justify-content-evenly flex-wrap vote-cnd-container">
            {!loading &&
              eccData.length > 0 &&
              eccData.map((cnd, idx) => (
                <ECCVoterCard
                  key={cnd.candidateName}
                  candidate={cnd}
                  index={idx}
                  handleWeightChange={handleWeightChange}
                  handleOnCndSelect={handleOnCndSelect}
                  handleTdOnClick={handleTdOnClick}
                  eccCounter={eccCounter}
                  disabled={disabled}
                  eccWeight={eccWeight}
                />
              ))}
          </div>
          {eccCounter > 8 ? (toast.warn("max candidate selected")) : (
            <>
              <div>
                {eccCounter === 8 && (
                  <div className="voter-submission-btn d-flex justify-content-center py-2 mt-md-2">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={(e) => handleLockBtn(e)}>
                      {disabled ? ( <> "Locked" <FiLock /> </>) : ( "Lock Your Vote" )}
                    </button>
                  </div>
                )}

                {disabled && (
                  <div className="voter-submission-btn d-flex justify-content-center py-2 mt-md-2">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      //   onClick={(e) => setCndMode(true)}
                      onClick={(e) => handleEccSubmit(e)}>
                      Submit Vote
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div> {/*.hero-ecc-main end here */}
      </div> {/* container end here */}
    </div>
  );
}

export default ECCVoterPage;
