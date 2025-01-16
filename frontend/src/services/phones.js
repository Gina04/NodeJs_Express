import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

/*const getAll= () =>{
    const request = axios.get(baseUrl)
    console.log('Data fetched from backend:', response.data);
    return request.then(response => response.data)
}*/

const getAll = () => {
    // Realizamos la solicitud GET con axios
    const request = axios.get(baseUrl);
    
    // Manejamos la respuesta dentro del then, no antes
    return request.then(response => {
      // Ahora puedes acceder a response.data correctamente
      console.log('Data fetched from backend:', response.data);
      return response.data;
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
        return request.then(response => response.data)
}

// Nueva función para eliminar un recurso
const remove = id =>{
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
}

const update = (id, newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
        
export default{create, getAll, remove, update};