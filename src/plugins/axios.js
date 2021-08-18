import axios from "axios";
import config from "../core/config";

const api = axios.create({
  baseURL: config.baseApiUrl,
  timeout: 5000,
});

export default api;
