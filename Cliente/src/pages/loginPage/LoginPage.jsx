import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../../config/constants'
// import Context from '../contexts/Context'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = { email: 'correo@correo.com', password: '123456789' }

const LoginPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  // const { setDeveloper } = useContext(Context)

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Email y password obligatorias.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    axios.post(ENDPOINT.login, user)
      .then(({ data }) => {
        window.sessionStorage.setItem('token', data.token)
        window.alert('Usuario identificado con éxito 😀.')
        // setDeveloper({})
        console.log(data)
        navigate('/perfil')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        window.alert(`${data.message} 🙁.`)
      })
      
  }

  return (
    <form onSubmit={handleForm} className='mx-auto mt-10 pb-28 w-10/12 sm:w-6/12 md:w-3/12'>
  <h1 className='text-center text-2xl font-bold'>Iniciar Sesión</h1>
  <hr className='my-4' />
  <div className='mb-4'>
    <label className='block'>Email address</label>
    <input
      value={user.email}
      onChange={handleUser}
      type='email'
      name='email'
      className='w-full p-2 border border-gray-300 rounded'
      placeholder='Enter email'
    />
  </div>
  <div className='mb-4'>
    <label className='block'>Password</label>
    <input
      value={user.password}
      onChange={handleUser}
      type='password'
      name='password'
      className='w-full p-2 border border-gray-300 rounded'
      placeholder='Password'
    />
  </div>
  <button type='submit' className='w-full p-2 bg-indigo-600 text-white  rounded mt-4'>Iniciar Sesión</button>
</form>

  )
}

export default LoginPage