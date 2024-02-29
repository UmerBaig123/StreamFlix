import { useState } from "react";

const GenreList = ({ genre, addGenre, RemoveGenre }) => {
  const [toggled, setToggled] = useState(false);
  return (
    <div
      className="genre"
      key={genre.id}
      style={{
        backgroundColor: toggled && "rgb(120, 45, 128)",
      }}
      onClick={() => {
        setToggled(!toggled);

        //Condition is opposite because it takes some time to set the state
        if (!toggled) {
          addGenre(genre.id);
        } else {
          RemoveGenre(genre.id);
        }
      }}
    >
      {genre.name}
    </div>
  );
};

export default GenreList;
