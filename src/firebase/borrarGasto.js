import {db} from './firebaseConfig';

const borrarGasto = (id) => {
	db.collection('gasto').doc(id).delete();
}

export default borrarGasto;