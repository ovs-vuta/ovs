import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useModifyObcCndMutation } from "../../store/slice/obcCndSlice";
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";

export default function EditModal({ show, handleClose, id, value }) {
  const [name, setName] = useState(value);
  const [modifyObcCnd, { isLoading, isError }] = useModifyObcCndMutation();

  useEffect(()=>{
    setName(value)
  },[value])
 const handleUpdateCnd = async (e) => {
   e.preventDefault();
   try {
     const newObj = {
       id,
       name,
     };
    //  console.log(newObj);
     const payload = await modifyObcCnd(newObj);
     console.log(payload);
     if (payload.data.status) {
       toast.success(payload.data.msg);
       handleClose();
     }
        // console.log("error", payload.error);
        if (payload?.error) {
        if (!payload.error.data.status) {
            toast.error(payload.error.data.msg);
        }
     }
   } catch (err) {}
 };

  if(isError){
    return <p className="text-danger">Something went wrong</p>
  }

  return (
    <div className="modal-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUpdateCnd(e)}>
            <Form.Group md="4" controlId="validationCustom01">
              <Form.Label>Candidate name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Mr. Roy"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
