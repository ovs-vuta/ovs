import React from "react";

function Header() {
    return (
      <div className="hero-header d-flex justify-content-between align-items-center p-4">
        <div className="logo">
          <img
            src="inst_logo.jpeg"
            alt="Vidyasagar University"
            className="img-fluid"
            width="125"
            height="200"
          />
        </div>
        <div>
          <h1 className="text-center text-light">Vidyasagar University</h1>
          <h3 className="text-center">Online Voting Portal 2024</h3>
        </div>
        <hr />
      </div>
    );
}

export default Header;