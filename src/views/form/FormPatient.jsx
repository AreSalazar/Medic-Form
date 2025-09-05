//rafc
import { useState, useEffect } from 'react'; //Hook de React para manejar estados como datos del paciente en este caso
import { collection, addDoc, getDocs } from 'firebase/firestore'; //addDoc: agrega documentos (pacientes) a la colección en Firestore,, getDocs: obtiene documentos de Firestore
import { db } from '../../repositories/firebase/config.js'; //Instancia importado de Firestore desde config.js

export const FormPatient = () => {
    //Registro del paciente -> Estado para los datos del formulario
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [residence, setResidence] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    //Guardar los datos del paciente en el array "patients" --> Estado para almacenar los pacientes y mostrarlos en la tabla
    const [patients, setPatients] = useState([]);

    //Endpoint POST -> Es la FUNCIÓN para agregar un nuevo paciente a Firestore Database
    const addPatient = async (e) => { //Los agrega en el estado addPatient
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'pacientes'), { //"pacientes" es la colección creada en Firestore Database -> https://console.firebase.google.com/u/0/project/register-medic/firestore/databases/-default-/data/~2Fpacientes~2FfpnfNjBUdrxNzDNYOUAo
                name: name,
                lastname: lastname,
                phone: phone,
                residence: residence,
                date: date,
                time: time,
            });
            console.log('Documento escrito con ID: ', docRef.id);
            //Limpiar el formulario de datos
            setName('');
            setLastname('');
            setPhone('');
            setResidence('');
            setDate('');
            setTime('');
            //Aqui se recargan la lista de pacientes
            getPatients();
        } catch (e) {
            console.error('Error al agregar documento: ', e);
        }
    };

    //Endpoint GET -> Es la FUNCIÓN para obtener todos los pacientes de Firestore ()
    const getPatients = async () => { //Los guarda en el estado getPatients 
        const querySnapshot = await getDocs(collection(db, 'pacientes')); //"pacientes" es la colección creada en Firestore Database -> https://console.firebase.google.com/u/0/project/register-medic/firestore/databases/-default-/data/~2Fpacientes~2FfpnfNjBUdrxNzDNYOUAo
        const patientsList = [];
        querySnapshot.forEach((doc) => {
            patientsList.push({ id: doc.id, ...doc.data() });
        });
        setPatients(patientsList);
    };

    //Usar useEffect para cargar los datos cuando el componente se monte
    useEffect(() => { //useEffect -> Ejecuta getPatients() una sola vez cuando se carga el componente
        getPatients();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Registro de citas médicas</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Agregar nueva cita</h5>
                            <form onSubmit={addPatient}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Residencia</label>
                                    <input type="text" className="form-control" value={residence} onChange={(e) => setResidence(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha de cita</label>
                                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hora de cita</label>
                                    <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Citas agendadas</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nombre completo</th>
                                        <th>Teléfono</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                    </tr>
                                </thead>
                                {/*Muestra el formulario de citas médicas en una tabla*/}
                                <tbody>
                                    {patients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td>{patient.name} {patient.lastname}</td>
                                            <td>{patient.phone}</td>
                                            <td>{patient.date}</td>
                                            <td>{patient.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
