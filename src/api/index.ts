import axios from "axios";

const apiConfig = {
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "aplication/json",
  },
};

const ApiInstance = axios.create(apiConfig);

export default ApiInstance;
