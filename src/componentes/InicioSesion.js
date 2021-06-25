import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './../elementos/Header';
import Boton from  './../elementos/Boton';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { useHistory } from 'react-router-dom';
import {auth} from './../firebase/firebaseConfig';
import Alerta from './../elementos/Alerta';


const InicioSesion=()=>{
    const history= useHistory();
    const [correo, establecerCorreo]=useState('');
    const [password, establecerPassword]=useState('');
    const[estadoAlerta,cambiarEstadoAlerta]=useState(false);
    const[alerta, cambiarAlerta]=useState({});

    const handleChange=(e)=>{
        if(e.target.name==='email'){
            establecerCorreo(e.target.value);
        }else if(e.target.name==='password'){
            establecerPassword(e.target.value);
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
          await  auth.signInWithEmailAndPassword(correo,password).then(()=>{console.log('Registrado con exito')}  );
            history.push('/');
        }catch(error){
            cambiarEstadoAlerta(true);
            let mensaje;
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje='Contraseña incorrecta'
                    break;
                case 'auth/user-not-found':
                    mensaje= 'No se encontro ninguna cuenta registrada'
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
            <title>Iniciar Sesion</title>
        </Helmet>
        
        <Header>
            <ContenedorHeader>
                <Titulo>Iniciar Sesion </Titulo>
                <div>
                    <Boton to="/crear-cuenta">Registrarse</Boton>
                </div>
            </ContenedorHeader>

        </Header>

        <Formulario onSubmit={handleSubmit}>
            <Input 
             type="email"
             name="email"
             placeholder="Correo Electronico"  
             value={correo}  
             onChange={handleChange}
              />

              <Input
                     type="password"
                     name="password"
                     placeholder="Contraseña"  
                     value={password}
                     onChange={handleChange}
              />
            <ContenedorBoton>
                 <Boton as="button" primario type="submit">Iniciar Sesion</Boton>
            </ContenedorBoton>
            
         
        </Formulario>
        <Alerta
        tipo={alerta}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
        />
    </>

    );
}

export default InicioSesion;