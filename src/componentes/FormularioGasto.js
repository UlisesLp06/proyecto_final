import React, {useState,useEffect} from 'react';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import Boton from './../elementos/Boton';
import SelectCategorias from './SelectCategorias';
import IconoCategoria from './../elementos/IconoCategoria';
import {ReactComponent as IconoDown} from './../imagenes/down.svg';
import agregarGasto from './../firebase/agregarGasto';
import {useAuth} from './../contextos/AuthContext';
import Alerta from './../elementos/Alerta';
import { useHistory } from 'react-router-dom';
import editarGasto from './../firebase/editarGasto';


//componente
const FormularioGasto=({gasto})=>{
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
	const [inputCantidad, cambiarInputCantidad] = useState('');
	const [categoria, cambiarCategoria] = useState('hogar');
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});
    const {usuario}=useAuth();
    const history=useHistory();

    //se ejecuta cuando cargamos la pagina 1 vez
    //comprobamos sihay algun gasto
    //establecemos todo el state con los valores de gasto
    useEffect(()=>{
    if(gasto){
            //comprobamos que sea del usuario actual
            //comprobamos con el iud guardado
            if(gasto.data().uidUsuario===usuario.uid){
                //obtemoes de la pagina useauth
                cambiarCategoria(gasto.data().categoria)
                cambiarInputDescripcion(gasto.data().descripcion)
                cambiarInputCantidad(gasto.data().cantidad)
        }else{
            history.push('/Lista')
        }
    }
    },[gasto, usuario]);

    //cambia el componente al recargar
    const handleChange = (e) => {
		if(e.target.name === 'descripcion'){
			cambiarInputDescripcion(e.target.value);
		} else if(e.target.name === 'cantidad'){
			cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
		}
	}
    // funcion que se ejecuta cuando enviamos los valores dentro del formulario
    const handleSubmit=(e)=>{
        e.preventDefault();
        let cantidad=parseFloat(inputCantidad).toFixed(2);

        //comprobamos descripcio y valor
        if(inputDescripcion!== '' && inputCantidad !==''){
                //editamos por id 
            if(gasto){
                editarGasto({
                id: gasto.id,
                categoria: categoria,
                descripcion: inputDescripcion,
                cantidad: inputCantidad,
                }).then(()=>{
                    history.push('/Lista');
                })
            }else{
            agregarGasto({
                categoria: categoria,
                descripcion: inputDescripcion,
                cantidad: inputCantidad,
                uidUsuario: usuario.uid
     
            });
            }
        }else{
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo:'error', mensaje: ' Rellena los campos'});
        }
        cambiarEstadoAlerta(true)
        cambiarAlerta({tipo: 'exito', mensaje:'El gasto fue agregado'})
       
       // console.log(inputDescripcion, inputCantidad, categoria)
       
    }


return(
    <Formulario onSubmit={handleSubmit}>
        <ContenedorFiltros>
            <SelectCategorias
            categoria={categoria}
            cambiarCategoria={cambiarCategoria}
            />
            <p>Date </p>
        </ContenedorFiltros>

        <div>
        <Input 
        type="text"
        name="descripcion"
        id="descripcion"
        placeholder="Descripcion"
        value={inputDescripcion}
        onChange={handleChange}
        />
        <InputGrande
        type="text"
        name="cantidad"
        id="cantidad"
        placeholder="$0.00"
        value={inputCantidad}
        onChange={handleChange}
        />
        </div>
        <ContenedorBoton>
            <Boton as="button" primario type="submit">{gasto ? 'Editar Gasto': 'Agregar Gasto'}</Boton>
        </ContenedorBoton>
        <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEstadoAlerta={cambiarEstadoAlerta}
        />
        
    </Formulario>
);

}

export default FormularioGasto;