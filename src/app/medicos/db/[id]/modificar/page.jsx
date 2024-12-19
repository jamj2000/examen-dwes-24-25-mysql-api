
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
import mysql from '@/lib/mysql'
import { ArrowLeft } from 'lucide-react';
import Button from "@/components/button";

async function obtenerMedico(id) {
    const sql = 'select * from medicos where id = ?';
    const values = [id]
    const [rows] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return rows[0]
}

async function modificarMedico(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')
    const id = formData.get('id')

    const sql = 'UPDATE `medicos` SET nombre = ?, especialidad = ?, perfil = ? WHERE id = ?'
    const values = [nombre, especialidad, perfil, id];

    const [result, fields] = await mysql.query(sql, values)


    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    redirect('/medicos/db');
}


export default async function MedicosModificar({ params }) {

    const { id } = await params
    const medico = await obtenerMedico(id)

    if (!medico) notFound()


    return (
        <>

            <section className="max-w-xl mx-auto p-4 bg-gray-800 text-gray-50 mt-20">
                <Link href="/medicos/db" className="fixed top-30 left-3 p-2 bg-orange-400 text-black rounded-full">  <ArrowLeft /> </Link>
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

                        <Button type="submit" className="disabled:bg-slate-600 mt-4 p-2 bg-orange-500 text-black font-semibold rounded-full hover:bg-orange-600 transition-colors ">
                            Guardar cambios
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}

