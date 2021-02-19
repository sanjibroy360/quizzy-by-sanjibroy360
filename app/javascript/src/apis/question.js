import axios from "axios";

const createQuestion = (payload) => axios.post("/questions", payload);

const questionApi = {
  createQuestion,
};

export default questionApi;
