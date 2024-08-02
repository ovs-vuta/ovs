import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import MenuConfig from "../config/Menu";
import { isLoggedIn, removeToken } from "../utils/auth";

function Sidebar() {
  const loggedInUser = isLoggedIn();
 
  
  return (
    <>
      {/* start sidebar */}
      <div
        className="hero-sidebar p-2"
        style={{ width: "250px", height: "100%" }}
      >
        {/* sidebar top */}
        <div className="hero-sidebar-header d-flex justify-content-between align-items-center p-2">
          <p>Dashboard</p>
          <IoIosArrowRoundBack color="#fff" size={28} />
        </div>

        {/* sidebar nav-items */}
        <nav id="side-menu-bar">
          <ul>
            {MenuConfig.map((elem, idx) => {
              return (
                <li key={idx}>
                  <div className="">
                    <NavLink
                      to={`/admin${elem.path}`}
                      className={
                        location.pathname === `/admin${elem.path}`
                          ? "text-green-700 bg-light-green rounded-1"
                          : " "
                      }
                    >
                      {elem.icon}
                      {elem.name}
                    </NavLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* sidebar Logout button */}
        {loggedInUser && (
          <div className="hero_logout border-0">
            <button
              className="btn btn-outline-dark text-info"
              onClick={() => removeToken()}
            >
              Logout
              <RiLogoutCircleRLine style={{ margin: "0 .25rem" }} />
            </button>
          </div>
        )}
        {/* end sidebar */}
      </div>
    </>
  );
}

export default Sidebar;
