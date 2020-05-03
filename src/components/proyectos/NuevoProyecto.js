import React, { Fragment, useState, useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(ProyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

     //Función para leer el nombre del proyecto
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //Extraer valor del nombre
    const { nombre } = proyecto;

    //Para envíar el nombre del proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        } 
        //Agregar al state
        agregarProyecto(proyecto)

        //Reiniciar el form
        guardarProyecto({
            nombre: ''
        })
        
    }

    //Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>
            {
                formulario ? 
                (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre del Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                     />
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
                 </form>
                ) : null }
            {errorformulario ? <p className="mensaje error">EL NOMBRE DEL PROYECTO ES OBLIGATORIO</p>: null}    
        </Fragment>
     );
}
 
export default NuevoProyecto;
