import React, { useState, useEffect } from 'react';
import PrimaryButton from '../components/Buttons/PrimaryButton'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAuthLogin from '../hooks/useAuthLogin'

const Login = () => {
    const {loginUser, logout, checkToken, loading, error, role, username} = useAuthLogin();

    const navigate = useNavigate();
    const [user, setUser] = useState({email: '', password: ''});
    const [errors, setErrors] = useState({email: '', password: ''});

    const validateFields = () =>{
        const newErrors = {email: '', password: ''};
        return true;
    }

    const handleLogin = async() =>{
        const response = await loginUser(user);
        if(response.token){
            localStorage.setItem("token", response.token);
            checkToken();
             Swal.fire({
                imageUrl: '/checkCapi.svg',
                imageWidth: 200,
                title: "Success login",
                text: "You are logged in",
                customClass: {
                  confirmButton: 'swalConfirmButton',
                  title: 'swalTitle',
                  htmlContainer: 'swalHtmlContainer',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                    cleanForm();
                    navigate('/'); 
                }
              });
           

        }else if(response.data){
            Swal.fire({
                imageUrl: '/errorCapi.svg',
                imageWidth: 200,
                title: response.data,
                text: "Error: " + response.status,
                customClass: {
                  confirmButton: 'swalConfirmButton',
                  title: 'swalTitle',
                  htmlContainer: 'swalHtmlContainer',
                }
              });
        }
     
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            handleLogin();
        }
      };

      const cleanForm = () =>{
        setUser({ email: '', password: ''})
      }

  return (
    <div>
    <img src="/orange_wave_desktop_top.png" className='topWave' alt="" />
    <div className='formNavigate orange' onClick={()=> navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 7l-5 5l5 5"/></svg>
            <h4>Back to home</h4>
        </div>
    <form className='registerLoginForm' onSubmit={handleSubmit}>
        <div className='formHeader'>
            <img src="/capi_sunglasses_star.svg" alt="" />
            <h4>Welcome Back!</h4>
        </div>
    
        <div>
            <label htmlFor='email'>Email</label>
            <input 
                type="email"
                placeholder="Enter your email"
                name='email'
                id='email'
                value={user.email}
                onChange={(e) =>
                    setUser({...user, email: e.target.value})
                }/>
            {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input 
                type="password"
                placeholder="*********"
                name='password'
                id='password'
                value={user.password}
                onChange={(e) =>
                    setUser({...user, password: e.target.value})
                }/>
            {errors.password && <p className="error">{errors.password}</p>}
        </div>
        
        <PrimaryButton type="submit">Log in</PrimaryButton>
        <Link to={'/register'}>Register</Link>
    </form>
    <img src="/capi_sunglasses_top.svg"  className='topImg' alt="" />

</div>
  )
}

export default Login