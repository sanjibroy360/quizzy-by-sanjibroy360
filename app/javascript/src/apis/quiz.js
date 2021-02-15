import axios from "axios";

const addQuiz = (payload) => axios.post("/quizzes", payload);

const quizApi = { addQuiz };

export default quizApi;
