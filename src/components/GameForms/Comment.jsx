import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useModalContext } from "../../contexts/modalContext";

const Comment = () => {
  const { hideModal } = useModalContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    hideModal();
  };

  return (
    <Form onSubmit={onSubmit} className="w-75 m-auto">
      <Form.Control
        type="text"
        placeholder="Title"
        className="mb-3 border-0 p-3"
      />

      <Form.Control
        as="textarea"
        placeholder="Your comment"
        style={{ height: "200px", border: "none" }}
      />
      <Button variant="light" type="submit" className="float-end my-3 p-2">
        Publish
      </Button>
    </Form>
  );
};

export default Comment;
