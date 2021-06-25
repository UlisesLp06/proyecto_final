import {useEffect, useState} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useHistory} from 'react-router-dom';

const useObtenerGasto = (id) => {
	const history = useHistory();
	const [gasto, establecerGasto] = useState('');
	
	useEffect(() => {
		db.collection('gasto').doc(id).get()
		.then((doc) => {
			if(doc.exists){
				establecerGasto(doc);
			} else {	
				history.push('/Lista');
			}
		})
	}, [history, id]);

	return [gasto];
}
 
export default useObtenerGasto;