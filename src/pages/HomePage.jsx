import React, { useState } from "react";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaUsersViewfinder } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import { NavLink } from "react-router-dom";
import { getUserRole, isLoggedIn } from "../utils/auth";

function HomePage() {
  const [textColor1, setTextColor1] = useState("#000");
  const isLoggedInUser = isLoggedIn();
  const userRole = getUserRole();

  return (
    <header className="mobile_container">
      <div className="top-header px-2 py-2 bg-light">
        <div
          className="text-center"
          style={{ fontSize: "1.5em", color: textColor1 }}
        >
          <TypeAnimation
            sequence={[
              "Online",
              500,
              () => setTextColor1("#000000"),
              "Online Voting",
              500,
              () => setTextColor1("deeppink"),
              "Online Voting System",
              500,
              () => setTextColor1("dodgerblue"),
              "Vidyasagar University",
              500,
              () => setTextColor1("#000000"),
            ]}
            wrapper="span"
            repeat={Infinity}
            className="text-center"
          />
        </div>
      </div>

      {/* contents */}
      <section className="hero_users container py-3">
        <div className="row">
          {/* officer */}
          <div className="col-md-6">
           <div className="card">
              <NavLink to={`${isLoggedInUser&&(userRole === "admin")?"/admin":"/login"}`}>
                <div className="card-body">
                  <h5 className="card-title text-center">Admin</h5>
                  <div className="logo d-flex justify-content-center align-items-center mt-4">
                    <GiPoliceOfficerHead
                      fontSize={60}
                      className="react_icons"
                    />
                  </div>
                </div>
              </NavLink> 
            </div>
          </div>

          {/* faculties */}
          <div className="col-md-6">
            <div className="card">
              <NavLink to={`${(isLoggedInUser)?"/vote":"/login"}`}>
                <div className="card-body">
                  <h5 className="card-title">Users</h5>
                  <div className="logo d-flex justify-content-center align-items-center mt-4">
                    <FaUsersViewfinder fontSize={60} className="react_icons" />
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default HomePage;
