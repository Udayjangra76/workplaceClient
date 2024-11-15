
import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://workplace-fawn.vercel.app/api/",
  withCredentials: true,
});

export default newRequest;
