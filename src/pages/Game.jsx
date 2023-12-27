import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faPenToSquare,
  faComment,
} from "@fortawesome/free-regular-svg-icons";

import ReactHtmlParser from "react-html-parser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import greenPlus from "../assets/img/green-plus-icon.svg";
import wishlist from "../assets/img/wishlist-icon.svg";

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

  const setEmoji = (game) => {
    if (game.ratings[0]?.title === "exceptional") {
      return "🎯";
    } else if (game.ratings[0]?.title === "recommended") {
      return "👍";
    }
  };

  const setRatingColor = (rating) => {
    switch (rating) {
      case "recommended":
        return "blue";
      case "meh":
        return "orange";
      case "skip":
        return "red";
      default:
        return "green";
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
            backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0.6) 0%, rgba(15, 15, 15, 1) 60%), url(${game.background_image})`,
          }}
        >
          <Container>
            <Row className="my-4">
              <Col>
                <p className="breadcrumb">
                  <Link to="/">HOME</Link>
                  <span> / </span>
                  <Link to="/">GAMES</Link>
                  <span> / {game.name}</span>
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
                <Row className="my-4">
                  <Col className="d-flex">
                    <Button
                      variant="light"
                      className="d-flex justify-content-between align-items-center pe-0 overflow-hidden me-3"
                    >
                      <div className="text-start">
                        <div className="text-sm opacity-50">Add to</div>
                        <div className="text-lg">My Games </div>
                      </div>
                      <img
                        src={greenPlus}
                        alt="plus in circle"
                        className=" ps-5 me-n2"
                      />
                    </Button>
                    <Button
                      variant="outline-light"
                      className="d-flex justify-content-between align-items-center pe-0 overflow-hidden me-3"
                    >
                      <div className="text-start">
                        <div className="text-sm opacity-50">Add to</div>
                        <div className="text-lg">Wishlist </div>
                      </div>
                      <img
                        src={wishlist}
                        height="36"
                        alt="plus in circle"
                        className=" ps-5 me-n2"
                      />
                    </Button>
                    <div className="text-start pt-2">
                      <div className="text-sm opacity-50">Save to</div>
                      <div className="text-lg">
                        Collection
                        <FontAwesomeIcon icon={faFolder} className="ms-2" />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-flex align-items-center gap-3">
                      <h2 className="text-capitalize">
                        {game.ratings[0].title} {setEmoji(game)}
                      </h2>
                      <div className="fw-light opacity-50">
                        {game.ratings_count} RATINGS
                      </div>
                    </div>
                    {game.ratings.map((rating) => (
                      <div
                        key={rating.id}
                        className="d-inline-flex align-items-center gap-1 me-3"
                      >
                        <span
                          className={`${setRatingColor(
                            rating.title
                          )} circle-sm`}
                        ></span>
                        <span className="text-capitalize fw-bold text-white title-sm">
                          {rating.title}
                        </span>
                        <span className=" text-sm fw-light opacity-50">
                          {rating.count}
                        </span>
                      </div>
                    ))}
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <Button
                      variant="secondary"
                      href="#"
                      className="px-4 py-3 me-3"
                    >
                      <div className="opacity-50">
                        <FontAwesomeIcon icon="plus" className="me-2" />
                        Write a review
                      </div>
                    </Button>
                    <Button variant="secondary" href="#" className="px-4 py-3">
                      <div className="opacity-50">
                        <FontAwesomeIcon icon={faComment} className="me-2" />
                        Write a comment
                      </div>
                    </Button>
                  </Col>
                </Row>
                <Row className="my-5">
                  <Col>
                    <h2>About</h2>
                    <div style={{ overflow: "hidden", height: "220px" }}>
                      {ReactHtmlParser(game.description)}
                    </div>
                    <Button
                      variant="light"
                      size="sm"
                      className="py-0"
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
                      <div className="title-sm mb-1">Metascore</div>
                      <span className="border rounded p-1">
                        {game.metacritic}
                      </span>
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
                <Button
                  variant="light"
                  className="w-100 py-3 mt-4 fw-light"
                  href={`https://rawg.io/games/${game.slug}/edit`}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="me-2" />
                  Edit the game info
                </Button>
                <p className="title-sm text-center mt-2">
                  Last modified: {dayjs(game.updated).format("MMM DD, YYYY")}
                </p>
                <p className="text-lg opacity-50">Where to buy</p>

                <Row className="row-cols-2">
                  {game.stores.map((s) => (
                    <Col key={s.id} className="p-2">
                      <Button
                        variant="secondary"
                        href={s.store.domain}
                        className="w-100 fw-light  opacity-50"
                      >
                        {s.store.name}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Game;
