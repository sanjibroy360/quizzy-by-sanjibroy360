const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER": {
      console.log(payload);
      return {
        ...state,
        user: payload.user,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
