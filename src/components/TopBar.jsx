import { useState } from "react";
import GenreList from "./GenreList";
import "./TopBar.css";

const TopBar = ({
  genres,
  addGenre,
  RemoveGenre,
  setOrder,
  order,
  setQuery,
  setPage,
}) => {
  const [genre, setGenre] = useState(false);
  const toggleGenre = () => {
    if (genre) {
      document.getElementsByClassName("dropdown")[0].style.height = "0px";
      setTimeout(() => {
        setGenre(false);
      }, 500);
    } else {
      setGenre(true);
      setTimeout(() => {
        document.getElementsByClassName("dropdown")[0].style.height = "270px";
      }, 0);
    }
  };
  return (
    <>
      <div
        hidden={!genre}
        onClick={() => {
          toggleGenre();
        }}
        style={{
          zIndex: 1,
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      ></div>

      <div className="bar">
        <div
          className="title"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          StreamFlix
        </div>
        <div
          style={{
            display: "flex",
            gap: "50px",
            marginLeft: "30vw",
            width: "30vw",
            justifyContent: "center",
          }}
        >
          <button
            className="button"
            onClick={() => {
              toggleGenre();
            }}
          >
            Genre
          </button>
          <div hidden={!genre} className="dropdown">
            <div className="dropContent">
              {genres.map((genre) => {
                return (
                  <GenreList
                    key={genre.id}
                    genre={genre}
                    addGenre={addGenre}
                    RemoveGenre={RemoveGenre}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <input
          placeholder="search"
          className="barInp"
          onChange={(e) => {
            setQuery(e.target.value.replace(" ", "%20"));
            setPage(1);
          }}
        ></input>
      </div>
    </>
  );
};

export default TopBar;
