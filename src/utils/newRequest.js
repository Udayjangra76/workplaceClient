
import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://workplace-hp8z.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;