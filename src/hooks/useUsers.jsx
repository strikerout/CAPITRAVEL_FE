import { useState, useEffect } from 'react';
import { createUser } from '../api/users';


const useUsers = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const addUser = async (newUser) => {
        try{
            setLoading(true);
            await createUser(newUser);
            return null;
        }catch(err){
            const error = err.response || "Unknown error";
            return error;
        } finally {
            setLoading(false);
        }
    }

    return{
        addUser,
        loading,
        error
    };
};

export default useUsers;
