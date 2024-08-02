import React from "react";
import { Link } from "react-router-dom";
import { getEccVote, getObcVote } from "../../utils/voteState";

function SmCard({
  children,
  title,
  text,
  textSize,
  bgColor,
  handleShowCnd,
  mode,
}) {
  const obcVoteCount = getObcVote();
  const eccVoteCount = getEccVote()

  return (
    <div
      className="sm-card shadow-sm d-flex flex-column justify-content-between"
      style={bgColor}
    >
      {/* card-body */}
      <div className="sm-card-body d-flex justify-content-between flex-wrap">
        <div className="sm-card-body-icon">{children}</div>
        <div className="sm-card-body-text align-self-center">
          <p className="fw-bold fs-5">{title}</p>
          <p style={textSize} className="mt-1">
            {text}
          </p>
        </div>
      </div>
      {/* card-footer */}
      <div className="sm-card-footer mt-4 d-flex justify-content-between gap-2">
        {mode === "OBC" && (
          <>
            <button
              className="btn"
              style={{
                backgroundColor:
                  mode === "OBC" && obcVoteCount?.OBC
                    ? "rgb(20 137 72)"
                    : "#E93250",
                color: "#fff",
              }}
            >
              {mode === "OBC" && obcVoteCount?.OBC ? "success" : "Pending"}
            </button>
            {!obcVoteCount?.OBC && (
              <Link to="/office-bearer-vote">
                <button
                  className={"btn btn-outline-dark"}
                  onClick={(e) => handleShowCnd(e, true, mode)}>
                  Vote Now
                </button>
              </Link>
            )}
          </>
        )}

        {mode === "ECC" && (
          <>
            <button
              className="btn"
              style={{
                backgroundColor:
                  mode === "ECC" && eccVoteCount?.ECC
                    ? "rgb(20 137 72)"
                    : "#E93250",
                color: "#fff",
              }}>
              {mode === "ECC" && eccVoteCount?.ECC ? "success" : "Pending"}
            </button>
            {!eccVoteCount?.ECC && (
              <Link to="/executive-vote">
                <button
                  className="btn btn-outline-dark"
                  onClick={(e) => handleShowCnd(e, true, mode)}>
                  Vote Now
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SmCard;
