import React, { useEffect, useState } from "react";
import "./content.css";
import { useDispatch, useSelector } from "react-redux";

function Content() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newDeckName, setNewDeckName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [detailCard, setDetailCard] = useState(null);

  const dispatch = useDispatch();
  const decks = useSelector((state) => state.decks);

  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=50&offset=0")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddToDeck = (card) => {
    const minimalCard = {
      id: card.id,
      name: card.name,
      type: card.type,

      image: card.card_images[0].image_url,
    };

    setSelectedCard(minimalCard);
    setShowModal(true);
  };

  const handleCreateDeck = () => {
    if (!newDeckName) return;

    const newDeck = {
      id: Date.now(),
      name: newDeckName,
      cards: [],
      updateAt: new Date().toLocaleDateString(),
    };

    dispatch({ type: "CREATE_DECK", payload: newDeck });

    dispatch({
      type: "ADD_CARD_TO_DECK",
      payload: { deckName: newDeckName, card: selectedCard },
    });

    setNewDeckName("");
    setShowModal(false);
  };

  const handleAddToExistingDeck = (deckName) => {
    dispatch({
      type: "ADD_CARD_TO_DECK",
      payload: { deckName, card: selectedCard },
    });
    setShowModal(false);
  };

  const handleShowDetail = (card) => {
    setDetailCard(card);
  };

  const closeDetailModal = () => {
    setDetailCard(null);
  };

  return (
    <div className="collection-container">
      <h2 className="collection-title">Card Collection</h2>
      <p className="collection-subtitle">
        Browse through powerful Yu-Gi-Oh! cards and add them to your decks
      </p>

      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card-item"
            onClick={() => handleShowDetail(card)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={card.card_images[0].image_url}
              alt={card.name}
              className="card-image"
            />
            <h3 className="card-name">{card.name}</h3>
            <div className="card-tags">
              <span className="card-type">{card.type}</span>
              {card.archetype && (
                <span className="card-archetype">{card.archetype}</span>
              )}
              {card.race && <span className="card-rarity">{card.race}</span>}
            </div>
            <p className="card-desc">{card.desc.slice(0, 100)}...</p>
            <button
              className="add-button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToDeck(card);
              }}
            >
              + Add to Deck
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ color: "#f5c518" }}>
              Add "{selectedCard.name}" to Deck
            </h3>

            <p>
              <strong>Add to existing deck</strong>
            </p>
            {decks.length === 0 ? (
              <p>No decks available. Create one below!</p>
            ) : (
              decks.map((deck) => (
                <button
                  key={deck.name}
                  onClick={() => handleAddToExistingDeck(deck.name)}
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  {deck.name}
                </button>
              ))
            )}

            <p>
              <strong>Create new deck</strong>
            </p>
            <input
              type="text"
              placeholder="New deck name"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleCreateDeck}>+ Add Card</button>
            </div>
          </div>
        </div>
      )}

      {detailCard && (
        <div className="modal-overlay" onClick={closeDetailModal}>
          <div
            className="modal-content detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={detailCard.card_images[0].image_url}
              alt={detailCard.name}
              style={{
                width: "200px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h2 style={{ color: "#f5c518" }}>{detailCard.name}</h2>
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {detailCard.type}
            </p>

            {detailCard.archetype && (
              <p
                style={{
                  fontSize: "14px",
                  color: "#4ade80",
                  marginBottom: "4px",
                }}
              >
                Archetype: {detailCard.archetype}
              </p>
            )}

            {detailCard.race && (
              <p
                style={{
                  fontSize: "14px",
                  color: "#38bdf8",
                  marginBottom: "10px",
                }}
              >
                Race: {detailCard.race}
              </p>
            )}

            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              {detailCard.desc}
            </p>

            <button
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={closeDetailModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
