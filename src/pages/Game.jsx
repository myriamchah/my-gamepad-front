import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import axios from "axios";

const Game = () => {
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const gameSlug = params.gameSlug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/games/${gameSlug}`
        );

        setGame(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [gameSlug]);

  return (
    <div
      className="layout"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 1) 100%), url(${game.background_image})`,
      }}
    >
      <Container>
        <Row>
          <Col lg={8}>
            <Row className="my-4">
              <Col>
                <p>HOME / GAMES / {game.name?.toUpperCase()}</p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-row align-items-center">
                <div className="badge bg-white text-secondary fw-light me-3">
                  {game.released}
                </div>
                <div className="bg-platforms mb-0">
                  {game.parent_platforms?.map((p, i) => (
                    <div
                      key={i}
                      className={`bg-platform-${p.platform.name.toLowerCase()}`}
                    ></div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1>{game.name}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="light">Add to My Games </Button>
                <Button variant="light">Write a Review</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>About</h2>
                <div>{ReactHtmlParser(game.description)}</div>
              </Col>
            </Row>
          </Col>
          <Col lg={4}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Game;
