
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react';
import Button from "@/components/button";

async function obtenerMedico(id) {
    const response = await fetch('http://localhost:4000/medicos/' + id)
    if (!response.ok) notFound()
    const medico = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return medico
}

async function modificarMedico(formData) {
    'use server'
    const id = formData.get('id'); // Obtener el ID del formulario
    const nombre = formData.get('nombre');
    const especialidad = formData.get('especialidad');
    const perfil = formData.get('perfil');

    const response = await fetch(`http://localhost:4000/medicos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, especialidad, perfil }),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar el medico: ${response.statusText}`);
    }

    const data = await response.json();

    // Introducimos un retardo artificial
    await new Promise((resolve) => setTimeout(resolve, 2000));

    redirect('/medicos/api');
}


export default async function MedicosModificar({ params }) {

    const { id } = await params
    const medico = await obtenerMedico(id)

    if (!medico) notFound()


    return (
        <>

            <section className="max-w-xl mx-auto p-4 bg-gray-800 text-gray-50 mt-20">
                <Link href="/medicos/api" className="fixed top-30 left-3 p-2 bg-orange-400 text-black rounded-full">  <ArrowLeft /> </Link>
                <h1 className="py-4 text-4xl font-bold text-center border-b-4 border-orange-500">
                    Modificar Médico #{medico.id}
                </h1>
                <div className="flex flex-col items-center mt-8 p-4 bg-gray-700 rounded-lg shadow-md">
                    <form action={modificarMedico} className="w-full max-w-md flex flex-col gap-4">
                        <input type="hidden" name="id" value={medico.id} />

                        <label htmlFor="nombre" className="text-2xl font-semibold">Nombre:</label>
                        <input type="text" name="nombre" id="nombre" className="text-xl p-1 text-center bg-gray-800 text-gray-50 border-b-2 border-gray-600 focus:border-orange-400 focus:outline-none" defaultValue={medico.nombre} />

                        <label htmlFor="especialidad" className="text-2xl font-semibold">Especialidad:</label>
                        <input type="text" name="especialidad" id="especialidad" className="text-xl p-1 text-center bg-gray-800 text-gray-50 border-b-2 border-gray-600 focus:border-orange-400 focus:outline-none" defaultValue={medico.especialidad} />

                        <label htmlFor="perfil" className="text-2xl font-semibold">Perfil:</label>
                        <select name="perfil" id="perfil" className="text-xl p-1 text-center bg-gray-800 text-gray-50 border-b-2 border-gray-600 focus:border-orange-400 focus:outline-none" defaultValue={medico.perfil}>
                            <option value="ESPECIALISTA">Especialista</option>
                            <option value="RESIDENTE">Residente</option>
                        </select>

                        <Button type="submit" className="mt-4 p-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition-colors">
                            Guardar cambios
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}
