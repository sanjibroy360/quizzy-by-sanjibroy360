import axios from "axios";

const createQuestion = (payload, quizId) =>
  axios.post(`/quizzes/${quizId}/questions`, payload);

const showQuestions = (quizId) => axios.get(`/quizzes/${quizId}/questions`);

const questionApi = {
  createQuestion,
  showQuestions
};

export default questionApi;
