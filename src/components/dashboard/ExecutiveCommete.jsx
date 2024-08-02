import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner";
const API = import.meta.env.VITE_API_URL;
function ExecutiveCommete() {
  const [candidates, setCandidates] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
  ]);

  const [eccData, setEccData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAddBox = () => {
    setCandidates([...candidates, { name: "" }]);
  };

  const handleRemoveBox = (e, index) => {
    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);
    setCandidates(newCandidates);
  };

  const handleOnChange = (e, index) => {
    const newCandidates = [...candidates];
    newCandidates[index][e.target.name] = e.target.value;
    setCandidates(newCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(candidates);
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API}/users/ecc-add-candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidates: candidates,
        }),
      });
      const resData = await response.json();
      if (response.ok) {
        toast.success(data.msg, {
          theme: "colored",
        });
        setCandidates([
          { name: "" },
          { name: "" },
          { name: "" },
          { name: "" },
          { name: "" },
          { name: "" },
          { name: "" },
          { name: "" },
        ]);
        hadleFetchEcc();
      } else {
        toast.error(data.msg, {
          theme: "colored",
        });
      }
      console.log(resData);
      console.log(response);
    } catch (error) {
      console.log(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const hadleFetchEcc = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API}/users/get-ECC`);
      if (response.ok) {
        const resData = await response.json();
        // console.log(resData);
        setEccData(resData.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log("error while fetching ECC data ", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hadleFetchEcc();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Something Went Wrong</div>;
  }

  return (
    <div className="bg-light my-2 p-3 rounded-2">
      <div className="row">
        <h3 className="text-capitalize fw-bold col-md-11">
          Add Candidate For Executive committee
        </h3>
        <div className="col-md-1 d-flex justify-content-end">
          <button
            className=" btn btn-primary  "
            onClick={handleAddBox}
            disabled={candidates.length === 16}
          >
            +
          </button>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          {candidates.map((candidate, index) => (
            <div className="col-md-6 m-0 mb-3 row" key={index}>
              <div className="col-md-11">
                <input
                  type="text"
                  className="form-control m-0"
                  id={`candidate-${index}`}
                  placeholder={`Enter Candidate ${index + 1}`}
                  name="name"
                  value={candidate.name}
                  onChange={(e) => handleOnChange(e, index)}
                  required
                />
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-danger"
                  disabled={candidates.length === 8}
                  onClick={(e) => handleRemoveBox(e, index)}
                  type="button"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button className="btn btn-primary" style={{ width: "10%" }}>
            Submit
          </button>
        </div>
      </form>

      {/* fetch all ECC data */}
      <div className="mt-4">
        <h3 className="fw-bold">Executive Committee Candidates</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate Name</th>
              <th>Type</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {!loading && eccData.length > 0 ? (
              eccData.map((candidate, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{candidate.candidateName}</td>
                  <td>{candidate.candidateType}</td>
                  <td>{candidate.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExecutiveCommete;
