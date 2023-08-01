import axios from "axios";

const instanciaAxios = axios.create({
    //baseURL: "http://127.0.0.1:8000",
    baseURL: "http://192.168.14.176:82/api",
    withCredentials: true,
});

export default instanciaAxios;