import React, { createContext, useState} from "react";
import { getDataRequest } from '../api/dataEntry.js';


const initialState = [];

export const AppContext = createContext();
const AppProvider = ({children}) => {

    //Estado inicial de los clientes
    const [clientes, setCLientes] = useState(initialState);

    //Estado inicial de los clientes seleccionados para eliminacion
    const [idClientDelete, setidClientDelete] = useState();

    //Estado inicial de los clientes seleccionados para edicion seteo de datos
    const [ClientEdit, setClientEdit] = useState();

    //Funcionalidad que indica si esta editando o no
    const [isEditing, setIsEditing] = useState(false); // Variable para indicar si se está en modo de edición

    //Funcion para obtener los clientes
    const getclient = async () => {
        try {
            const response = await getDataRequest();
            setCLientes(response.data);
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return(
        //uso del children para que se renderice el componente que se le pase
        <AppContext.Provider value={{ clientes, setCLientes, getclient, idClientDelete, setidClientDelete, ClientEdit, setClientEdit, isEditing, setIsEditing}}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;