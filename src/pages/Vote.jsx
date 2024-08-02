import React, { useEffect, useState } from "react";
import { FaUsersLine } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import ServiceCards from "../components/serviceCards/ServiceCards";
import SmCard from "../components/serviceCards/SmCard";
import { toast } from "react-toastify";
import useFetchUserInfo from "../hooks/useFetchUserInfo";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Profile from "../components/Profile";

function Vote() {
  const { userDetails, error, isLoading, token } = useFetchUserInfo();
  const [showProfile, setShowProfile] = useState(false);
  const [cndMode, setCndMode] = useState(false);
  const [voteState, setVoteState] = useState("pending");
  const [voteMode, setvoteMode] = useState("");
  const [voteCount, setVoteCount] = useState({ OBC: false, ECC: false });

  const handleShowCnd = (e, candMode, mode) => {
    setCndMode(candMode);
    setvoteMode(mode);
  }; 

  const handleProfile = (e)=>{
    e.stopPropagation()
    setShowProfile(!showProfile);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <section className="hero-voter_main pb-2">
        {/* top-header */}
        <div
          className="hero-voter_header text-bg-primary py-2 fs-4 text-center fw-bold d-flex justify-content-between align align-items-center"
          style={{ padding: "0 2rem" }}
        >
          General Election 2024
          <div
            className="usr-profile d-flex flex-column"
            onClick={(e) => handleProfile(e)}
          >
            <div style={{ cursor: "pointer" }}>
              <FaRegUserCircle size={28} color="#fff" />
            </div>
            <span
              style={{
                fontSize: ".75rem",
                userSelect: "none",
              }}
            >
              Profile
            </span>
            {showProfile && (
              <Profile
                userName={userDetails.data.name}
                userEmail={userDetails.data.email}
              />
            )}
          </div>
        </div>

        {/* banner */}
        <div className="hero-voter_banner">
          <div className="logo">
            <img src="./src/assets/vote_logo.png" alt="EVM" width={200} />
          </div>
        </div>
        {/* services */}
        <div className="hero-voter_services">
          <div className="container">
            {/* service cards */}
            <ServiceCards serviceTitle="Service">
              <div className="row mx-0 mt-2 flex-wrap">
                {/* office bearer */}
                <div className="col-md-6">
                  <SmCard
                    title="Vote For Office Bearer Candidates"
                    text=" Lorem ipsum dolor sit, amet consectetur adipisicing elit."
                    textSize={{ fontSize: ".85rem" }}
                    bgColor={{ backgroundColor: "#E4FDF0" }}
                    handleShowCnd={handleShowCnd}
                    voteCount={voteCount}
                    mode="OBC">
                    <FaUsersLine size={40} color="#CBF7CD" />
                  </SmCard>
                </div>

                {/* executive officer */}
                <div className="col-md-6">
                  <SmCard
                    title="Vote For Executive Candidates"
                    text="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
                    textSize={{ fontSize: ".85rem" }}
                    bgColor={{ backgroundColor: "#FAFBE1" }}
                    handleShowCnd={handleShowCnd}
                    voteCount={voteCount}
                    mode="ECC"
                  >
                    <PiUsersThreeBold size={40} color="#CBF7CD" />
                  </SmCard>
                </div>
              </div>
            </ServiceCards>
          </div>
        </div>
      </section>
    </>
  );
}

export default Vote;
