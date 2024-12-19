import Buscar from '@/components/buscar'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'


async function obtenerMedicos(query) {
    const response = await fetch('http://localhost:4000/medicos')
    const medicos = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 5000))

    return medicos.filter(medico => medico.nombre.toLowerCase().includes(query))
}

async function eliminarMedico(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/medicos/' + id, { method: 'DELETE' })

    revalidatePath('/medicos/api')
}


export default async function Medicos({ query }) {
    const medicos = await obtenerMedicos(query)

    return (
        <div className='grid grid-cols-1 gap-4 p-4 bg-gray-800 text-gray-50 rounded-lg shadow-md'>
            <h1 className='text-2xl text-slate-300 py-2  mb-2 border-b-2 border-b-slate-300'>
                Lista de médicos (API)
            </h1>

            <Buscar />

            <ul className='flex flex-col gap-2'>
                {medicos.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((medico) => (
                        <li key={medico.id} className='p-2 odd:bg-slate-700 even:bg-slate-500 flex justify-between'>
                            <Link href={`/medicos/api/${medico.id}`}>{medico.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={medico.id} />
                                    <Link href={`/medicos/api/${medico.id}/modificar`} title='MODIFICAR'>✏️</Link>
                                    <button className='ml-2' formAction={eliminarMedico} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
