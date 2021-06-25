import React from 'react';
import {db} from './firebaseConfig'

const agregarGasto=({categoria, descripcion, cantidad, uidUsuario})=>{
return db.collection('gasto').add({
   categoria: categoria,
   descripcion: descripcion,
   cantidad: Number(cantidad),
   uidUsuario: uidUsuario
});

}

export default agregarGasto;