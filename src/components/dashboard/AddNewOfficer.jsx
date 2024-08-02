import React from 'react';

function AddNewOfficer() {
  return (
    <div className="container">
      <div className="dashboard-container">
        <h3 className="text-center">Add new Returning Officer</h3>
        <hr />
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Example input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="employId">Employ Id</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default AddNewOfficer;