import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //Extraer los valores del context de alertas
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //Extarer los valores del context de Autenticación
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

     //En caso de que el password sea incorrecto o e usuario no exista
     useEffect(() => {
        //Primeramente se evalua si el usuario esta autenticado como true
        if(autenticado) {
            props.history.push('/proyectos');
        }

        //En caso de que haya un mensaje se mostrará una alerta de error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    //Extraer valores de Usuario
    const {email, password} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //Inicio de sesión
    const onSubmit = e => {
        e.preventDefault();

        //Validación de campos vacios
        if(email.trim() === '' || password.trim ===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Pasar al action los valores
        iniciarSesion({email, password});
    }

    return ( 
        <div className="form-usuario">
             {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ): null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;

