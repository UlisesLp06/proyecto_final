import React  from 'react';
import Boton from './Boton';
import { auth } from './../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';


const BotonCerrarSesion=()=>{
    const history=useHistory();
    const cerrarSesion=async ()=>{
        try{
        await auth.signOut();
        history.push('/iniciar-sesion');
    }catch(error){
        console.log(error);
    }
}

    return (
        <Boton as="button" onClick={cerrarSesion}>
        Cerrar Sesion</Boton>
    );


}

export default BotonCerrarSesion;