import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/MainLayout";
import Card from "../../../components/Card";
import { privatePage } from "../../../lib/ironSessionConfig";

const DoceEtapa2 = ({ user }) => {
    const [proyects, setProyects] = useState([])

    useEffect(() => {
        fetch("/api/projects")
            .then((response) => response.json())
            .then(setProyects)
            .catch((error) => toast("Error al crear el proyecto"))
    }, [])

    const router = useRouter()

    const onSubmitCreateProyectForm = (eventForm) => {
        eventForm.preventDefault();
        const data = new FormData(eventForm.target);

        const payload = {
            descripcion: data.get('descripcion'),
            objGeneral: data.get('objGeneral'),
            objsMetas: data.get('objsMetas'),
            alcance: data.get('alcance'),
            herramientas: data.get('herramientas')
        }

        fetch("/api/projects/documents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
            .then(() => router.push('/alumnos/proyectos/'))
            .catch((error) => console.log(error))
    }

    return <Layout title='Etapa 2 - Resumen' user={user} >
        <Card>
            <form onSubmit={onSubmitCreateProyectForm} className="flex flex-col">
                <div className='flex flex-col'>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>Descripción</span>
                    <textarea name="descripcion" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Describe la desripción de tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Objetivo General</span>
                    <textarea name="objGeneral" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Los objetivos generales" ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Objetivos y Metas Específicas</span>
                    <textarea name="objsMetas"  id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Aquí coloca los objetivos y metas de tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Alcance</span>
                    <textarea name="alcance" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Coloca el alcance sobre tu proyecto..." ></textarea>
                    <span className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2' >Herramientas</span>
                    <textarea name="herramientas" id="message" rows="" className="resize block border px-2 rounded-lg w-full h-32" placeholder="Escribe las herramientas útilizadas en tu proyecto..." ></textarea>
                </div>
                
                <div dir="rtl">
                    <div class="relative h-32 w-32">
                        <button type="submit" className="mt-5 bg-blue-900 text-white rounded-lg absolute inset-x-0 top-0 h-16 font-bold">Guardar</button>
                    </div>
                </div>
            </form>
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

export default DoceEtapa2;