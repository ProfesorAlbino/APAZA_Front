import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

//const API_URL = getConfig().URL + "/gallery/";

function getAPIUrl() {
  return getConfig().URL + "/user";
}

const defaultHeaders = {
    'withCredentials': false,
    'responseType': 'json'
};

function getGallery() {
    return axios.get(getAPIUrl(), defaultHeaders);
}

function addGallery(gallery){
  const eventData = new FormData();
  eventData.append('year', gallery.year);
  eventData.append('description', gallery.description);
  eventData.append('images', gallery.images);

  return fetch('/gallery', {
    method: 'POST',
    body: eventData
});
}

export {getGallery, addGallery};