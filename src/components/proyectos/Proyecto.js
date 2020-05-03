import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';

const Proyecto = ({proyecto}) => {

    //Obtener el state de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectosContext;

    //Obtener el state de tareas
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;

    //Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //Fijar un proyecto actual
        obtenerTareas(id); //Fijar Tareas del proyecto seleccionado
    }

    return (
        <li>
            <button 
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;
