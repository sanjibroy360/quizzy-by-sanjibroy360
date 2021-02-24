import axios from "axios";

const getReport = () => axios.get(`/attempts`);

const reportApi = {
  getReport,
};

export default reportApi;
