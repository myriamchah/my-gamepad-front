import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useModalContext } from "../../contexts/modalContext";

const Review = () => {
  const { hideModal } = useModalContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    hideModal();
  };

  return (
    <Form onSubmit={onSubmit} className="w-75 m-auto">
      <Form.Check type="radio" inline className="review-radio-btn">
        <Form.Check.Label>
          <Form.Check.Input type="radio" name="rating" />
          🎯 <span>Exceptionnal</span>
        </Form.Check.Label>
      </Form.Check>
      <Form.Check type="radio" inline className="review-radio-btn">
        <Form.Check.Label>
          <Form.Check.Input type="radio" name="rating" />
          👍 <span>Recommended</span>
        </Form.Check.Label>
      </Form.Check>
      <Form.Check type="radio" inline className="review-radio-btn">
        <Form.Check.Label>
          <Form.Check.Input type="radio" name="rating" />
          😑 <span>Meh</span>
        </Form.Check.Label>
      </Form.Check>
      <Form.Check type="radio" inline className="review-radio-btn">
        <Form.Check.Label>
          <Form.Check.Input type="radio" name="rating" />
          ⛔️ <span>Skip</span>
        </Form.Check.Label>
      </Form.Check>

      <Form.Control
        as="textarea"
        placeholder="Your review"
        style={{ height: "200px" }}
        className="border-0 my-3"
      />
      <Button variant="light" type="submit" className="float-end mb-3 p-2">
        Publish
      </Button>
    </Form>
  );
};

export default Review;
