import axios from "axios";

const addQuiz = (payload) => axios.post("/quizzes", payload);

const updateQuiz = (payload, quizId) =>
  axios.patch(`/quizzes/${quizId}`, payload);

const getQuizToEdit = (quizId) => axios.get(`/quizzes/${quizId}/edit`);

const deleteQuiz = (quizId) => axios.delete(`/quizzes/${quizId}`);

const showQuizDetails = (quizId) => axios.get(`/quizzes/${quizId}`);

const quizList = () => axios.get("/quizzes");

const publishQuiz = (quizId) => axios.patch(`/quizzes/${quizId}/publish`);

const quizApi = {
  addQuiz,
  quizList,
  updateQuiz,
  getQuizToEdit,
  deleteQuiz,
  showQuizDetails,
  publishQuiz,
};

export default quizApi;
