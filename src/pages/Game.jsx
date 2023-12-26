import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import axios from "axios";
import GameScreenshots from "../components/GameScreenshots/GameScreenshots";

const Game = () => {
  const [game, setGame] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const gameSlug = params.gameSlug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/games/${gameSlug}`
        );

        setGame(data.game);
        setScreenshots(data.screenshots);
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
        backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0.5), rgba(15, 15, 15, 1)), url(${game.background_image})`,
      }}
    >
      <Container>
        <Row className="my-4">
          <Col>
            <p className="fw-lighter text-uppercase">
              HOME / GAMES / {game.name}
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
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

                <div className="fw-light ms-3">
                  {game.playtime > 0 &&
                    `AVERAGE PLAYTIME: ${game.playtime} HOURS`}
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
          <Col lg={4}>
            <GameScreenshots {...{ game, screenshots }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Game;
