import { useEffect, useState } from "react";
import "./MovieView.css";
import Rating from "./components/Rating";

const MovieView = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [rendered, setRendered] = useState(false);
  const [id, setId] = useState(0);
  const getMovieDetail = (ID) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${ID}?api_key=3da5ed208bafb058a6596628304bda04`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
        setRendered(true);
      });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    let ID = searchParams.get("id");
    setId(ID);
    getMovieDetail(ID);
  }, []);
  return (
    <>
      <div className="full">
        <div className="topBar">
          <div className="barContent">
            <div
              className="title"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              StreamFLix
            </div>
          </div>
        </div>
        <div className="movieContainer">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "5vh",
              width: "95%",
              marginLeft: "2.5%",
              gap: "2vw",
            }}
          >
            <div className="movie">{movieDetail.title || movieDetail.name}</div>
            {rendered &&
              movieDetail.genres.map((genre) => {
                return <div className="movieGenre">{genre.name}</div>;
              })}
          </div>
          <div className="viewerContainer">
            <div className="viewer">
              <iframe
                id="player_iframe"
                src={`https://vidsrc.net/embed/movie?tmdb=${id}&color=fff`}
                frameborder="0"
                allowfullscreen="yes"
                style={{ width: "100%", height: "100%" }}
                onload="remove_loading(this)"
                data-ref=""
                referrerpolicy="origin"
              ></iframe>
            </div>
          </div>
          <div
            style={{
              marginLeft: "2.5%",
              display: "flex",
              height: "100%",
              flexDirection: "row",
              width: "95%",
              fontSize: "15px",
              color: "rgb(120,120,120)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "10px",
                alignItems: "center",
                fontFamily: "Concert One",
              }}
            >
              {rendered &&
                (movieDetail.release_date || movieDetail.first_air_date)}
              <Rating value={movieDetail.vote_average} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                marginLeft: "2.5vw",
                padding: "10px",
                height: "75%",
                boxShadow: "inset 0px 0px 10px 0px rgb(0,0,0)",
                border: "1px solid rgb(0,0,0)",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  color: "white",
                  fontFamily: "Concert One",
                }}
              >
                Summary:&nbsp;
              </div>
              {movieDetail.overview}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MovieView;
