import axios from "axios";

const addQuiz = (payload) => axios.post("/quizzes", payload);

const quizList = () => axios.get("/quizzes");

const quizApi = {
  addQuiz,
  quizList,
};

export default quizApi;
