import Modal from "react-bootstrap/Modal";

import Signup from "../UserForms/Signup";
import Login from "../UserForms/Login";
import "./modal.scss";

const FormModal = ({ setUser, modalShow, setModalShow, form, setForm }) => {
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
          <h2> {form === "Login" ? "Log in" : "Sign up"}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form === "Login" ? (
          <Login {...{ setUser, setForm, setModalShow }} />
        ) : (
          <Signup {...{ setUser, setForm, setModalShow }} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
