import axios from "axios";

const getReport = () => axios.get(`/reports`);

const prepareReport = () => axios.post("/report_download");

const downloadReport = () =>
  axios.get("/report_download", { responseType: "blob" });
const reportApi = {
  getReport,
  prepareReport,
  downloadReport,
};

export default reportApi;
