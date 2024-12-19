import { notFound } from 'next/navigation'
import Link from "next/link"
import { ArrowLeft } from 'lucide-react';

async function obtenerPaciente(id) {
    const response = await fetch('http://localhost:4000/pacientes/' + id)
    if (!response.ok) notFound()
    const paciente = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return paciente
}


export default async function PacientesPage({ params }) {

    const { id } = await params
    const paciente = await obtenerPaciente(id)

    if (!paciente) notFound()


    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
            <Link href="/pacientes/api" className="fixed p-2 bg-orange-300 rounded-full mr-3"> <ArrowLeft /> </Link>
            <h1 className='py-10 text-4xl font-bold text-center border-b-4 border-orange-500 mt-5'>
                Paciente #{paciente.id}
            </h1>
            <div className="flex flex-col items-center mt-8 p-6 bg-gray-700 rounded-lg shadow-md">
                <p className="text-4xl text-white font-semibold">{paciente.nombre}</p>
                <p className="text-2xl text-white mt-2">{paciente.localidad}</p>
                <p className="text-2xl text-white mt-2">{new Date(paciente.fecha_nacimiento).toISOString().split('T')[0]}</p>
            </div>
        </section>
    );
}

