import React from "react";

function ServiceCards({children,serviceTitle,headerBgColor}) {
  return (
    <div className="service-card bg-light shadow-lg border-1 border-black mb-2">
      <div className="service-header fs-5" style={headerBgColor}>{serviceTitle}</div>
      {children}
    </div>
  );
}

export default ServiceCards;
