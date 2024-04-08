import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { ENDPOINT } from '../../config/constants';

const Register = () => {
  const [formData, setFormData] = useState({
    user_nombre: '',
    user_email: '',
    user_telefono: '',
    user_perfil: '',
    user_password: '',
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    let formErrors = {};
    if (!formData.user_nombre) {
      formErrors.user_nombre = 'Por favor, ingrese su nombre';
    }
    if (!formData.user_email) {
      formErrors.user_email = 'Por favor, ingrese su correo electrónico';
    }
    

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(ENDPOINT.users, formData);
        console.log('Registro exitoso', response.data);
        window.alert('Usuario registrado con éxito 😀.')
        navigate('/login')
        // Puedes hacer algo con la respuesta, como redirigir al usuario a otra página
      } catch (error) {
        console.error('Error al registrar:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 class="text-3xl font-extrabold text-gray-900 text-center">Registrate</h2>
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block">Nombre:</label>
            <input type="text" name="user_nombre" value={formData.user_nombre} onChange={handleChange} class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"/>
            {errors.user_nombre && <span class="text-red-500">{errors.user_nombre}</span>}
          </div>
          <div>
            <label class="block">Correo electrónico:</label>
            <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"/>
            {errors.user_email && <span class="text-red-500">{errors.user_email}</span>}
          </div>
          <div>
            <label class="block">Teléfono:</label>
            <input type="text" name="user_telefono" value={formData.user_telefono} onChange={handleChange} class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"/>
          </div>
          <div>
            <label class="block">Perfil:</label>
            <input type="text" name="user_perfil" value={formData.user_perfil} onChange={handleChange} class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"/>
          </div>
          <div>
            <label class="block">Contraseña:</label>
            <input type="password" name="user_password" value={formData.user_password} onChange={handleChange} class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"/>
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Registrarse</button>
        </form>
     </div>
    </div>
  
  );
};

export default Register;
