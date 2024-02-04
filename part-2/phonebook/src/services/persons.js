import axios from "axios";

const baseUl = 'http://localhost:3001/persons';


const getAll = () => {
  const req = axios.get(baseUl)
  return req.then(resp => resp.data)
}


const createPerson = (person) => {
  const req = axios.post(baseUl, person)
  return req.then(resp => resp.data)
}

const updatePerson = (person) => {
  const req = axios.put(`${baseUl}/${person.id}`, person)
  return req.then(resp => resp.data)
}


const deletePerson = (id) => {
  return axios.delete(`${baseUl}/${id}`);
}



export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
}