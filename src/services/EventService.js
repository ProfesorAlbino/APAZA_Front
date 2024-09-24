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

function getEvent(id) {
  return axios.get(API_URL + id, defaultHeaders);
}

function addEvent(event) {
  const eventData = new FormData();
  eventData.append('title', event.title);
  eventData.append('description', event.description);
  eventData.append('date', event.date);
  eventData.append('type', event.type);
  eventData.append('image', event.image);

  return axios.post(API_URL, eventData);
}

function deleteEvent(id) {
  return axios.delete(API_URL + id, defaultHeaders);
}


export { getEvents, getEvent, addEvent, deleteEvent };