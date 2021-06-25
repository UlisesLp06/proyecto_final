import React from 'react'
import { Header, Titulo, ContenedorHeader,ContenedorBotones } from './../elementos/Header';
import { Helmet } from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from './../Hooks/useObtenerGastoDelMes';
import { ListaDeCategorias,ElementoListaCategorias,Categoria,Valor} from './../elementos/ElementosDeLista';
//import useObtenerGastosDelMesPorCategoria from './../hooks/useObtenerGastosDelMesPorCategoria';   
import IconoCategoria from './../elementos/IconoCategoria';

const GastosPorCategoria=()=>{
 
  const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();

    return(
  <> 
    <Helmet>
      <title>Gastos por Categorias</title>
    </Helmet>
    <Header>
      <BtnRegresar/>
      <Titulo>Gastos por Categoria</Titulo>
    </Header>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index)=>{
          return (
            <ElementoListaCategorias key={index}> 
              <Categoria>
                <IconoCategoria id={elemento.categoria}/>
                {elemento.categoria} 
              </Categoria>
              <Valor>{elemento.cantidad}</Valor>
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>

    <BarraTotalGastado/>
  </>
    );
}
export default GastosPorCategoria;