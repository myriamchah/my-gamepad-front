import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ReactPlayer from "react-player";

import "./game-screenshots.scss";

const GameScreenshots = ({ game, screenshots, trailer }) => {
  return (
    <div className="game-screenshots">
      <Row className="mt-4">
        <Col className="overflow-hidden">
          {trailer ? (
            <ReactPlayer
              url={trailer.data.max}
              playing={true}
              loop={true}
              muted={true}
              width="356"
              height="200"
              style={{ borderRadius: "12px", overflow: "hidden" }}
            />
          ) : (
            <img
              src={screenshots[0]?.image || game.background_image}
              alt="screenshot 1"
            />
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <img
            src={screenshots[1]?.image || game.background_image_additional}
            alt="screenshot 2"
          />
        </Col>
        <Col>
          <img
            src={screenshots[2]?.image || game.background_image_additional}
            alt="screenshot 3"
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {" "}
          <img
            src={screenshots[3]?.image || game.background_image}
            alt="screenshot 4"
          />
        </Col>
        <Col>
          {" "}
          <img
            src={screenshots[4]?.image || game.background_image}
            alt="screenshot 5"
          />
        </Col>
      </Row>
    </div>
  );
};

export default GameScreenshots;
