import axios from "axios";
import { getConfig } from "@/config/BasicConfig";


//const API_URL = getConfig().URL + "/gallery/";

function getAPIUrl() {
  return getConfig().URL + "/gallery/";
}

const defaultHeaders = {
    'withCredentials': false,
    'responseType': 'json'
};

function getGallery(page) {
  const limit = 5;
  return axios.get(getAPIUrl(), {
    params: { page, limit }, 
    ...defaultHeaders
  });
}

function addGallery(gallery){
  const eventData = new FormData();
  eventData.append('year', gallery.year);
  eventData.append('description', gallery.description);
  // Recorrer y agregar cada imagen al FormData
  gallery.images.forEach((image) => {
    eventData.append('images', image);
  });

  return axios.post(getAPIUrl(), eventData);
}

function updateGallery(gallery){
  const eventData = new FormData();
  eventData.append('id', gallery.id);
  //eventData.append('year', gallery.year);
  eventData.append('description', gallery.description);
  // Recorrer y agregar cada imagen al FormData
  gallery.images.forEach((image) => {
    eventData.append('newImages', image);
  });

  eventData.append('trashImages', gallery.trashImages);

  return axios.put(getAPIUrl() , eventData);
}

function deleteGallery(id){
  return axios.delete(getAPIUrl() + id);
}

export {getGallery, addGallery,deleteGallery,updateGallery};