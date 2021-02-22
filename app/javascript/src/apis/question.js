import axios from "axios";

const createQuestion = (payload, quizId) =>
  axios.post(`/quizzes/${quizId}/questions`, payload);

const showQuestions = (quizId) => axios.get(`/quizzes/${quizId}/questions`);

const getQuestionToEdit = (quizId, questionId) =>
  axios.get(`/quizzes/${quizId}/questions/${questionId}/edit`);

const updateQuestion = (quizId, questionId, payload) =>
  axios.patch(`/quizzes/${quizId}/questions/${questionId}`, payload);

const deleteQuestion = (quizId, questionId) =>
  axios.delete(`/quizzes/${quizId}/questions/${questionId}`);

const questionApi = {
  createQuestion,
  showQuestions,
  getQuestionToEdit,
  updateQuestion,
  deleteQuestion,
};

export default questionApi;
