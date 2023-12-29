import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import GameCard from "../components/Card/GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MyCollection = ({ token }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/my-collection",
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [token]);

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
          <Row className="row-cols-6 mt-5">
            {games.map((game) => (
              <Col key={game.id} className="p-2">
                <GameCard {...game} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};
export default MyCollection;
