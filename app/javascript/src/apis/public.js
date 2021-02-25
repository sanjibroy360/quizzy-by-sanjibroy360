import axios from "axios";

const getQuizDetails = (slug) => axios.get(`/public/${slug}/details`);

const attemptQuiz = (payload, slug) =>
  axios.post(`/attempts`, payload);

const getAllQuestions = (slug) => axios.get(`/public/${slug}/questions`);

const submitAnswers = (payload, slug, attemptId) =>
  axios.put(`/attempts/${attemptId}`, payload);

const getSubmittedAnswers = (slug, attemptId) =>
  axios.get(`/attempts/${attemptId}`);

const publicApi = {
  getQuizDetails,
  attemptQuiz,
  getAllQuestions,
  submitAnswers,
  getSubmittedAnswers,
};

export default publicApi;
