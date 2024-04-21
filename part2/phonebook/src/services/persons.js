import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(`${baseUrl}`, newPerson)
  return request.then(response => response.data)
}


const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updatePerson = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person)
  return request.then(response => response.data)
}

export default {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson
}