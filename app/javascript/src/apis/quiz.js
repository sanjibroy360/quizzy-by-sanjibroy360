import axios from "axios";

const addQuiz = (payload) => axios.post("/quizzes", payload);

const updateQuiz = (payload, quizId) =>
  axios.patch(`/quizzes/${quizId}`, payload);

const getQuizDetails = (quizId) => axios.get(`/quizzes/${quizId}/edit`);

const deleteQuiz = (quizId) => axios.delete(`/quizzes/${quizId}`);

const quizList = () => axios.get("/quizzes");

const quizApi = {
  addQuiz,
  quizList,
  updateQuiz,
  getQuizDetails,
  deleteQuiz,
};

export default quizApi;
