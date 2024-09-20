import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

const API_URL = getConfig().URL + "/event/";

function getEvents() {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL,
    headers: {}
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  /*console.log("API_URL", API_URL);
  console.log(axios.get(API_URL, { withCredentials: true, responseType: "json" }));
  return axios.get(API_URL, { withCredentials: false, responseType: "json" });*/
}



export { getEvents };