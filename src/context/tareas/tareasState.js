import React, { useReducer } from 'react';
import tareaContext from './tareasContext';
import TareaReducer from './tareasReducer';

import {
    TAREAS_PROYECTOS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            dispatch({
                type: TAREAS_PROYECTOS,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tareas por su id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`,{params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

       //Edita o modifica una tarea
       const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.existeTarea
            })
        } catch (error) {
            console.log(error);
        }
    }


    //Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Elimina la tarea seleccionada
    const limiparTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value = {{
                tareasproyecto : state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limiparTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;
