import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const CardComponent = () => {
    return (
        <div className='container bg-success bg-opacity-10 my-4 ' style={{ width: "40%", borderTop: "5px solid green" }}>
            <div className="d-flex justify-content-center ">
                <div className="col-sm-10 ">
                    <div className="card ">
                        <div className="card-body">
                            <h4 className="card-title">President</h4>
                            <hr />
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                <label className="form-check-label" for="exampleRadios1">
                                    Subrata Santra
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                <label className="form-check-label" for="exampleRadios2">
                                    Manas Das
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary ">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ExecutiveVoting = () => {
    return (
        <div className="container">
            <div className="row">
                {[...Array(5)].map((e, i) => <CardComponent key={i} />)}
            </div>
        </div>
    );
}

export default ExecutiveVoting;
