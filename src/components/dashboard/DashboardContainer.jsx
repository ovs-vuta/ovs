import React from "react";
import "./dashboard.css";

function DashboardContainer({ children }) {
  return (
    <div className="container overflow-auto" style={{ height: "auto" }}>
      {children}
    </div>
  );
}

export default DashboardContainer;
