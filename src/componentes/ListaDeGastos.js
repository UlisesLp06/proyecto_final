import React from 'react'
import { Header, Titulo } from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
//import { useAuth } from './../contextos/AuthContext';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from './../Hooks/useObtenerGastos';
import {
  Lista,
  ElementoLista,
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo
} from './../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import {Link} from 'react-router-dom';
import borrarGasto from './../firebase/borrarGasto';


const ListaDeGastos=()=>{
  const [gastos]=useObtenerGastos();
  

    return(
    <> 
        <Helmet>
          <title>Lista de Gastos</title>
        </Helmet>
        <Header>
        <BtnRegresar/>
          <Titulo>Listas de Gasto</Titulo>
        </Header>

        <Lista>
          {gastos.map((gasto)=>{
            return(
              <ElementoLista key={gasto.id}>
                <Categoria>
               
                  {gasto.categoria}
                 
                </Categoria>
                <Descripcion>
                  {gasto.descripcion}
                </Descripcion>
                <Valor>{gasto.cantidad}</Valor>

                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                    <IconoEditar/>
                  </BotonAccion>
                  <BotonAccion onClick={() =>borrarGasto(gasto.id)}>
                    <IconoBorrar/>
                  </BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            );

          } )}
            <ContenedorBotonCentral>
              <BotonCargarMas>Cargar Mas</BotonCargarMas>
            </ContenedorBotonCentral>

            {gastos.length===0 &&
            <ContenedorSubtitulo>
              <Subtitulo>No hay gastos</Subtitulo>
            </ContenedorSubtitulo>
            
            }


        </Lista>

        <BarraTotalGastado/>
     </>
    );
}

export default ListaDeGastos;