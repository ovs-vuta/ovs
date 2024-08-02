import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddNewOfficer(props) {
    const handleConfirm = () => {
        props.onConfirm();
        props.handleClose();
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            // size='md'
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title className='w-100 fw-bold text-center'>
                    {props.title || "Confirmation"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNewOfficer;