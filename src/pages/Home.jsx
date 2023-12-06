import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.rawg.io/api/games?key=ADD_KEY`
        );

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
        <div>
          {games.map((game, i) => (
            <div key={i}>{game.name}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
