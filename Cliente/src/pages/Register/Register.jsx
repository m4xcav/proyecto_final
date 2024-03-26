import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../../config/constants'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
  email: 'correo@correo.com',
  password: '123456789',
  Nombre: 'Nombre',
  Apellido: 'Apellido',
  Telefono: '+56 9 00000000'
}

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()

    if (
      !user.email.trim() ||
      !user.password.trim() ||
      !user.Nombre.trim() ||
      !user.Apellido.trim() ||
      !user.Telefono.trim()
    ) {
      return window.alert('Todos los campos son obligatorias.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    axios.post(ENDPOINT.users, user)
      .then(() => {
        window.alert('Usuario registrado con éxito 😀.')
        navigate('/login')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        window.alert(`${data.message} 🙁.`)
      })
  }

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil')
    }
  }, [])

  return (
    <form onSubmit={handleForm} className="w-full max-w-xs mx-auto mt-5 pb-28">
        <h1 className="text-center text-xl font-bold">Registrar nuevo usuario</h1>
        <hr className="my-4" />
        <div className="mb-4">
            <label htmlFor="email" className="block">Email address</label>
            <input
            id="email"
            value={user.email}
            onChange={handleUser}
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter email"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="text" className="block">Nombre</label>
            <input
            id="Nombre"
            value={user.Nombre}
            onChange={handleUser}
            type="text"
            name="Nombre"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Nombre completo"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="text" className="block">Apellido</label>
            <input
            id="Apellido"
            value={user.Apellido}
            onChange={handleUser}
            type="text"
            name="Apellido"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Apellido completo"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="number" className="block">Telefono</label>
            <input
            id="Telefono"
            value={user.Telefono}
            onChange={handleUser}
            type="number"
            name="Telefono"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="+56 9 0000000"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="password" className="block">Password</label>
            <input
            id="password"
            value={user.password}
            onChange={handleUser}
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Password"
            />
        </div>
        
        
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
            Registrarme
        </button>
    </form>

  )
}

export default Register
