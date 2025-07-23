// authSlice.jsx

const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
const storedDecks = JSON.parse(localStorage.getItem("decks")) || [];
const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const storedAuth = localStorage.getItem("isAuthenticated") === "true";

const initialState = {
  isAuthenticated: storedAuth,
  user: storedUser,
  registeredUsers: storedUsers,
  decks: storedDecks,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "REGISTER": {
      const updatedUsers = [...state.registeredUsers, action.payload];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      return {
        ...state,
        registeredUsers: updatedUsers,
      };
    }

    case "LOGIN": {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    }

    case "LOGOUT": {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }

    case "CREATE_DECK": {
      const updatedDecks = [...state.decks, action.payload];
      localStorage.setItem("decks", JSON.stringify(updatedDecks));
      return {
        ...state,
        decks: updatedDecks,
      };
    }

    case "ADD_CARD_TO_DECK": {
      const updatedDecks = state.decks.map((deck) =>
        deck.name === action.payload.deckName
          ? { ...deck, cards: [...deck.cards, action.payload.card] }
          : deck
      );
      localStorage.setItem("decks", JSON.stringify(updatedDecks));
      return {
        ...state,
        decks: updatedDecks,
      };
    }

    default:
      return state;
  }
}
