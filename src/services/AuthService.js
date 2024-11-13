import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

//const API_URL = `${getConfig().URL}/user`;

function getAPIUrl() {
    return getConfig().URL + "/user";
}

const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false,
    responseType: 'json'
};

function register(user) {
    return axios.post(`${getAPIUrl()}/`, user, defaultHeaders);
}

function login(user) {
    return axios.post(`${getAPIUrl()}/login`, user, defaultHeaders);
}

export { login, register };