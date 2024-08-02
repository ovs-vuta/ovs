import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";

const OBCVoteInfoApi = import.meta.env.VITE_OBC_VOTE_DATA;
const ECCVoteInfoApi = import.meta.env.VITE_ECC_VOTE_DATA;
const API = import.meta.env.VITE_API_URL;

function ExcelReader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchObcExcel = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API}/users/obcXlsx-converter`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setError(error);
      }
      finally{
        setLoading(false)
      }
    };
    const fetchEccExcel = async () => {
         setLoading(true);
         setError(false);
      try {
        const res = await fetch(`${API}/users/ecc-excel-converter`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setError(error)
      }finally{
        setLoading(false)
      }
    };
    fetchObcExcel();
    fetchEccExcel();
  }, []);
  if(loading){
    return <Spinner/>
  }
  if(error){
    return <div>Something went wrong ... !!!</div>
  }
  return (
    <>
      {/* <Spinner /> */}
      {!loading && (
        <>
          <div className="m-2 alert alert-dark">
            <h5 className="m-2 py-0">Office Bearer Voting Excel File</h5>
            <p className="m-2 p-0">
              Click here to <em>download</em> it.
            </p>
            <hr />
            {/* <div className="m-2">
              <NavLink
                className="btn btn-primary"
                to={`${OBCVoteInfoApi}`}
                download={true}
              >
                Download
              </NavLink>
            </div> */}
          </div>

          <div className="m-2 alert alert-info">
            <h5 className="m-1 py-0">Executive Candidates Voting Excel File</h5>
            <p className="m-2 p-0">
              Click here to <em>download</em> it.
            </p>
            <hr />
            <div className="m-2">
              <NavLink
                className="btn btn-outline-dark"
                to={`${ECCVoteInfoApi}`}
                download={true}
              >
                Download
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ExcelReader;
