import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

const API_URL = getConfig().URL + "/gallery/";

const defaultHeaders = {
    'withCredentials': false,
    'responseType': 'json'
};

function getGallery() {
    return axios.get(API_URL, defaultHeaders);
}

function addGallery(gallery){
  const eventData = new FormData();
  eventData.append('year', gallery.year);
  eventData.append('description', gallery.description);
  eventData.append('images', gallery.images);
}

export {getGallery, addGallery};