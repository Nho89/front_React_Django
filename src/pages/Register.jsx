import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { useUserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../services/userServices.js';

const Register = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { register, getValues, formState: { errors }, handleSubmit, unregister } = useForm();
  const { setUserAuth, setUser, setUserRole } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await userRegister(data);
      localStorage.setItem('token', response.token);
      setUserAuth(true);
      setUser(response.user_name);
      setUserRole(response.user_role);
      navigate('/login');
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input disabled={isLoading} className="" type="text" placeholder='Nombre'{...register('name', { maxLength: { value: 50 } })} id="name" />
            {errors.name && errors.name.type === "maxLength" && <p className="">El nombre debe tener menos de 50 caracteres</p>}
          </div>
          <div>
            <input disabled={isLoading} className="" type="text" placeholder='Apellido'{...register('lastname', { maxLength: { value: 50 } })} id="lastname" />
            {errors.lastname && errors.lastname.type === "maxLength" && <p className="">El apellido debe tener menos de 50 caracteres</p>}
            <div>
            <input disabled={isLoading} className="" type="email" id="email" placeholder="Email" {...register('email', { required: true, pattern: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i })} required />
            <p className=''>
              {errors.email && <span>El email es obligatorio y debe ser válido.</span>}
            </p>
          </div>
          <div className="">
            <input disabled={isLoading}
              className=""
              placeholder="Contraseña"
              {...register('password', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,50}$/ })} required
            />
            
            {errors.password?.type === "pattern" && <p className="">La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula un número y un caracter especial</p>}
          </div>
          </div>
        <button disabled={isLoading} className="" type="submit">
            Enviar
          </button>
          <button type='button' onClick={() => navigate('/')} className="">Cancelar</button>
      </form>
    </div>
  )
}

export default Register