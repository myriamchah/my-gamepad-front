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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000?ordering=${order}`
        );

        setGames(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [order]);

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
