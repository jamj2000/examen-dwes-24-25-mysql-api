import Fallback from "@/components/fallback";
import Pacientes from "@/components/pacientes/api/lista";
import PacienteNuevo from "@/components/pacientes/api/nuevo";
import { Suspense } from "react";


export default async function PacientesApi({ searchParams }) {
    const { query } = await searchParams;

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return (
        <>
            <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">

                <h1 className='py-10 text-3xl text-orange-500 text-center border-b-4 border-b-orange-500'>
                    API REST
                </h1>

                <PacienteNuevo />

                <Suspense fallback={<Fallback>Obteniendo pacientes... </Fallback>}>
                    <Pacientes query={query || ''} />
                </Suspense>
            </section>
        </>
    );
}