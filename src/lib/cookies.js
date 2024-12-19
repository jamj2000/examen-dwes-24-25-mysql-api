import { cookies } from "next/headers";

const EXPIRE_TIME = 10 * 60 * 1000  // 10 minutos expresado en ms

export async function getCookie(name) {
  const cookieStore = await cookies()
  const session = cookieStore.get(name)?.value;

  if (!session) return null;
  return await JSON.parse(session);
}

export async function setCookie(name, value) {
  const expires = new Date(Date.now() + EXPIRE_TIME)
  const cookieStore = await cookies()

  cookieStore.set({
    name: name,
    value: JSON.stringify({ ...value, expires }),
    expires,
    httpOnly: true,
  })
}

export function updateCookie(name, value) {
  const expires = new Date(Date.now() + EXPIRE_TIME)

  return {
    name: name,
    value: JSON.stringify({ ...value, expires }),
    expires,
    httpOnly: true,
  }
}


export async function deleteCookie(name) {
  const cookieStore = await cookies()

  cookieStore.set({
    name,
    value: "",
    maxAge: 0,
    httpOnly: true
  });
}