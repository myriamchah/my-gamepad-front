import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactHtmlParser from "react-html-parser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import axios from "axios";
import dayjs from "dayjs";
import Loader from "../components/Loader/Loader";
import GameScreenshots from "../components/GameScreenshots/GameScreenshots";

const Game = () => {
  const [game, setGame] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [series, setSeries] = useState([]);
  const [toggleBtnText, setToggleBtnText] = useState("Read more");
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const gameSlug = params.gameSlug;

  const fakeCollapse = (e) => {
    if (toggleBtnText === "Read more") {
      e.target.previousSibling.style.height = "fit-content";
      setToggleBtnText("Show less");
    } else {
      e.target.previousSibling.style.height = "220px";
      setToggleBtnText("Read more");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/games/${gameSlug}`
        );

        setGame(data.game);
        setScreenshots(data.screenshots);
        setSeries(data.others);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [gameSlug]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="layout"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(1, 1, 1, 0.3) 0%, rgba(15, 15, 15, 1) 60%), url(${game.background_image})`,
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
                <Row className="mb-5">
                  <Col>
                    <h2>About</h2>
                    <div style={{ overflow: "hidden", height: "220px" }}>
                      {ReactHtmlParser(game.description)}
                    </div>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={(e) => fakeCollapse(e)}
                    >
                      {toggleBtnText}
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <div className="title-sm">Platforms</div>
                      <p className="list-w-comas">
                        {game.platforms.map((p) => (
                          <span key={p.platform.id}>{p.platform.name}</span>
                        ))}
                      </p>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <div className="title-sm">Metascore</div>
                      <p>{game.metascore}</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <div className="title-sm">Genres</div>
                      <p className="list-w-comas">
                        {game.genres.map((genre) => (
                          <span key={genre.id}>{genre.name}</span>
                        ))}
                      </p>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <div className="title-sm">Release date</div>
                      <p>{game.released}</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <div className="title-sm">Developer</div>
                      <p className="list-w-comas">
                        {game.developers.map((dev) => (
                          <span key={dev.id}>{dev.name}</span>
                        ))}
                      </p>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <div className="title-sm">Publisher</div>
                      <p className="list-w-comas">
                        {game.publishers.map((pub) => (
                          <span key={pub.id}>{pub.name}</span>
                        ))}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Col>
                  <div>
                    <div className="title-sm">Age rating</div>
                    <p>{game.esrb_rating.name}</p>
                  </div>
                </Col>
                <Row>
                  <Col>
                    <div>
                      <div className="title-sm">Other games in the series</div>
                      <p className="list-w-comas">
                        {series.map((serie) => (
                          <span key={serie.id}>
                            <Link to={serie.website}>{serie.name}</Link>
                          </span>
                        ))}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <div className="title-sm">Tags</div>
                      <p className="list-w-comas">
                        {game.tags.map((tag) => (
                          <span key={tag.id}>{tag.name}</span>
                        ))}
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div>
                      <div className="title-sm">Website</div>
                      <p>
                        <Link to={game.website}>{game.name}</Link>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={4}>
                <GameScreenshots {...{ game, screenshots }} />
                <Button variant="light" className="w-100 py-3 mt-4 fw-light">
                  <FontAwesomeIcon icon="pen-to-square" className="me-2" />
                  Edit the game info
                </Button>
                <p className="title-sm text-center mt-2">
                  Last modified: {dayjs(game.updated).format("MMM DD, YYYY")}
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Game;
