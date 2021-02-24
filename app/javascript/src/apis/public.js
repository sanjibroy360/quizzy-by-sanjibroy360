import axios from "axios";

const getQuizDetails = (slug) => axios.get(`/public/${slug}/details`);

const attemptQuiz = (payload, slug) =>
  axios.post(`/public/${slug}/attempts`, payload);

const getAllQuestions = (slug) => axios.get(`/public/${slug}/questions`);

const submitAnswers = (payload, slug, attemptId) =>
  axios.put(`/public/${slug}/attempts/${attemptId}`, payload);

const getSubmittedAnswers = (slug, attemptId) =>
  axios.get(`/public/${slug}/attempts/${attemptId}/submitted_answers`);

const publicApi = {
  getQuizDetails,
  attemptQuiz,
  getAllQuestions,
  submitAnswers,
  getSubmittedAnswers,
};

export default publicApi;
