import Buscar from '@/components/buscar'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'

async function obtenerPacientes(query) {
    const response = await fetch('http://localhost:4000/pacientes')
    const pacientes = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 5000))

    return pacientes.filter(paciente => paciente.nombre.toLowerCase().includes(query))
}


async function eliminarPaciente(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/pacientes/' + id, { method: 'DELETE' })

    revalidatePath('/pacientes/api')
}


export default async function Pacientes({ query }) {
    const pacientes = await obtenerPacientes(query)

    return (
        <div className='grid grid-cols-1 gap-4 p-4 bg-gray-800 text-gray-50 rounded-lg shadow-md'>
            <h1 className='text-2xl text-slate-300 py-2  mb-2 border-b-2 border-b-slate-300'>
                Lista de pacientes (API)
            </h1>

            <Buscar />

            <ul className='flex flex-col gap-2'>
                {pacientes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((paciente) => (
                        <li key={paciente.id} className='p-2 odd:bg-slate-700 even:bg-slate-500 flex justify-between'>
                            <Link href={`/pacientes/api/${paciente.id}`}>{paciente.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={paciente.id} />
                                    <Link href={`/pacientes/api/${paciente.id}/modificar`} title='MODIFICAR'>✏️</Link>
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