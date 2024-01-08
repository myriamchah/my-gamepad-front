import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import GameCard from "../components/Card/GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUserContext } from "../contexts/userContext";

const MyCollection = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/my-collection`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setGames(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            <Col>
              <h1>My Collection</h1>
            </Col>
          </Row>

          {games.length ? (
            <div className="mt-5 cards-grid-6">
              {games.map((game) => (
                <GameCard {...{ game }} allowDelete="true" key={game.id} />
              ))}
            </div>
          ) : (
            <Row>
              <Col
                style={{ height: "70vh" }}
                className="d-flex align-items-center justify-content-center"
              >
                You didn't save any game to your collection yet. &nbsp;
                <Link to="/">Browse!</Link>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};
export default MyCollection;
