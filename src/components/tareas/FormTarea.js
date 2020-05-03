import React, {useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareasContext';

const FormTarea = () => {

     //Obtener si un proyecto esta activo
     const proyectosContext = useContext(ProyectoContext);
     const { proyecto } = proyectosContext;

    //Obtener el state de tareas para agregar una nueva tarea al state
    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, 
            actualizarTarea, limiparTarea } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada para editar
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre:''
            })
        }
    }, [tareaseleccionada])

     //State del formulario
     const [tarea, guardarTarea] = useState({
         nombre: ''
     })

     //Extraer nombre del proyecto
     const {nombre} = tarea;

    //Si no hay ningún proyecto seleccionado esperar a que el usuario seleccione uno
    if(!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    //Función para agregar una nueva tarea al dar click 
    const onSubmit = e => {
        e.preventDefault();

        //Validar el form
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Revisar si es edición de tarea o agregar nueva tarea
        if(tareaseleccionada === null) { //Tarea Nueva
            //Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else {
            //Actualizar la tarea seleccionada
            actualizarTarea(tarea);

            //Elimina tarea seleccionada del state
            limiparTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        });
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">EL NOMBRE DE LA TAREA ES OBLIGATORIO</p>: null}
        </div>
    );
}

export default FormTarea;