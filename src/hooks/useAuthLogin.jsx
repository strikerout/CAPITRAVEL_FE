import { useState, useEffect } from 'react';
import { login } from '../api/authLogin';

const useAuthLogin = () =>{
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState(null)

    const loginUser = async(user) =>{
        try{
            setLoading(true);
            const data = await login(user);
            // localStorage.setItem("token", data.token);
            // checkToken();
            return data;
        }catch(err){
            const error = err.response || "Connection error";
            return error;
        }finally {
            setLoading(false);
        }
    }

    const decodeJwt = (token) => {
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    }

    const checkToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeJwt(token);
            console.log(decodedToken);
            setRole(decodedToken.role);
            setUsername(decodedToken.sub);
        }
    }
    
    const isTokenExpired = (token) => {
        const decodedToken = decodeJwt(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        return currentTime >= expirationTime;
    }


    const logout = () =>{
        localStorage.removeItem("token");
        checkToken();
    }


    return{
        loginUser,
        loading,
        error,
        role,
        username,
        logout,
        checkToken,
        isTokenExpired
    }

}

export default useAuthLogin;