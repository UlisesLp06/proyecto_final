import {db} from './firebaseConfig';

const editarGasto = ({id, categoria, descripcion, cantidad}) => {
	return db.collection('gasto').doc(id).update({
		categoria: categoria,
		descripcion: descripcion,
		cantidad: Number(cantidad),
	
	});
}

export default editarGasto;