import axios from "axios";

const login = (payload) => axios.post("/session", payload);

const authenticationApi = {
  login,
};

export default authenticationApi;
