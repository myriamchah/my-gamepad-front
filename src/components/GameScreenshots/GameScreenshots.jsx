import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./game-screenshots.scss";

const GameScreenshots = ({ game, screenshots }) => {
  return (
    <div className="game-screenshots">
      <Row className="mt-4">
        <Col>
          <img src={game.background_image} alt="pouet" />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <img
            src={screenshots[0]?.image || game.background_image_additional}
            alt="pouet"
          />
        </Col>
        <Col>
          <img
            src={screenshots[1]?.image || game.background_image_additional}
            alt="pouet"
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {" "}
          <img
            src={screenshots[2]?.image || game.background_image}
            alt="pouet"
          />
        </Col>
        <Col>
          {" "}
          <img
            src={screenshots[3]?.image || game.background_image}
            alt="pouet"
          />
        </Col>
      </Row>
    </div>
  );
};

export default GameScreenshots;
