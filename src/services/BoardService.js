import axios from "axios";
import { getConfig } from "@/config/BasicConfig";

//const API_URL = getConfig().URL + "/board/";
function getAPIUrl() {
  return getConfig().URL + "/board/";
}

const defaultHeaders = {
  'withCredentials': false,
  'responseType': 'json'
};

function getMembers() {
  return axios.get(getAPIUrl(), defaultHeaders);
}

function getMember(id) {
  return axios.get(getAPIUrl() + id, defaultHeaders);
}

function addMember(member) {
  const memberData = new FormData();
  memberData.append('role', member.role);
  memberData.append('name', member.name);
  memberData.append('image', member.image);

  return axios.post(getAPIUrl(), memberData);
}

function updateMember(member) {
    const memberData = new FormData();
    memberData.append('id', member.id);
    memberData.append('role', member.role);
    memberData.append('name', member.name);
    memberData.append('new-image', member.image);
  
    return axios.put(getAPIUrl(), memberData);
  }
  

function deleteMember(id) {
  return axios.delete(getAPIUrl() + id, defaultHeaders);
}


export { getMembers, getMember, addMember, deleteMember, updateMember };