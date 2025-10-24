import axios from "axios";
const baseUrl = "https://thoughts-p437.onrender.com/api/thoughts";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const addLike = (id, like) => {
  const request = axios.patch(`${baseUrl}/${id}`, like);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getOne,
  addLike,
  create,
};
