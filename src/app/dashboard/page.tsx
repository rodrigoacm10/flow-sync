'use client'

import { cookies } from 'next/headers'
import { verifyJwt } from '@/lib/jwt'

export default function Dashboard() {
  // const token = (await cookies()).get('token')?.value
  // const user = token ? verifyJwt(token) : null

  return (
    <div className="bg-gradient-to-br from-[#000000]/60 to-[#2b2b2b] min-h-screen text-white px-6 py-4 flex flex-col">
      <h1>Dashboard</h1>

      <div className="flex flex-1 gap-4">
        <div className="bg-red-400 flex-1 flex flex-col gap-5">
          <div className="bg-[#2b2b2b] rounded-xl px-6 py-3">
            <div className="flex justify-between">
              <p>R$ 220,00</p>

              <input
                className="bg-amber-700 p-4 w-4 h-4 rounded-lg"
                type="checkbox"
                name="completed"
              ></input>
            </div>
          </div>
        </div>

        <div className="min-w-[320px] bg-amber-300 rounded-xl px-6 py-3 flex flex-col">
          <div className="flex-1">
            <p>registros</p>
          </div>

          <button
            onClick={() => console.log('Add pedido')}
            className="bg-white text-black rounded-lg font-bold p-2 hover:cursor-pointer"
          >
            + PEDIDO
          </button>
        </div>
      </div>
    </div>
  )
}
