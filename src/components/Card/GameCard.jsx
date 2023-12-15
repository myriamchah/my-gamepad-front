import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./card.scss";

const setEmoji = (game) => {
  if (game.ratings[0].title === "exceptional") {
    return "🎯";
  } else if (game.ratings[0].title === "recommended") {
    return "👍";
  }
};

const GameCard = (game) => {
  return (
    <>
      <Card className="game-card">
        <Card.Img variant="top" src={game.background_image} />
        <Card.Body>
          <div className="bg-platforms">
            {game.parent_platforms.map((p, i) => (
              <div
                key={i}
                className={`bg-platform-${p.platform.name.toLowerCase()}`}
              >
                {" "}
              </div>
            ))}
          </div>
          <Card.Title>
            {game.name} {setEmoji(game)}
          </Card.Title>
          <Button variant="secondary" className="btn-added">
            <FontAwesomeIcon icon="plus" size="lg" className="icon" />
            {game.added}
          </Button>
          <div className="toggle-show">
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <span>Release Date:</span>
                <span>{game.released}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Genres:</span>
                <span className="genres">
                  {game.genres.map((genre, i) => (
                    <span key={i}>{genre.name}</span>
                  ))}
                </span>
              </ListGroup.Item>
            </ListGroup>
            <Button variant="secondary" className="btn-bottom">
              Show more like this
              <span>
                {" "}
                <FontAwesomeIcon
                  icon="chevron-right"
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
