import React from 'react'

function Register() {
    const handleSubmit = (event) => {
        console.log(event.target);
    }
    return (
        <div className='dashboard-container d-flex justify-content-center'>
            <div className="card mx-1 m-3 " style={{ width: "50rem", borderTop: "5px solid green" }}>
                <div className="card-body ">
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-center'>Registration</h2>
                        <hr />
                        <div className="form-group p-2">
                            <label for="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" />
                        </div>

                        <div className="form-group p-2">
                            <label for="employeeId">Employee ID</label>
                            <input type="text" className="form-control" id="employeeId" name="employeeId" />
                        </div>

                        <div className="form-group p-2 row">
                            <div className="col-10">
                            <label for="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" />
                            </div>
                            <div className="pt-4 col-2">
                            <button type="button" className="btn btn-primary" id="sendOtp">Send OTP</button>
                            </div>
                            
                        </div>

                        <div className="form-group p-2">
                            <label for="otp">OTP</label>
                            <input type="text" className="form-control" id="otp" name="otp" />
                        </div>
                        <div className="p-1 mx-2 d-flex justify-content-end"><button type="submit" className="btn btn-primary">Submit</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register