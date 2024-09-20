import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

const API_URL = `${getConfig().URL}/auth`;

function login(credentials) {
    return axios.post(`${API_URL}/login`, credentials);
}

export { login };