import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import TopBar from "./components/TopBar";
import ShowCard from "./components/ShowCard";
import Loading from "./components/Loading";
import "./HomePage.css";

function HomePage() {
  const [page, setPage] = useLocalStorage("pageNo", 1);
  const [items, setItems] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [genreIds, setGenreIds] = useState([]);
  const [order, setOrder] = useState("popularity.desc");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const addGenre = (id) => {
    if (!genreIds.includes(id)) {
      setGenreIds([...genreIds, id]);
      setPage(1);
    }
  };
  const removeGenre = (id) => {
    setGenreIds(genreIds.filter((genre) => genre != id));
    setPage(1);
  };
  const getGenre = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((data) => data.json())
      .then((data) => setGenreList(data.genres));
  };
  const getItems = () => {
    setLoading(true);
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${order}&page=${page}&with_genres=${genreIds.toString()}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.results);
        setLoading(false);

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
  };
  useEffect(() => {
    getItems();
    getGenre();
  }, [page, genreIds, order, query]);
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "98.9vw",
            height: "100vh",
          }}
        >
          <TopBar
            genres={genreList}
            addGenre={addGenre}
            RemoveGenre={removeGenre}
            setOrder={setOrder}
            order={order}
            setQuery={setQuery}
            setPage={setPage}
          ></TopBar>
          <div
            style={{
              width: "87%",
              paddingTop: "150px",
              paddingBottom: "100px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "8vw",
            }}
          >
            {!loading ? (
              items.map((item) => {
                return <ShowCard key={item.id} item={item}></ShowCard>;
              })
            ) : (
              <Loading />
            )}
          </div>

          <div className="pageSelector">
            {page != 1 && (
              <div
                className="prevBut"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <img
                  width="30"
                  height="51"
                  src="/previous.png"
                  alt="chevron-left"
                />
              </div>
            )}
            <div
              className="nextBut"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <img width="30" height="51" src="/next.png" alt="chevron-left" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
