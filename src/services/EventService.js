import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

const API_URL = getConfig().URL + "/event/";

const defaultHeaders = {
  'withCredentials': false,
  'responseType': 'json'
};

function getEvents() {
  return axios.get(API_URL, defaultHeaders);
}



export { getEvents };