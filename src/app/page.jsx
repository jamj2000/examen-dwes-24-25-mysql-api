import { Login, Logout } from "@/components/forms";
import { getCookie } from "@/lib/cookies";
import Link from "next/link";



export default async function Page({ searchParams }) {
  const session = await getCookie('session');
  const { callbackUrl } = await searchParams


  return (
    <>
      <div className="text-4xl font-bold text-blue-300 text-center">
        <Link href="/" className="font-bold hover:underline" >
          HOSPITAL
        </Link>
      </div>

      <div className='mt-20 mx-auto flex flex-col gap-4 max-w-[450px]'>
        VALOR DE LA COOKIE
        <pre className="p-4 bg-slate-100 rounded-md">
          {JSON.stringify(session, null, 2)}
        </pre>
        {!session && <Login callbackUrl={callbackUrl} />}
        {session && <Logout />}
      </div>
    </>
  );
}
