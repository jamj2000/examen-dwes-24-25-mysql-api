'use server'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";

const usuarios = [
  { nombre: 'usuario1', key: 'usuario1' },
  { nombre: 'usuario2', key: 'usuario2' },
]


export async function login(formData) {
  const LOGIN_URL = '/'

  // Obtener usuario datos del formulario
  const name = formData.get('name')
  const email = formData.get('email')
  const key = formData.get('key')
  const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

  // Comprobar si credenciales son válidas
  const usuarioEncontrado = usuarios.find(usuario => name == usuario.nombre && key == usuario.key)

  if (!usuarioEncontrado) return

  // Si hay autenticación correcta, creamos cookie de sesión
  await setCookie('session', { name, email })

  redirect(callbackUrl);
}

export async function logout() {
  // Eliminamos cookie de sesión
  deleteCookie('session')

  // redirect("/");   // No recarga si ya estamos en esta página

  // Hack to reload page! https://github.com/vercel/next.js/discussions/49345#discussioncomment-6120148
  redirect('/?' + Math.random())
}
