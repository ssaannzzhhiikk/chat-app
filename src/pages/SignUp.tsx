import { useState } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Подтвердите email, чтобы завершить регистрацию.')
    }

    setLoading(false)
  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSignUp} className='flex flex-col items-center justify-center border-1 min-h-90 w-80 rounded-md gap-8 bg-amber-50'>
        
        <h2 className='text-2xl font-bold'>Регистрация</h2>

        <input
            className='border-1 rounded-md h-10 w-60 pl-3'
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder='Электронный адрес'
        />

        <input
            className='border-1 rounded-md h-10 w-60 pl-3'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder='Пароль'
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <div className='flex flex-col'>
        <button type="submit" disabled={loading} className='bg-blue-500 hover:bg-blue-600 border-black border-1 cursor-pointer w-50 h-10 rounded-lg text-amber-50 font-bold'>
            {loading ? 'Создание...' : 'Зарегистрироваться'}
        </button>

        <button className='cursor-pointer text-blue-500 hover:underline'>
            <Link to={"/login"}>
                <p>Уже есть аккаунт?</p>
            </Link>
        </button>
        </div>

        </form>
    </div>
  )
}
