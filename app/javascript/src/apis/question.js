import axios from "axios";

const createQuestion = (payload, quizId) =>
  axios.post(`/quizzes/${quizId}/questions`, payload);

const questionApi = {
  createQuestion,
};

export default questionApi;
