import axios from "./axios";

//Funcion para optener los datos de la API
export const getDataRequest = () => axios.get('/client');

//Funcion para enviar los datos a la API
export const postDataRequest = (data) => axios.post('client', data);

//Funcion para eliminar los datos de la API
export const deleteClientById = (id) => axios.delete(`client/${id}`);

//Funcion para actualizar los datos de la API
export const updateClientById = (id, data) => {
    const dataFinal = {
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        age: data.get('age'),
        address: data.get('address'),
        image: data.get('image'),
        newImage: data.get('newImage')
    };

    return axios.put(`client/${id}`, dataFinal);
};

