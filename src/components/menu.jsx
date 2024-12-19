'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


const menu = [
    {
        text: 'Pacientes DB',
        href: '/pacientes/db'
    },
    {
        text: 'Médicos DB',
        href: '/medicos/db'
    },
    {
        text: 'Pacientes API',
        href: '/pacientes/api'
    },
    {
        text: 'Médicos API',
        href: '/medicos/api'
    },
]

function Menu() {
    const pathname = usePathname()

    return (
        <nav className="font-bold flex items-center gap-4 text-blue-500 ">
            <Link href='/'
                className={`hover:underline ${pathname == '/' && 'text-black no-underline'}`}>
                Página principal
            </Link>
            {menu.map(item =>
                <Link
                    key={item.href}
                    href={item.href}
                    className={`hover:underline ${pathname.startsWith(item.href) && 'text-black no-underline'}`}>

                    {item.text}
                </Link>
            )}

        </nav>
    );
}

export default Menu;