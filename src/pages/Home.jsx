import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";

import GameCard from "../components/Card/GameCard";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

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
