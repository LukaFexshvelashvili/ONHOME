import axios from "axios";

const axiosCall = axios.create({
  baseURL: "http://localhost/ONHOMEServer/v1/", // Set your default base URL here
});

export default axiosCall;
// baseURL: "https://api.onhome.ge/v1/", // Set your default base URL here
