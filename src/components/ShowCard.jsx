import { Link } from "react-router-dom";
import "./ShowCard.css";
import Rating from "./Rating";
const ShowCard = ({ item }) => {
  const picPath = "https://image.tmdb.org/t/p/original";
  return (
    <Link
      to={`/watch?id=${item.id}`}
      className="card"
      style={{
        backgroundImage: `url(${picPath + item.poster_path})`,
        backgroundSize: "cover",
      }}
    >
      <div className="playTriangle"></div>
      <div className="cardContent">{item.title || item.name}</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Rating
          value={item.vote_average}
          style={{
            transform: "scale(0.5)",
            position: "relative",
            top: "15px",
            right: "35px",
          }}
        ></Rating>
        <div
          style={{
            position: "absolute",
            color: "#fff",
            textShadow: "0px 0px 2px black",
          }}
        >
          {item.release_date || item.first_air_date}
        </div>
        <div className="language">{item.original_language}</div>
      </div>
    </Link>
  );
};
Link;

export default ShowCard;
