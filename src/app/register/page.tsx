'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      window.location.href = '/dashboard'
    } else {
      const err = await res.json()
      alert(err.error || 'Erro ao registrar')
    }
  }

  return (
    <div className="bg-black/60 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-64 text-white"
      >
        <input placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Senha" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirmar senha"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit">Criar conta</button>
      </form>
    </div>
  )
}
