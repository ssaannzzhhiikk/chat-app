import { useState } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      // Успешный логин — обнови состояние или редирект
      window.location.href = '/chat'

    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <form onSubmit={handleLogin} className='flex flex-col items-center gap-8 border-1 overflow-hidden max-h-200 min-h-90 transition-all w-80 rounded-md bg-amber-50'>
            <p></p>
            <h1 className='text-2xl font-bold'>Вход в аккаунт</h1>

            <div className='flex flex-col items-center gap-3'>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className='border-black border-1 rounded-md w-60 h-10 pl-3'
                    placeholder='Электронный адрес'
                />

                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className='border-black border-1 rounded-md w-60 h-10 pl-3'
                    placeholder='Пароль'
                />

                {error && <p className='text-red-500'>{error}</p>}

                <button type="submit" disabled={loading} className=' bg-blue-500 hover:bg-blue-600 w-60 h-10 rounded-md text-white font-bold cursor-pointer border-black border-1'>
                    {loading ? 'Входим...' : 'Войти'}
                </button>

                <hr className="w-full border border-gray-300" />

                <Link to="/signup" className=' bg-green-600 hover:bg-green-700 w-60 h-10 rounded-md text-white font-bold cursor-pointer flex justify-center items-center border-black border-1'>
                  <p className=''>Создать новый аккаунт</p>
                </Link>

                
                <Link to="/reset">
                    <p className='hover:underline text-blue-600'>Забыли пароль ?</p>
                </Link>

            </div>
        </form>
    </div>
  )
}
