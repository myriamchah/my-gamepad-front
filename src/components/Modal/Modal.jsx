import Modal from "react-bootstrap/Modal";
import { useModalContext } from "../../contexts/modalContext";
import "./modal.scss";

const FormModal = () => {
  const { modalShow, title, content, hideModal } = useModalContext();

  return (
    <Modal
      show={modalShow}
      size="lg"
      onHide={hideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <h2> {title}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
};

export default FormModal;
