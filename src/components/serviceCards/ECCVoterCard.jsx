import React, { useState } from "react";

function ECCVoterCard({
  candidate,
  index,
  handleWeightChange,
  handleOnCndSelect,
  handleTdOnClick,
  eccCounter,
  eccWeight,
  disabled,
}) {
  return (
    <div className="card" style={{ flex: "1 1 45%" }}>
      <h5 className="card-title px-2 pt-2 pb-0">Candidate-{index + 1}</h5>
      <div className="card-body pb-0">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>candidate name</th>
              <th>Weight value</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            <tr id={candidate.id}>
              <td id={candidate.id}>{index + 1}</td>
              <td>{candidate.candidateName}</td>
              <td onKeyUp={(e) => handleTdOnClick(e, index)}>
                <input
                  type="text"
                  className="form-control"
                  name={`candidate_${index + 1}`}
                  id="weight"
                  placeholder="only 1 - 8"
                  min="1"
                  max="8"
                  step="1"
                  onChange={(e) => handleWeightChange(e, index)}
                  disabled={disabled}
                />
              </td>
              <td>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name={`candidate_${index + 1}`}
                    id={index}
                    value={eccWeight[0][`candidate_${index+1}`]}
                    className="form-check-input"
                    role="switch"
                    onChange={(e) => handleOnCndSelect(e, candidate.id, index)}
                    disabled={disabled}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ECCVoterCard;
