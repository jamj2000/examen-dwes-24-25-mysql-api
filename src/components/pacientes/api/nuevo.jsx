import { revalidatePath } from "next/cache";
import Button from "@/components/button";

async function nuevoPaciente(formData) {
    'use server'
    const [nombre, localidad, fecha_nacimiento] = formData.values()

    const response = await fetch('http://localhost:4000/pacientes', {
        method: 'POST',
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento })
    })
    const data = await response.json()

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    revalidatePath('/pacientes/api')
}



export default function pacienteNew() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4 p-4 bg-gray-800 text-gray-50 rounded-lg shadow-md'>

            <label htmlFor='nombre' className='text-lg font-semibold text-white'>Nombre: </label>
            <input required id='nombre' name='nombre' className='text-xl p-1 pl-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-400 focus:outline-none' />

            <label htmlFor='localidad' className='text-lg font-semibold text-white'>Localidad: </label>
            <input required id='localidad' name='localidad' className='text-xl p-1 pl-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-400 focus:outline-none' />

            <label htmlFor='fecha_nacimiento' className='text-lg font-semibold text-white'>Fecha de Nacimiento: </label>
            <input required id='fecha_nacimiento' name='fecha_nacimiento' type='date' className='text-xl p-1 pl-2 text-white bg-gray-700 border border-gray-600 focus:border-blue-400 focus:outline-none' />

            <div className='col-span-2 grid gap-2'>
                <Button formAction={nuevoPaciente} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar paciente
                </Button>
                <button type='reset' className='bg-orange-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}