import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import GameCard from "../components/Card/GameCard";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000`);

        setGames(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Games list loading... </div>
      ) : (
        <Container>
          <Row>
            <h1>New and trending</h1>
            <p>Based on player counts and release date</p>
          </Row>
          <Row>
            {games.map((game, i) => (
              <GameCard key={i} {...game} />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
