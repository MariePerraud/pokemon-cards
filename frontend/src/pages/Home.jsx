import React, { useState, useEffect } from "react";
import fleche from "../assets/fleche.png";

function Home() {
  const [types, setTypes] = useState([]);
  const [displayCard, setDisplayCard] = useState([]);
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetch("https://api.pokemontcg.io/v2/types")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data.data);
      });
  }, []);

  if (count <= 0) {
    setCount(1);
  } else if (count > 59) {
    setCount(59);
  } else {
    useEffect(() => {
      fetch(`https://api.pokemontcg.io/v2/cards?page=${count}`)
        .then((response) => response.json())
        .then((data2) => {
          setDisplayCard(data2.data);
        });
    }, [count]);
  }

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "center",
          backgroundColor: "crimson",
        }}
      >
        <button
          style={{ alignSelf: "center", verticalAlign: "middle" }}
          type="button"
          onClick={() => {
            setCount(count - 1);
          }}
        >
          -
        </button>
        <p>&nbsp;page: {count} / 59&nbsp;</p>
        <button
          style={{ alignSelf: "center" }}
          type="button"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
        <p style={{ marginLeft: "50px" }}>Filter by type:&nbsp;</p>
        <select onChange={handleFilter}>
          <option value="">All</option>
          {types.map((result) => (
            <option key={result} value={result}>
              {result}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {displayCard
          // eslint-disable-next-line eqeqeq
          .filter((card) => card.types == filter || filter === "")
          .map((card) => (
            <div key={card.id}>
              <h3>{card.name}</h3>
              <img
                src={card.images.large}
                alt={card.name}
                style={{ width: "245px", height: "342px" }}
              />
            </div>
          ))}
      </div>
      <div
        style={{
          position: "fixed",
          width: "50px",
          height: "50px",
          bottom: "30px",
          right: "30px",
        }}
      >
        <a href="#top">
          <img
            style={{
              height: "40px",
              backgroundColor: "crimson",
              borderRadius: "50px",
              padding: "10px",
            }}
            src={fleche}
            alt=""
          />
        </a>
      </div>
    </div>
  );
}
export default Home;
