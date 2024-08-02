import React, { useState } from "react";
import VoterCard from "../components/serviceCards/VoterCard";
import { groupedCndData } from "../services/CandidatesService";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";
import {
  useGetAllObcCndQuery,
  useAddObcVoteMutation,
} from "../store/slice/obcCndSlice";
import { useSelector } from "react-redux";
import { getObcVote, setObcVote } from "../utils/voteState";
import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_URL;

function OBCVoterPage() {
  const { isError, isLoading, data } = useGetAllObcCndQuery();
  const [addObcVote] = useAddObcVoteMutation();
  const { newUserId } = useSelector((state) => state.auth);
  // OBC state
  const [bearerId, setBearerId] = useState([
    {
      President: "",
      Secretary: "",
      ["Vice President"]: "",
      ["Secretary Co-ordinator"]: "",
      ["Secretary Organization"]: "",
    },
  ]);

  const [selected, setSelected] = useState([
    {
      President: "",
      Secretary: "",
      ["Vice President"]: "",
      ["Secretary Co-ordinator"]: "",
      ["Secretary Organization"]: "",
    },
  ]);

  const navigate = useNavigate();

  // handle OBC submit
  const handleOnObcSubmit = async (e) => {
    e.preventDefault();
    console.log("obc vote");
    try {
      // add empty validation check for bearerId
      if (Object.values(bearerId[0]).some((x) => x === "")) {
        toast.error("Please select all candidates");
        return;
      }
      const newObj = [...bearerId];
      newObj[0].annoyUser = newUserId;
      // console.log(newObj);
      const payload = await addObcVote(newObj);

      console.log("payload = ",payload.data);
      if (payload.data.status) {
        toast.success("Vote Submitted Successfully");
        setObcVote({ OBC: true });
        navigate("/vote");
      }
    } catch (error) {}
  };

  // hnadle OBC selection Check
  const handleOnCndVote = (e, candType, candId) => {
    const { name, checked } = e.target;
    // handle for checkbox is checked
    if (checked && !selected[0][candType]) {
      setSelected([{ ...selected[0], [candType]: name }]);
      setBearerId([{ ...bearerId[0], [candType]: candId }]);
    }
    // handle for unchecked checkbox
    if (selected[0][candType] && !checked) {
      setSelected([{ ...selected[0], [candType]: "" }]);
      setBearerId([{ ...bearerId[0], [candType]: "" }]);
    }
    // disabled for unchecked chekbox for same state value if present
    if (selected[0][candType] && selected[0][candType] === name) {
      e.target.checked = false;
    }
  };

  const obcVote = getObcVote();
  if(obcVote?.OBC){
    navigate("/vote");
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Something went wrong ... </div>;
  }

  var { groupedData } = groupedCndData(data.data);

  return (
    <div className="hero_cndlist mt-3">
      <div className="container">
        {/* OBC lists */}
        {data.data.length > 0 && (
          <div className="bg-body-secondary p-2 rounded-1 shadow hero-obc-main">
            <h3 className="text-center fw-small py-2 mb-3">
              Vote For Office Bearer Candidates
            </h3>
            <hr />
            <div className="d-flex gap-2 justify-content-evenly flex-wrap vote-cnd-container">
              {/* card */}
              {!isLoading &&
                Object.keys(groupedData).map((cardType) => (
                  <VoterCard
                    key={cardType}
                    cardId={cardType}
                    data={groupedData[cardType]}
                    selected={selected}
                    setSelected={setSelected}
                    bearerId={bearerId}
                    setBearerId={setBearerId}
                    handleOnCndVote={handleOnCndVote}
                  />
                ))}
              {/* card end here */}
            </div>
            <div className="voter-submission-btn d-flex justify-content-center py-2 my-2">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={(e) => handleOnObcSubmit(e)}
              >
                Submit Vote
              </button>
            </div>
          </div>
        )}
      </div>
      {/* container end here */}
    </div>
  );
}

export default OBCVoterPage;
