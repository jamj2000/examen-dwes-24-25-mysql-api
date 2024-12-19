import Buscar from '@/components/buscar'
import Link from 'next/link'
import mysql from '@/lib/mysql'
import { revalidatePath } from 'next/cache'

async function obtenerPacientes(query) {
    const sql = 'select * from `pacientes` where nombre like ?';
    const values = [`%${query}%`]
    const [pacientes] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 5000))

    return pacientes
}

async function eliminarPaciente(formData) {
    'use server'
    const id = formData.get('id')

    const sql = 'delete from pacientes where id = ?'
    const values = [id]
    await mysql.query(sql, values);

    revalidatePath('/pacientes/db')
}

export default async function Pacientes({ query }) {

    const pacientes = await obtenerPacientes(query)

    return (
        <div className='grid grid-cols-1 gap-4 p-4 bg-gray-800 text-gray-50 rounded-lg shadow-md'>
            <h1 className='text-2xl text-slate-300 py-2  mb-2 border-b-2 border-b-slate-300'>
                Lista de pacientes (DB)
            </h1>

            <Buscar />

            <ul className='flex flex-col gap-2'>
                {pacientes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((paciente) => (
                        <li key={paciente.id} className='p-2 odd:bg-slate-700 even:bg-slate-500 flex justify-between'>
                            <Link href={`/pacientes/db/${paciente.id}`}>{paciente.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={paciente.id} />
                                    <Link href={`/pacientes/db/${paciente.id}/modificar`} title='MODIFICAR'>✏️</Link>
                                    <button className='ml-2' formAction={eliminarPaciente} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

