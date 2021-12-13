import { Modal, Button } from 'react-bootstrap';

const ConfirmDialog = ({
    show,
    onClose,
    onSave,
}) => {
    return (
        <Modal size="sm" aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={onClose}>
           
            <Modal.Body>
              <p>Are you sure you want to take this action ?</p>
             </Modal.Body>
    

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>No</Button>
                <Button variant="primary" onClick={onSave}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDialog;
