import Menu from "@/components/menu";
import { getCookie } from "@/lib/cookies";
import { Logout } from "@/components/forms";



async function Header() {
    const session = await getCookie('session');

    return (
        <header className="w-full h-12 px-10 flex justify-between items-center bg-blue-200">
            <Menu />
            {session && <Logout />}
        </header>
    );
}

export default Header;