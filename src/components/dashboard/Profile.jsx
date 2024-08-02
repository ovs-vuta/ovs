import React, { useState } from 'react'
import { MdPersonAddAlt } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import AddNewOfficer from './AddNewOfficer';
import { toast } from 'react-toastify';
import Confirmation from "./Confirmation";

function Profile() {
    const [show, setShow] = useState(false);
    const [cnfModalShow, setCnfModalShow] = useState(false);

    const handleSignOut = () => {
        toast.success("Sign out successfully")
    }

    return (
        <div className="profile-container">
            <div className="d-flex align-items-center">
                <div className="dropdown text-end">
                    <a href="#" className="d-block dropdown-toggle link-body-emphasis text-decoration-none show" data-bs-toggle="dropdown" aria-expanded="true">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="mdo" width="60" height="60" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small" style={{ position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate3d(0px, 34.4px, 0px)" }} data-popper-placement="bottom-start">
                        <li>
                            <span className="dropdown-item d-flex align-items-center" onClick={() => setShow(true)}>
                                <MdPersonAddAlt className='me-2' />
                                Add New Returning Officer
                            </span>
                            <AddNewOfficer 
                                show={show}
                                handleClose={() => setShow(false)}
                            />
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <span className="dropdown-item d-flex align-items-center" onClick={() => setCnfModalShow(true)}>
                                <IoMdLogOut className='me-2' />
                                Sign out
                            </span>
                            <Confirmation 
                                title="Confirmation"
                                message="Are you sure you want to sign out from this site?"
                                show={cnfModalShow}
                                handleClose={() => setCnfModalShow(false)}
                                onConfirm={handleSignOut}
                            />
                        </li>
                    </ul>
                </div>
                <div className="mx-3">
                    <p className='fs-5 fw-semibold m-0'>Subrata Santra</p>
                    <p className='fs-6 m-0'>- <i>Returning Officer</i></p>
                </div>
            </div>
        </div>
    )
}

export default Profile;