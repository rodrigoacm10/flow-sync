import { cookies } from 'next/headers'
import { verifyJwt } from '@/lib/jwt'

export default async function Dashboard() {
  const token = (await cookies()).get('token')?.value
  const user = token ? verifyJwt(token) : null

  console.log(user)
  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Bem-vindo, </p> : <p>Não autenticado</p>}
    </div>
  )
}
