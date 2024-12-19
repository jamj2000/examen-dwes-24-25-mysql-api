import mysql from "@/lib/mysql"
import { revalidatePath } from "next/cache"
import Button from "@/components/button"


async function nuevoMedico(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')

    const sql = 'insert into `medicos` (`nombre`, `especialidad`, `perfil`) values (?, ?, ?)'
    const values = [nombre, especialidad, perfil];

    const [result, fields] = await mysql.query(sql, values)

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    revalidatePath('/medicos/db')
}



export default function MedicoNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4 p-4 bg-gray-800 text-gray-50 rounded-lg shadow-md'>

            <label htmlFor='nombre' className='text-lg font-semibold text-white'>Nombre: </label>
            <input required id='nombre' name='nombre' className='text-xl p-1 pl-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-400 focus:outline-none' />

            <label htmlFor='especialidad' className='text-lg font-semibold text-white'>Especialidad: </label>
            <input required id='especialidad' name='especialidad' className='text-xl p-1 pl-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-400 focus:outline-none' />

            <label htmlFor='perfil' className='text-lg font-semibold text-white'>Perfil: </label>
            <select required id='perfil' name='perfil' className='text-xl p-1 pl-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-400 focus:outline-none'>
                <option value='ESPECIALISTA'>Especialista</option>
                <option value='RESIDENTE'>Residente</option>
            </select>

            <div className='col-span-2 grid gap-2'>
                <Button formAction={nuevoMedico} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar medico
                </Button>
                <button type='reset' className='bg-orange-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}
