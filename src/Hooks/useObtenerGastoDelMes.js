import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import {startOfMonth, endOfMonth, getUnixTime} from 'date-fns';
import {useAuth} from './../contextos/AuthContext';

const useObtenerGastosDelMes = () => {
	const [gastos, establecerGastos] = useState([]);
	const {usuario} = useAuth();

	useEffect(() => {
		const inicioDeMes = getUnixTime(startOfMonth(new Date()));
		const finDeMes = getUnixTime(endOfMonth(new Date()));

		if(usuario){
			const unsuscribe = db.collection('gasto')
			//.orderBy('cantidad', 'desc')
			.where('uidUsuario', '==', usuario.uid)
			.onSnapshot((snapshot) => {

				establecerGastos(snapshot.docs.map((documento) => {
					return {...documento.data(), id: documento.id}
				}))
			})

			// Use Effect tiene que retornar una funcion que se va a ejecutar cuando se desmonte el componente.
			// En este caso queremos que ejecute el unsuscribe a la coleccion de firestore.
			return unsuscribe;
		}
	}, [usuario]);

	return gastos;
}
 
export default useObtenerGastosDelMes;