import { Link } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./card.scss";
import {
  faChevronRight,
  faPlus,
  faHeartCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/authContext";

const setEmoji = (game) => {
  if (game.ratings[0]?.title === "exceptional") {
    return "🎯";
  } else if (game.ratings[0]?.title === "recommended") {
    return "👍";
  }
};

const GameCard = (game) => {
  const { user, authUser } = useAuth();

  const deleteFromColl = async (game) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/my-collection/${game.slug}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      authUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="game-card">
        <Card.Img variant="top" src={game.background_image} />
        <Card.Body>
          <div className="bg-platforms">
            {game.parent_platforms?.map((p, i) => (
              <div
                key={i}
                className={`bg-platform-${p.platform.name.toLowerCase()}`}
              ></div>
            ))}
          </div>
          <Card.Title>
            <Link to={`/games/${game.slug}`} className="text-decoration-none">
              {game.name} {setEmoji(game)}
            </Link>
          </Card.Title>
          <Button variant="secondary" className="btn-added">
            <FontAwesomeIcon icon={faPlus} size="lg" className="icon" />
            {game.added}
          </Button>

          <FontAwesomeIcon
            icon={faHeartCircleMinus}
            className="float-end pt-2"
            style={{ cursor: "pointer" }}
            onClick={() => deleteFromColl(game)}
          />

          <div className="toggle-show">
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <span>Release Date:</span>
                <span>{game.released}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Genres:</span>
                <span className="list-w-comas">
                  {game.genres.map((genre, i) => (
                    <span key={i}>{genre.name}</span>
                  ))}
                </span>
              </ListGroup.Item>
            </ListGroup>
            <Button variant="secondary" className="btn-bottom">
              Show more like this
              <span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="icon"
                />
              </span>
            </Button>
            <Button variant="secondary" className="btn-bottom">
              Hide this game
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default GameCard;
