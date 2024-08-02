import React from "react";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const location = useLocation();
  return (
    <section className="hero-center-container container">
      <div className="hero-container d-flex mx-2 my-2 rounded-1">
        <Sidebar/>
        <DashboardContainer>
          <Outlet />
        </DashboardContainer>
      </div>
    </section>
  );
}

export default Dashboard;
