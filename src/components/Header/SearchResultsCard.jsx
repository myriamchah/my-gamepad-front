import Card from "react-bootstrap/Card";
import "./header.scss";
const SearchResultsCard = ({ games }) => {
  return (
    <Card>
      <p className="title">
        Games <span>{games.count}</span>
      </p>
      {games.results.map((game) => (
        <div key={game.name} className="d-flex align-items-center my-1">
          <img src={game.background_image} alt={game.name} />
          <div className="px-2">
            <div className="bg-platforms mb-1">
              {game.parent_platforms.map((p, i) => (
                <div
                  key={i}
                  className={`bg-platform-${p.platform.name.toLowerCase()}`}
                ></div>
              ))}
            </div>
            <span className="fw-bolder">{game.name}</span>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default SearchResultsCard;
