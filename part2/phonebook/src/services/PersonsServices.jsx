import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // Lanzar el error para que se pueda manejar en el componente
    });
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating data:', error);
      throw error;
    });
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating data:', error);
      throw error;
    });
}

const delPerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting data:', error);
      throw error;
    });
}

export default { getAll, create, update, delPerson }
