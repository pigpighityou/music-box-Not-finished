import axios from "axios";

let root = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  withCredentials: true,
});




export default root;
