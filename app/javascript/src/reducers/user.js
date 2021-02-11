const initialState = { user: null };
const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      return {
        ...state,
        user: payload.user,
      };
    }

    case "REMOVE_USER": {
      return initialState;
    }
    default:
      return state
  }
};

export default userReducer;
