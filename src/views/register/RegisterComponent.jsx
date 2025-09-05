//rafc
import { useState } from 'react'; //Hook de React para manejar estados asi como correo, contraseña, errores en este caso
import { useNavigate } from 'react-router'; //Hook de React Router para redirigir entre páginas
import { createUserWithEmailAndPassword } from 'firebase/auth'; //Función de Firebase que crea un usuario nuevo con email y password
import { auth } from '../../repositories/firebase/config.js'; // Importa la instancia de autenticación

const RegisterComponent = () => {
    //Registro de usuario -> Estado para los datos del usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(''); //Estado para mostrar errores al ingresar usuario

    //Se crea una fuunción que se ejecuta al enviar el formulario
    const handleRegister = async (e) => { 
        e.preventDefault();
        setError(''); //ES para que limpie cualquier error previo

        try {
            //Llama a la función de registro de Firebase
            //Si tiene éxito para ingresar en firebase, se mostrará el dashboard
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario registrado con éxito:", userCredential.user);
            //redirige al dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error("Error al registrar:", error.message);
            setError(error.message); // se muestra el error en pantalla
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Registrar nuevo usuario</h3>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {/*Al dar clic en btn Registrar -> se llama al handleRegister */}
                                <button type="submit" className="btn btn-primary w-100">Registrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
