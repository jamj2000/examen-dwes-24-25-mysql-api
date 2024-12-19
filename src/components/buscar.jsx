import Form from "next/form";  // Nuevo componente en NextJS 15
/*
  USAR ESTE COMPONENTE
  Componente para realizar búsquedas a partir de NextJS 15.
  Este componente simplifica enormemente el trabajo
  con entradas de búsqueda.
*/

export default function Buscar() {
    return (
        <Form action="" className="text-right">
            <input
                name="query"
                type="search"
                placeholder="Buscar..."
                className="text-black p-2 pl-10 rounded-full my-5 bg-[url('/search.svg')] bg-[length:16px_16px] bg-[center_left_10px] bg-no-repeat border border-slate-200 focus:outline-blue-300"
            />
            <button type="submit" className='hidden'>Buscar</button>
        </Form>

    );
}