import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usuarios = ({ user }) => {
    const [alumnos, setAlumnos] = useState([])
    const [docentes, setDocentes] = useState([]);
    const [administradores, setAdministradores] = useState([]);
    const [filtro, setFiltro] = useState('')
    const [status, setStatus] = useState(true);

    const onSubmitProyectosForm = () => {
        const onSubmitUpdate = (eventForm) => {
            eventForm.preventDefault();
            const data = new FormData(eventForm.target);

            const payload = {
                nombre: data.get('nombre'),
                correo: data.get('correo'),
                rol: data.get('rol'),
                estatus: data.get('estatus')
            }

            fetch(`/api/alumnos/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(),
            })
                .then((response) => {
                    if (response.ok) {
                        toast.success("Estatus actualizado");
                        
                    } else {
                        toast.error("Error al actualizar el estatus");
                    }
                })
                .catch((error) => {
                    toast.error("Error al actualizar el estatus");
                });
        }
    }

    useEffect(() => {
        Promise.all([
            fetch("/api/alumnos").then((response) => response.json()),
            fetch("/api/docentes").then((response) => response.json()),
            fetch("/api/administradores").then((response) => response.json())
        ]).then(([alumnosData, docentesData, administradoresData]) => {
            setAlumnos(alumnosData);
            setDocentes(docentesData);
            setAdministradores(administradoresData);
        }).catch((error) => {
            toast("Error al obtener usuarios");
        });
    }, []);

    return <Layout title='Usuarios' user={user} >
        <Card>
            <div className="overflow-x-auto" >
                <div className="mb-4">
                    <label htmlFor="filtro" className="mr-2">
                        Buscar:
                    </label>
                    <input
                        type="text"
                        id="filtro"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="border rounded px-2 py-1"
                    />
                </div>

                <table className="table-auto w-full">
                    <thead>
                        <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Correo electrónico</th>
                            <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Rol</th>
                            {/* <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Estatus</th> */}
                        </tr>
                    </thead>
                    <tbody >
                        {/* {filtrarAlumnos().map((alumno) => ( */}
                        {alumnos.filter(a => a.correo.toLowerCase().startsWith(filtro.toLowerCase())).map((alumno) => (
                            <tr key={alumno.id}>
                                <td nombre="nombre" className="border px-4 py-2" >{alumno.nombre}</td>
                                <td nombre="correo" className="border px-4 py-2" >{alumno.correo}</td>
                                <td nombre="rol" className="border px-4 py-2" >{alumno.rol}</td>
                                {/* <td nombre="estatus" className="border px-4 py-2" > */}

                                    {/* <button type="button" class="text-sm bg-blue-900 hover:bg-blue-900 font-bold text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cambiar estatus</button> */}

                                {/* </td> */}
                            </tr>
                        ))
                        }

                        {docentes.filter(a => a.correo.toLowerCase().startsWith(filtro.toLowerCase())).map((docente) => (
                            <tr key={docente.id}>
                                <td nombre="nombre" className="border px-4 py-2" >{docente.nombre}</td>
                                <td nombre="correo" className="border px-4 py-2" >{docente.correo}</td>
                                <td nombre="rol" className="border px-4 py-2" >{docente.rol}</td>
                                {/* <td nombre="estatus" className="border px-4 py-2" > */}

                                    {/* <button type="button" class="text-sm bg-blue-900 hover:bg-blue-900 font-bold text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cambiar estatus</button> */}

                                {/* </td> */}

                            </tr>
                        ))
                        }

                        {administradores.filter(a => a.correo.toLowerCase().startsWith(filtro.toLowerCase())).map((admin) => (
                            <tr key={admin.id}>
                                <td nombre="nombre" className="border px-4 py-2" >{admin.nombre}</td>
                                <td nombre="correo" className="border px-4 py-2" >{admin.correo}</td>
                                <td nombre="rol" className="border px-4 py-2">{admin.rol}</td>
                                {/* <td nombre="estatus" className="border px-4 py-2" > */}
{/* 
                                    <button type="button" class="text-sm bg-blue-900 hover:bg-blue-900 font-bold text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cambiar estatus</button> */}

                                {/* </td> */}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </Card>
    </Layout>
};

export const getServerSideProps = privatePage(async (context) => {
    const user = context.req.session.user;

    if (!user) {
        return {
            redirect: {
                destination: "/api/logout",
                permanent: false,
            },
        };
    }

    return { props: { user } }
});

export default Usuarios;

