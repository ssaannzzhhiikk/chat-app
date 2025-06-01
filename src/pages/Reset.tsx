import { useState } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function Reset() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      setError(error.message)
    } else {
      setMessage('Ссылка для сброса пароля отправлена на email.')
    }

    setLoading(false)
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleReset} className='flex flex-col border-1 h-80 w-80 justify-center items-center gap-5 rounded-lg bg-amber-50'>
        <h1 className='text-2xl font-bold'>Сброс пароля</h1>

        <div className='flex flex-col justify-center items-center gap-2'>
        <input
        className='border-1 rounded-lg pl-3 h-10 w-50'
        placeholder='Электронный адрес'
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <button
        type="submit"
        disabled={loading}
        className='border-1 rounded-md w-50 h-10 bg-blue-400 hover:bg-blue-600 font-bold text-white'
        >
          {loading ? 'Отправка...' : 'Сбросить пароль'}
        </button>
        </div>

        <div className='flex flex-col gap-3'>

          <div className='flex items-center gap-2'>
            <hr className="w-full border border-gray-300" />
            <p> или </p>
            <hr className="w-full border border-gray-300" />
          </div>


          <button className=' bg-green-600 hover:bg-green-700 w-50 h-10 rounded-md text-white font-bold cursor-pointer'>
            <Link to="/signup">
              <p>Создать новый аккаунт</p>
            </Link>
          </button>

        </div>
        


      </form>
    </div>
  )
}
