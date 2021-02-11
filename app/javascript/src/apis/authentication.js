import axios from "axios";

const login = (payload) => axios.post("/session", payload);

const logout = () => axios.delete("/session");

const authenticationApi = {
  login,
  logout
};

export default authenticationApi;
