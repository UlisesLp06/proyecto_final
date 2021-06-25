import React from 'react';
import {Header, Titulo} from './../elementos/Header';
import {Helmet} from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import {useParams} from 'react-router-dom';
import useObtenerGasto from './../Hooks/useObtenerGasto';

const EditarGasto = () => {
	const {id} = useParams();// acceder los parametros de la pagina para extrar el id del objeto
	const [gasto] = useObtenerGasto(id);

	return (
		<>
			<Helmet>
				<title>Editar Gasto</title>
			</Helmet>

			<Header>
				<BtnRegresar ruta="/Lista"/>
				<Titulo>Editar Gasto</Titulo>
			</Header>

			<FormularioGasto gasto={gasto} />

			<BarraTotalGastado />
		</>
	);
}
 
export default EditarGasto;