import  { useState, useEffect } from "react"
import {db} from './../firebase/firebaseConfig';
import { useAuth } from "./../contextos/AuthContext";
const useObtenerGastos=()=>{
    const {usuario}=useAuth();
    const [gastos,cambiarGastos]=useState([1,2,3]);

    //extramos de que usuario es
    useEffect(()=>{
        const unsuscribe=db.collection('gasto')
        .where('uidUsuario', '==', usuario.uid)
        .limit(10)
        .onSnapshot((snapshot)=>{
            cambiarGastos(snapshot.docs.map((gasto)=>{
                //obtenemos propiedades de los gastos
                return {...gasto.data(), id: gasto.id}
                
            }));
            
        });
            return unsuscribe;
        
    },[usuario]);

    return [gastos];


}

export default useObtenerGastos;