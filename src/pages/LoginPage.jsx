import React, { useEffect, useState } from "react";
import {
  useLoginMutation,
  useVerifyOtpMutation,
} from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAnnoyUser, setToken } from "../store/slice/authSlice";
import { getUserRole, isLoggedIn } from "../utils/auth";
import useFetchUserInfo from "../hooks/useFetchUserInfo";
import Spinner from "../components/ui/Spinner";

function LoginPage() {
  const [userInfo, setUserInfo] = useState([{ voterId: null, otp: null }]);
  const [otpStatus, setOtpStatus] = useState(false);
  const [login] = useLoginMutation();
  const [verifyOtp,{isError,isLoading, isSuccess, isUninitialized}] = useVerifyOtpMutation();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userRole = getUserRole();
    const isLoggedInUser = isLoggedIn();
    if (isLoggedInUser && userRole === "admin") {
      navigator("/admin");
    } else if (isLoggedInUser && userRole !== "admin") {
      navigator("/vote");
    }
  }, [navigator]);

  const handleOnInpChange = (e) => {
    const { name, value } = e.target;
    setUserInfo([{ ...userInfo[0], [name]: value }]);
  };

  const handleSentOtp = async (e) => {
    e.preventDefault();
    try {
      // add validation for voterId & otp
      if (userInfo[0].voterId === null) {
        toast.error("Enter Employee Id ");
        return;
      }
      const payload = await login(userInfo);
      // console.log("login time =",payload.error.data)
      if (payload?.data?.status) {
        setOtpStatus(true);
        toast.success("OTP sent successfully - check your email");
      }
      // show error msg
      if (!payload.error.data.status) {
        toast.error(payload.error.data.msg);
      }
    } catch (error) {
      // get error
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("otp send");
      const payload = await verifyOtp(userInfo);

      // error msg
      if (payload?.error) {
        console.log("login time err =", payload.error.data);
        if (!payload.error.data.status) {
          toast.error(payload.error.data.msg);
        }
      }

      // success msg
      if (payload?.data?.status) {
        toast.success(payload?.data?.msg);
        if (payload.data) {
          // set global data for users
          const token = payload.data.token;
          const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
          dispatch(setToken({ token, expirationTime }));

          // decode user details from token
          const decoded = jwtDecode(payload.data.token);
          dispatch(setAnnoyUser(decoded.newUserId));

          // console.log("decode : ",decoded)
          if (decoded.role === "user") {
            navigator("/vote");
          } else if (decoded.role === "admin") {
            navigator("/admin");
          }
        }
      } else {
        toast.error(payload?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className="login-container py-4 container">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Login With Us</h4>
          <hr />
          <div className="hero-form">
            <form method="post">
              <div className="form-group mt-4">
                <label htmlFor="voterId">Employee Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="voterId"
                  name="voterId"
                  aria-describedby="voterId"
                  placeholder="Enter Employee ID"
                  onChange={(e) => handleOnInpChange(e)}
                />
              </div>
              {/* send otp button */}
              {!otpStatus && (
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mt-4"
                    onClick={(e) => handleSentOtp(e)}>
                    Send OTP {otpStatus && <Spinner />}
                  </button>
                </div>
              )}
              {otpStatus && (
                <>
                  <div className="form-group mt-4">
                    <label htmlFor="OTP">OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      id="OTP"
                      name="otp"
                      placeholder="Enter your 6-digit OTP here"
                      onChange={(e) => handleOnInpChange(e)}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-outline-primary mt-4"
                      onClick={(e) => handleOnSubmit(e)}
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
