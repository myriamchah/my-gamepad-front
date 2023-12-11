import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./card.scss";

const GameCard = (game) => {
  return (
    <>
      <Card style={{ width: "16rem" }}>
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
          <Card.Title>{game.name}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Release Date: <span>{game.released}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Genres:
              <span className="genres">
                {game.genres.map((genre, i) => (
                  <span key={i}>{genre.name}</span>
                ))}
              </span>
            </ListGroup.Item>
          </ListGroup>
          <Button variant="primary">Show more like this</Button>
          <Button variant="primary">Hide this game</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default GameCard;
