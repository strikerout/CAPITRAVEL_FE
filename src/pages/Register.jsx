import React, { useState } from 'react';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUsers from '../hooks/useUsers';
import Loading from '../components/Loading';

export const Register = () => {
    const { addUser, resendEmail, loading } = useUsers();
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', passwordA: '', passwordB: '' });
    const [errors, setErrors] = useState({ name: '', lastname: '', email: '', passwordA: '', passwordB: '' });
    const [emailSent, setEmailSent] = useState(false); // Nuevo estado para controlar el envío del correo

    const validateFields = () => {
        const newErrors = { name: '', lastname: '', email: '', passwordA: '', passwordB: '' };
        // ... (el código de validación sigue igual)
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleAddUser = async () => {
        const verifiedNewUser = {
            "name": newUser.name,
            "lastName": newUser.lastname,
            "email": newUser.email,
            "password": newUser.passwordA
        };
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
        } else {
            Swal.fire({
                imageUrl: '/checkCapi.svg',
                imageWidth: 200,
                title: "Registered!",
                text: "We have sent you a confirmation email",
                html: `
                    We have sent you a confirmation email
                    <div>
                        <a href="/login" autofocus>Login</a>
                        <a href="#" class="resendMailLink" autofocus>Resend mail</a>
                    </div>
                `,
                customClass: {
                    confirmButton: 'swalConfirmButton',
                    title: 'swalTitle',
                    htmlContainer: 'swalHtmlContainer',
                },
                didOpen: () => {
                    document.querySelector('.resendMailLink').addEventListener('click', handleResendEmail);
                }
            });
            setEmailSent(true);
        }
        cleanForm();
    };
    

    const handleResendEmail = async () => {
        const userData = {
            email: newUser.email,
            name: newUser.name,
            lastName: newUser.lastname
        };
        const error = await resendEmail(userData);
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
        } else {
            Swal.fire({
                imageUrl: '/checkCapi.svg',
                imageWidth: 200,
                title: "Email Resent!",
                text: "We have resent the confirmation email",
                html: `
                    We have resent the confirmation email
                    <div>
                        <a href="/login" autofocus>Login</a>
                    </div>
                `,
                customClass: {
                    confirmButton: 'swalConfirmButton',
                    title: 'swalTitle',
                    htmlContainer: 'swalHtmlContainer',
                },
            });
            setEmailSent(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            handleAddUser();
        }
    };

    const cleanForm = () => {
        setNewUser({ name: '', lastname: '', email: '', passwordA: '', passwordB: '' });
    };

    return (
        <>
            {loading ? <Loading /> : null}
            <div>
                <img src="/orange_wave_desktop.png" className="topWave" alt="" />
                <div className="formNavigate" onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14 7l-5 5l5 5" className="beige" />
                    </svg>
                    <h4 className="beige">Back to home</h4>
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
                            placeholder="What's your name?"
                            name='name'
                            id='name'
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser({ ...newUser, name: e.target.value })
                            } />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                            type="text"
                            placeholder="What's your last name?"
                            name='lastname'
                            id='lastname'
                            value={newUser.lastname}
                            onChange={(e) =>
                                setNewUser({ ...newUser, lastname: e.target.value })
                            } />
                        {errors.lastname && <p className="error">{errors.lastname}</p>}
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            placeholder="What's your email?"
                            name='email'
                            id='email'
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({ ...newUser, email: e.target.value })
                            } />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor='passwordA'>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            name='passwordA'
                            id='passwordA'
                            value={newUser.passwordA}
                            onChange={(e) =>
                                setNewUser({ ...newUser, passwordA: e.target.value })
                            } />
                        {errors.passwordA && <p className="error">{errors.passwordA}</p>}
                    </div>

                    <div>
                        <label htmlFor='passwordB'>Repeat Password</label>
                        <input
                            type="password"
                            placeholder="Repeat your password"
                            name='passwordB'
                            id='passwordB'
                            value={newUser.passwordB}
                            onChange={(e) =>
                                setNewUser({ ...newUser, passwordB: e.target.value })
                            } />
                        {errors.passwordB && <p className="error">{errors.passwordB}</p>}
                    </div>

                    <PrimaryButton type="submit">Create Account</PrimaryButton>
                    <Link to={"/login"}>Log in</Link>
                </form>
                {emailSent && (
                    <div>
                        <p>An email has been sent to your inbox. Please check it.</p>
                    </div>
                )}
                <img src="/capi_photo.svg" className="buttonImg" alt="" />
            </div>
        </>
    );
};
