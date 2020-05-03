import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    //Obtener los proyectos de state inicial
    const proyectosContext = useContext(ProyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //Use Effect para obtener los proyectos
    useEffect(() => {
        //Si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje]);

    //Si no hay proyectos no mostrar, mostrar un parrafo
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
            {proyectos.map(proyecto => (
               <CSSTransition
                    key={proyecto._id}
                    timeout={200}
                    classNames="tarea"
               >
                    <Proyecto 
                    proyecto={proyecto}
                />
               </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;
