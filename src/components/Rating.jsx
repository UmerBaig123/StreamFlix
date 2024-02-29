import { useEffect } from "react";
import "./Rating.css";

const Rating = ({ value, style }) => {
  return (
    <>
      <div className="ratingBox" style={style}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            className={
              Math.round(value / 2 + 0.1) >= 1
                ? "fa fa-star checked"
                : "fa fa-star"
            }
          ></span>
          <span
            className={
              Math.round(value / 2 + 0.1) >= 2
                ? "fa fa-star checked"
                : "fa fa-star"
            }
          ></span>
          <span
            className={
              Math.round(value / 2 + 0.1) >= 3
                ? "fa fa-star checked"
                : "fa fa-star"
            }
          ></span>
          <span
            className={
              Math.round(value / 2 + 0.1) >= 4
                ? "fa fa-star checked"
                : "fa fa-star"
            }
          ></span>
          <span
            className={
              Math.round(value / 2 + 0.1) >= 5
                ? "fa fa-star checked"
                : "fa fa-star"
            }
          ></span>
        </div>
        <div style={{ fontFamily: "Kode Mono" }}>{value} / 10</div>
      </div>
    </>
  );
};

export default Rating;
