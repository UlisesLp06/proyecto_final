import React from 'react';
import { useAuth } from './../contextos/AuthContext';
import { Route,Redirect } from 'react-router-dom';


const RutaProtegida=({children, ...restoDePropiedades})=>{
   const {usuario}=useAuth();
   if(usuario){
       return <Route {...restoDePropiedades}>{children}</Route>
   }else{
       return <Redirect to="/iniciar-sesion"/>
   }
}

export default RutaProtegida