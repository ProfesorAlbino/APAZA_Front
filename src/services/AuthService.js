import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

const API_URL = `${getConfig().URL}/user`;

const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false,
    responseType: 'json'
};

function register(user) {
    return axios.post(`${API_URL}/`, user, defaultHeaders);
}

function login(user) {
    return axios.post(`${API_URL}/login`, user, defaultHeaders);
}

export { login, register };