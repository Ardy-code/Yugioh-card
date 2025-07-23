import React, { useState, useEffect } from "react";
import "./decks.css";

function Decks() {
  const [decks, setDecks] = useState([]);
  const [viewingDeck, setViewingDeck] = useState(null);
  const [editingDeck, setEditingDeck] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks")) || [];
    setDecks(storedDecks);
  }, []);

  const handleView = (deck) => {
    setViewingDeck(deck);
  };

  const handleEdit = (deck) => {
    setEditingDeck(deck);
    setEditedName(deck.name);
  };

  const handleDeleteDeck = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (!confirm) return;
    const newDecks = decks.filter((d) => d.id !== id);
    setDecks(newDecks);
    localStorage.setItem("decks", JSON.stringify(newDecks));
  };

  const handleRemoveCard = (cardId) => {
    const updated = {
      ...editingDeck,
      cards: editingDeck.cards.filter((c) => c.id !== cardId),
    };
    setEditingDeck(updated);
  };

  const handleSaveEdit = () => {
    const updated = decks.map((d) =>
      d.id === editingDeck.id
        ? {
            ...editingDeck,
            name: editedName,
            updatedAt: new Date().toLocaleDateString(),
          }
        : d
    );
    setDecks(updated);
    localStorage.setItem("decks", JSON.stringify(updated));
    setEditingDeck(null);
  };

  return (
    <div className="collection-container">
      <h2 className="collection-title">My Decks</h2>
      <p className="collection-subtitle">Manage and customize your decks</p>

      <div className="deck-grid">
        {decks.map((deck) => (
          <div key={deck.id} className="deck-card">
            <h3 className="deck-title">{deck.name}</h3>
            <div className="deck-badges">
              <span className="deck-badge yellow">
                {deck.cards.length} cards
              </span>
              <span className="deck-badge date">{deck.updatedAt}</span>
            </div>
            <div className="deck-buttons">
              <button
                className="deck-btn view"
                onClick={() => handleView(deck)}
              >
                👁️ View
              </button>
              <button
                className="deck-btn edit"
                onClick={() => handleEdit(deck)}
              >
                ✏️ Edit
              </button>
              <button
                className="deck-btn delete"
                onClick={() => handleDeleteDeck(deck.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewingDeck && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>View Deck</h3>
            <p>
              <strong>{viewingDeck.name}</strong>
            </p>
            <p>
              {viewingDeck.cards.length} cards • Last updated:{" "}
              {viewingDeck.updatedAt}
            </p>
            <h4>Cards</h4>
            <div className="card-grid">
              {viewingDeck.cards.map((card) => (
                <div key={card.id} className="view-card">
                  <div>
                    <img
                      src={card.image}
                      alt={card.name}
                      style={{
                        width: "120px",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    ></img>
                    <p>
                      <strong>{card.name}</strong>
                    </p>
                    <p>Type: {card.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setViewingDeck(null)}>Close</button>
          </div>
        </div>
      )}

      {editingDeck && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Deck</h3>
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <h4>Cards</h4>
            <div className="card-grid">
              {editingDeck.cards.map((card) => (
                <div key={card.id} className="edit-card">
                  <img
                    src={card.image}
                    alt={card.name}
                    style={{
                      width: "120px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <p>{card.name}</p>
                  <span className="card-type">{card.type}</span>
                  <button onClick={() => handleRemoveCard(card.id)}>🗑️</button>
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button onClick={() => setEditingDeck(null)}>Cancel</button>
              <button onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Decks;
