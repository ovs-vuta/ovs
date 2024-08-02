import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Profile from "./Profile";
import CardBox from "./CardBox";
import Spinner from "../ui/Spinner";
import { groupedCndData } from "../../services/CandidatesService";

import { useAddObcCndMutation, useGetAllObcCndQuery,useDeleteObcCndMutation } from "../../store/slice/obcCndSlice";

const API = import.meta.env.VITE_API_URL;

function OfficeBearer() {
  const [candidates, setCandidates] = useState([{ name: "" }, { name: "" }]);
  const [candidatesType, setCandidatesType] = useState([]);

  // get slice data
  const { isError,isLoading, data } = useGetAllObcCndQuery(); 
  const [addObcCnd] = useAddObcCndMutation();
  const [deleteObcCnd] = useDeleteObcCndMutation();

  const handleAddCandidate = () => {
    setCandidates([...candidates, { name: "" }]);
  };

  const handleRemoveCandidate = (e, index) => {
    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);
    setCandidates(newCandidates);
  };

  const handleChange = (e, index) => {
    const newCandidates = [...candidates];
    newCandidates[index][e.target.name] = e.target.value;
    setCandidates(newCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const candidateVal = e.target["candidate-type"].value;
      // check value for 'select-candidate'
      if (candidateVal && candidateVal !== "select-candidate") {
        setCandidatesType([...candidatesType, e.target["candidate-type"].options[e.target["candidate-type"].selectedIndex].id]);
        // console.log(candidates);
        // console.log(e.target["candidate-type"].value);
        const newCData = [...candidates, { type: e.target["candidate-type"].value }];
        console.log(newCData)
        const payload = await addObcCnd(newCData);
        console.log(payload)
        if(payload.data.status){
          toast.success(payload.data.msg);
        }else {
          toast.error(payload.data.msg);
        }
      }else {
        toast.error("Invalid Selection")
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelUser = async (e,id)=>{
    e.stopPropagation();
    e.preventDefault();
    try {
      const payload = await deleteObcCnd(id);
      if(payload.data.status){
        toast.success(payload.data.msg);
      }else {
        toast.error(payload.data.msg);
      }
    } catch (err) {
     
    }
  }
  if(isLoading){
    return <Spinner />
  }
  
  if(isError){
    return <div>Something went wrong ... </div>
  }
  var { groupedData } = groupedCndData(data.data);
  
  return (
    <section className="py-2 mb-2">
      {/* add office bearer */}
      <div className="add-office-bearer bg-light p-2 d-flex flex-column justify-content-center align-item-center mt-2 rounded-2">
        {/* user profile */}
        {/* <Profile /> */}

        {/* add candidates */}
        <div className="card mt-2">
          <h3 className="fw-bold py-2 px-2">Add Candidate for office bearer</h3>
          <hr className="m-0" />
          <div className="card-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label
                  htmlFor="candidate-type"
                  className="col-md-3 col-form-label"
                >
                  Select Candidate
                </label>
                <div className="col-sm-8">
                  <select
                    name="candidate-type"
                    id="candidate-type"
                    className="form-select col-md-8"
                    required
                    defaultValue="select-candidate"
                  >
                    <option value="select-candidate" id="0" disabled>
                      Select Candidate
                    </option>
                    <option
                      value="President"
                      id="1"
                      disabled={candidatesType.includes("1")}
                    >
                      Add President
                    </option>
                    <option
                      value="Vice President"
                      id="2"
                      disabled={candidatesType.includes("2")}
                    >
                      Add Vice President
                    </option>
                    <option
                      value="Secretary"
                      id="3"
                      disabled={candidatesType.includes("3")}
                    >
                      Add Secretary
                    </option>
                    <option
                      value="Secretary Co-ordinator"
                      id="4"
                      disabled={candidatesType.includes("4")}
                    >
                      Add Secretary Co-ordinator
                    </option>
                    <option
                      value="Secretary Organization"
                      id="5"
                      disabled={candidatesType.includes("5")}
                    >
                      Add Secretary Organization
                    </option>
                  </select>
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-primary"
                    onClick={handleAddCandidate}
                  >
                    +{" "}
                  </button>
                </div>
              </div>
              <hr />
              {candidates.map((candidate, index) => (
                <div className="row mb-3" key={index}>
                  <label
                    htmlFor={`candidate-${index}`}
                    className="col-sm-3 col-form-label"
                  >
                    Candidate {index + 1}
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id={`candidate-${index}`}
                      value={candidate.name}
                      name="name"
                      onChange={(e) => handleChange(e, index)}
                      required
                    />
                  </div>
                  <div className="col-sm-1">
                    <button
                      className="btn btn-danger"
                      disabled={candidates.length === 2}
                      onClick={(e) => handleRemoveCandidate(e, index)}
                    >
                      -{" "}
                    </button>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ minWidth: "10%" }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* voter card box */}
      <div className="voter-card-box bg-light rounded-2 p-2 mt-2">
        <div className="title">
          <h3 className="fw-bold py-2 px-2">Candidate Details</h3>
        </div>
        <hr className="m-0 mb-2" />
        <div className="cnd-box d-flex justify-content-center flex-wrap gap-3">
          {!isLoading && Object.keys(groupedData).map((cnd, idx) => (
            <CardBox key={idx} candidate={groupedData[cnd]} handleDelUser={handleDelUser}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfficeBearer;
