
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
import mysql from '@/lib/mysql'
import { ArrowLeft } from 'lucide-react';
import Button from "@/components/button";

async function obtenerPaciente(id) {
    const sql = 'select * from pacientes where id = ?';
    const values = [id]
    const [rows] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return rows[0]
}

async function modificarPaciente(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_nacimiento = formData.get('fecha_nacimiento')
    const id = formData.get('id')

    const sql = 'UPDATE `pacientes` SET nombre = ?, localidad = ?, fecha_nacimiento = ? WHERE id = ?'
    const values = [nombre, localidad, fecha_nacimiento, id];

    const [result, fields] = await mysql.query(sql, values)


    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    redirect('/pacientes/db');
}


export default async function PacientesModificar({ params }) {

    const { id } = await params
    const paciente = await obtenerPaciente(id)

    if (!paciente) notFound()


    return (
        <>
            <section className="max-w-xl mx-auto p-4 bg-gray-800 text-gray-50 mt-20">
                <Link href="/pacientes/db" className="fixed top-30 left-3 p-2 bg-orange-400 text-black rounded-full"> <ArrowLeft /> </Link>
                <h1 className="py-4 text-4xl font-bold text-center border-b-4 border-orange-500">
                    Modificar paciente #{paciente.id}
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

                        <Button className="mt-4 p-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition-colors">
                            Guardar cambios
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}
