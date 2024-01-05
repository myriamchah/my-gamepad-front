import Modal from "react-bootstrap/Modal";
import "./modal.scss";

const FormModal = ({ modalShow, setModalShow, title, content, cssBgClass }) => {
  return (
    <Modal
      show={modalShow}
      size="lg"
      onHide={() => setModalShow(false)}
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
