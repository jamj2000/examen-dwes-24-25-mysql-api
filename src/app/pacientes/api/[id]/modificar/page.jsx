
import Button from "@/components/button";
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft } from "lucide-react";

async function obtenerPaciente(id) {
    const response = await fetch('http://localhost:4000/pacientes/' + id)
    if (!response.ok) notFound()
    const paciente = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return paciente
}

async function modificarPaciente(formData) {
    'use server'
    const id = formData.get('id'); // Obtener el ID del formulario
    const nombre = formData.get('nombre');
    const localidad = formData.get('localidad');
    const fecha_nacimiento = formData.get('fecha_nacimiento');

    const response = await fetch(`http://localhost:4000/pacientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento }),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar el paciente: ${response.statusText}`);
    }

    const data = await response.json();

    // Introducimos un retardo artificial
    await new Promise((resolve) => setTimeout(resolve, 2000));

    redirect('/pacientes/api');
}


export default async function PacientesModificar({ params }) {

    const { id } = await params
    const paciente = await obtenerPaciente(id)

    if (!paciente) notFound()


    return (
        <>

            <section className="max-w-xl mx-auto p-4 bg-gray-800 text-gray-50 mt-20">
                <Link href="/pacientes/api" className="fixed top-30 left-3 p-2 bg-orange-400 text-black rounded-full">  <ArrowLeft /> </Link>
                <h1 className="py-4 text-4xl font-bold text-center border-b-4 border-orange-500">
                    Modificar Paciente #{paciente.id}
                </h1>
                <div className="flex flex-col items-center mt-8 p-4 bg-gray-700 rounded-lg shadow-md">
                    <form action={modificarPaciente} className="w-full max-w-md flex flex-col gap-4">
                        <input type="hidden" name="id" value={paciente.id} />

                        <label htmlFor="nombre" className="text-2xl font-semibold">Nombre:</label>
                        <input type="text" name="nombre" id="nombre" className="text-xl p-1 text-center bg-gray-800 text-gray-50 border-b-2 border-gray-600 focus:border-orange-400 focus:outline-none" defaultValue={paciente.nombre} />

                        <label htmlFor="localidad" className="text-2xl font-semibold">Localidad:</label>
                        <input type="text" name="localidad" id="localidad" className="text-xl p-1 text-center bg-gray-800 text-gray-50 border-b-2 border-gray-600 focus:border-orange-400 focus:outline-none" defaultValue={paciente.localidad} />

                        <label htmlFor="fecha_nacimiento" className="text-2xl font-semibold">Fecha de Nacimiento:</label>
                        <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" className="text-xl p-1 text-center bg-gray-800 text-gray-50 border-b-2 border-gray-600 focus:border-orange-400 focus:outline-none" defaultValue={new Date(paciente.fecha_nacimiento).toISOString().split('T')[0]} />

                        <Button type="submit" className="mt-4 p-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition-colors">
                            Guardar cambios
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}