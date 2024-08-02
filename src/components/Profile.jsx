import React, { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Profile({ userName, userEmail }) {
  const [closeProfile, setCloseProfile] = useState(false);
  const handleProfileData = (e) => {
    e.stopPropagation();
    setCloseProfile(!closeProfile);
    console.log("close")
  };
  return (
    <section>
      <div
        className={`card pb-0 ${closeProfile ? "d-none" : "d-block"}`}
        style={{ width: "18rem" }}
      >
        <div
          className="close-btn position-absolute"
          style={{ right: "2px", top: "0px" }}
        >
          <div style={{ cursor: "pointer", pointerEvents: "all" }}>
            <AiOutlineCloseCircle
              size={24}
              color="white"
              onClick={(e) => handleProfileData(e)}
            />
          </div>
        </div>
        <div className="card-header">
          Welcome, <span style={{ color: "#ff516b" }}>{userName}</span>
        </div>
        <div className="card-body">
          <div>
            <MdMarkEmailRead
              size={24}
              style={{ margin: ".25rem" }}
              color="#65da67"
            />
            <h5 className="card-title">{userEmail}</h5>
          </div>
          <button
            className="btn btn-outline-light text-info mt-2"
            onClick={() => removeToken()}
            style={{ width: "100%", color: "#ff516b", pointerEvents: "all" }}
          >
            Logout
            <RiLogoutCircleRLine style={{ margin: "0 .25rem" }} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
