import React,{useState}  from 'react'
import { Helmet } from 'react-helmet';
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './../elementos/Header';
import Boton from  './../elementos/Boton';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import styled from 'styled-components';
import {auth} from './../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import Alerta from'./../elementos/Alerta';
const RegistroUsuarios=()=>{ //componente de registro de usuarios
    const history= useHistory();
    const [correo, establecerCorreo]=useState('');
    const [password, establecerPassword]=useState('');
    const[estadoAlerta,cambiarEstadoAlerta]=useState(false);
    const[alerta, cambiarAlerta]=useState({});
    const handlechange=(e)=>{
        switch(e.target.name){
            case 'email':
                establecerCorreo(e.target.value);
                break;
            case 'password':
                establecerPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});
        console.log(correo,password);

       const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
           if(!expresionRegular.test(correo)){
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: 'error',
                    mensaje: 'ingrese un correo valido'
                });
                return;
           }
        if(correo === '' || password === ''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje:'Ingrese los datos'
            });
           
            return;
        }

        try{
          await  auth.createUserWithEmailAndPassword(correo,password).then(()=>{console.log('Registrado con exito')}  );
            history.push('/');
        }catch(error){
            cambiarEstadoAlerta(true);
            let mensaje;
            switch(error.code){
                case 'auth/invalid-password':
					mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
					break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
				break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				break;
            }
            cambiarAlerta({
                tipo:'error',
                mensaje: mensaje
            });
        }
        
       
    }

    return(
    <>
        
        <Helmet>
            <title>Crear Cuenta</title>
        </Helmet>
        
        <Header>
            <ContenedorHeader>
                <Titulo>Crear Cuenta</Titulo>
                <div>
                    <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
                </div>
            </ContenedorHeader>

        </Header>

        <Formulario onSubmit={handleSubmit}>
            <Input 
            type="email"
            name="email"
            placeholder="Correo Electronico"   
            value ={correo}
            onChange={handlechange} 
              />

              <Input
            type="password"
            name="password"
            placeholder="Contraseña"  
            value ={password}
            onChange={handlechange} 
              />
            <ContenedorBoton>
                 <Boton as="button" primario type="submit">Crear Cuenta</Boton>
            </ContenedorBoton>
            
         
        </Formulario>

        <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
        
        />
    </>

    );
}

export default RegistroUsuarios;