import React, { useEffect, useState } from "react";
import "./search.css";

function Search() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterRace, setFilterRace] = useState("All");

  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=100&offset=0")
      .then((res) => res.json())
      .then((data) => setCards(data.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCards = cards.filter((card) => {
    const matchName = card.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || card.type === filterType;
    const matchRace = filterRace === "All" || card.race === filterRace;
    return matchName && matchType && matchRace;
  });

  const allTypes = [
    "All",
    ...new Set(cards.map((c) => c.type).filter(Boolean)),
  ];
  const allRaces = [
    "All",
    ...new Set(cards.map((c) => c.race).filter(Boolean)),
  ];

  return (
    <div className="collection-container">
      <h2 className="collection-title">Advanced Card Search</h2>
      <p className="collection-subtitle">
        Search and filter Yu-Gi-Oh! cards with precision
      </p>

      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {allTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={filterRace}
          onChange={(e) => setFilterRace(e.target.value)}
        >
          {allRaces.map((race, idx) => (
            <option key={idx} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>

      <div className="card-grid">
        {filteredCards.map((card) => (
          <div key={card.id} className="card-item">
            <img src={card.card_images[0].image_url} alt={card.name} />
            <h4>{card.name}</h4>
            <p>{card.type}</p>
            <p>{card.race}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
