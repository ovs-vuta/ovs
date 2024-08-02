import { useEffect, useState } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import EditModal from "../ui/EditModal";
export default function CardBox({ candidate, handleDelUser }) {
  // console.log(candidate);
  const [{ candidateType: type }] = candidate;

  const [show, setShow] = useState(false);
  const [cndName, setCndName] = useState({
    name:"",
    id:""
  });

  const handleClose = () => setShow(false);
  const handleShow = (e,id, cnd) => {
    e.stopPropagation();
    setShow(true);
    setCndName({...cndName, name:cnd,id:id})
    
  }
 

  return (
    <>
      <div
        className="card mx-1"
        style={{
          borderTop: "5px solid lightgreen",
          minWidth: "18rem",
          flex: "1 0 25%",
        }}
      >
        <div
          className="card-body"
          style={{ boxSizing: "border-box", flex: "1 0 25%" }}
        >
          <h5 className="card-title">
            {type} ({candidate.length} / 4)
          </h5>
          <table
            className="table table-striped table-bordered mb-0 table-sm"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>candidate name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidate.length > 0 &&
                candidate.map((cnd, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{cnd.candidateName}</td>
                    <td id="action-data">
                      <div>
                        <button
                          className="btn btn-outline-dark"
                          onClick={(e) =>
                            handleDelUser ? handleDelUser(e,`${cnd?.id}`) : null
                          }
                        >
                          <AiOutlineUserDelete />
                        </button>
                        <button
                          className="btn btn-outline-primary mx-2"
                          onClick={(e) => handleShow(e, cnd.id, cnd.candidateName)}
                        >
                          <FaUserEdit />
                        </button>
                        <EditModal
                          show={show}
                          handleClose={handleClose}
                          id={cndName.id}
                          value={cndName.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
