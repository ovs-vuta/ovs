import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function Base() {
  return (
    <div className="app" id="base-app">
      <ToastContainer theme="colored" />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Base;
