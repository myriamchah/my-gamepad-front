import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import InfiniteScroll from "react-infinite-scroll-component";

import GameCard from "../components/Card/GameCard";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [order, setOrder] = useState("");
  const [gamePlay, setGamePlay] = useState("singleplayer,multiplayer");
  const [platform, setPlatform] = useState("1,2,3");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000?ordering=${order}&tags=${gamePlay}&parent_platforms=${platform}`
        );

        setGames(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [order, gamePlay, platform]);

  const fetchMoreData = () => {
    axios
      .get(`http://localhost:3000?page=${page}`)
      .then((res) => {
        setGames((prevGames) => [...prevGames, ...res.data.results]);
        res.data.results.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      {isLoading ? (
        <div>Games list loading... </div>
      ) : (
        <InfiniteScroll
          dataLength={games.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div>... </div>}
        >
          <Row>
            <h1>New and trending</h1>
            <p>Based on player counts and release date</p>
          </Row>
          <Row lg={6} className="mb-3">
            <Col>
              <Form.Select
                aria-label="Order by"
                size="sm"
                onChange={(e) => setOrder(e.target.value)}
              >
                <option>Order by</option>
                <option value="name">Name</option>
                <option value="released">Release date</option>
                <option value="rating">Rating</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Filter by Gameplay"
                size="sm"
                onChange={(e) => setGamePlay(e.target.value)}
              >
                <option value="singleplayer,multiplayer">Gameplay</option>
                <option value="singleplayer">Single Player</option>
                <option value="multiplayer">Multiplayer</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Filter by Platform"
                size="sm"
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="1,2,3">Platforms</option>
                <option value="1">PC</option>
                <option value="2">PlayStation</option>
                <option value="3">Xbox</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="cards-grid">
            {games.map((game, i) => (
              <GameCard key={i} {...game} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default Home;
