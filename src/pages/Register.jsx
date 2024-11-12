import React from 'react'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import useUsers from '../hooks/useUsers'
import Loading from '../components/Loading'

export const Register = () => {
    const { addUser, loading} = useUsers();

    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', passwordA: '', passwordB: ''})
    const [errors, setErrors] = useState({ name: '', lastname: '', email: '', passwordA: '', passwordB: ''});

    const validateFields = () => {
        const newErrors = { name: '', lastname: '', email: '', passwordA: '', passwordB: ''};

        const regexName = /^[a-zA-Z\s]+$/;

        if(!newUser.name) newErrors.name = "Name is required";
        else if(newUser.name.length < 3 || newUser.name.length > 32){
            newErrors.name = 'Name must be between 3 and 32 characters.';
        }
        else if(!regexName.test(newUser.name)){
            newErrors.name = 'Name can only have letters and spaces';
        }


        if(!newUser.lastname) newErrors.lastname= "Last name is required";
        else if(newUser.lastname.length < 3 || newUser.lastname.length > 32){
            newErrors.lastname = 'Last name must be between 3 and 32 characters.';
        } 
        else if(!regexName.test(newUser.lastname)){
            newErrors.lastname = 'Last name can only have letters and spaces';
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!newUser.email) newErrors.email = "Email is required"
        else if(!regexEmail.test(newUser.email)){ newErrors.email= "Use a valid email";}


        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!newUser.passwordA) newErrors.passwordA = "Password is required"
        else if( newUser.passwordA.length < 8 || newUser.passwordA.length > 64){
            newErrors.passwordA = "Password must be between 8 and 64 characters long"
        }
        else if(!regexPassword.test(newUser.passwordA)){
            newErrors.passwordA = "Password must include: uppercase, lowercase, number, and special character.."
        }


        if(!newUser.passwordB) newErrors.passwordB = "Password is required"
        else if( newUser.passwordA !== newUser.passwordB){
            newErrors.passwordB = "Passwords don't match"
        }


        setErrors(newErrors);
        
        return Object.values(newErrors).every((error) => error === '');
    }

    const handleAddUser = async() => {
        const verifiedNewUser = {
            "name": newUser.name,
            "lastName": newUser.lastname,
            "email": newUser.email,
            "password": newUser.passwordA
        }
        const error = await addUser(verifiedNewUser);

        if (error) {
            Swal.fire({
              imageUrl: '/errorCapi.svg',
              imageWidth: 200,
              title: error.data?.error || "Error",
              text: "Error: " + (error.status || "Connection error, please try later"),
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              }
            });
          }else{
            Swal.fire({
              imageUrl: '/checkCapi.svg',
              imageWidth: 200,
              title: "Registered!",
              text: "We have sent you a confirmation email",
              html: `
                    We have sent you a confirmation email
                    <div>
                        <a href="/login" autofocus>Login</a>
                        <a href="#" autofocus>Resend mail</a>
                    </div>
                `,
              customClass: {
                confirmButton: 'swalConfirmButton',
                title: 'swalTitle',
                htmlContainer: 'swalHtmlContainer',
              }
            });
        }
          cleanForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            handleAddUser();
        }
      };

      const cleanForm = () =>{
        setNewUser({ name: '', lastname: '', email: '', passwordA: '', passwordB: ''})
      }
  return (
    <>
    {loading ? <Loading/> : null}
    <div>
        <img src="/orange_wave_desktop.png" className='topWave' alt="" />
        <div className='formNavigate' onClick={()=>navigate('/')}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 7l-5 5l5 5" className='beige'/></svg>
                <h4 className='beige'>Back to home</h4>
            </div>
        <form className='registerLoginForm' onSubmit={handleSubmit}>
            <div className='formHeader'>
                <img src="/capi_hat.svg" alt="" />
                <h4>Create your Account</h4>
            </div>
            
            <div>
                <label htmlFor='name'>Name</label>
                <input 
                    type="text"
                    placeholder="Whats's your name?"
                    name='name'
                    id='name' 
                    value={newUser.name}
                    onChange={(e) =>
                        setNewUser({...newUser, name: e.target.value})
                    }/>
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor='lastname'>Last name</label>
                <input 
                    type="text"
                    placeholder="And your last name?"
                    name='lastname'
                    id='lastname' 
                    value={newUser.lastname}
                    onChange={(e) =>
                        setNewUser({...newUser, lastname: e.target.value})
                    }/>
                {errors.lastname && <p className="error">{errors.lastname}</p>}
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input 
                    type="email"
                    placeholder="Enter your email"
                    name='email'
                    id='email'
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser({...newUser, email: e.target.value})
                    }/>
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input 
                    type="password"
                    placeholder="Set your password"
                    name='password'
                    id='password'
                    value={newUser.passwordA}
                    onChange={(e) =>
                        setNewUser({...newUser, passwordA: e.target.value})
                    }/>
                {errors.passwordA && <p className="error">{errors.passwordA}</p>}
            </div>
            <div>
                <label htmlFor='rePassword'>Repeat password</label>
                <input 
                    type="password"
                    placeholder="Repeat your password"
                    name='repassword'
                    id='rePassword' 
                    value={newUser.passwordB}
                    onChange={(e) =>
                        setNewUser({...newUser, passwordB: e.target.value})
                    }/>
                {errors.passwordB && <p className="error">{errors.passwordB}</p>}
            </div>

            <PrimaryButton type="submit">Register</PrimaryButton>
            <Link to={"/login"}>Log in</Link>
        </form>
        <img src="/capi_photo.svg"  className='buttonImg' alt="" />
   
    </div>
    </>
    
  )
}
