import React, { useState } from "react";

function VoterCard({
  cardId,
  data,
  selected,
  setSelected,
  bearerId,
  setBearerId,
  handleOnCndVote,
}) {
  const [{ candidateType: type }] = data;
  return (
    <div className="card" style={{ flex: "1 1 45%" }}>
      <h5 className="card-title px-2 pt-2 pb-0">{type}</h5>
      <div className="card-body pb-0">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>candidate name</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} id={item.id}>
                <td>{index + 1}</td>
                <td>{item.candidateName}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      name={cardId}
                      id={index}
                      value={cardId}
                      className="form-check-input"
                      role="switch"
                      onChange={(e) =>
                        handleOnCndVote(e, item.candidateType, item.id, index)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VoterCard;
