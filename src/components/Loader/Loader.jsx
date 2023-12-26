import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./loader.scss";

const Loader = () => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="loader"></span>
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
