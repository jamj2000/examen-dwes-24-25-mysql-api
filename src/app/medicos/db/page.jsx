import Medicos from "@/components/medicos/db/lista";
import MedicoNuevo from "@/components/medicos/db/nuevo";
import { Suspense } from "react";
import Fallback from "@/components/fallback";


export default async function MedicoPage({ searchParams }) {
    const { query } = await searchParams;

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">

            <h1 className='py-10 text-3xl text-orange-500 text-center border-b-4 border-b-orange-500'>
                BASE DE DATOS DE MEDICOS
            </h1>

            <MedicoNuevo />

            <Suspense fallback={<Fallback>Obteniendo medicos ... </Fallback>}>
                <Medicos query={query || ''} />
            </Suspense>
        </section>
    );
}



